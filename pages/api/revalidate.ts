import Cors from "cors";
import corsMiddleware from "lib/cors";
import { NextApiRequest, NextApiResponse } from "next";
import { parseBody } from "next-sanity/webhook";
import { client } from "lib/sanity.client";

// Type for the webhook body
interface SanityWebhookBody {
  _type?: string;
  _id?: string;
  slug?: {
    current?: string;
  };
  [key: string]: any;
}

// Initialize the cors middleware
const cors = corsMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Allow GET for manual revalidation, POST for webhooks, OPTIONS for preflight
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Export the config from next-sanity to enable validating the request body signature properly
export { config } from "next-sanity/webhook";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run cors
  await cors(req, res);

  try {
    const routesToRevalidate: string[] = [];
    let webhookBody: SanityWebhookBody | null = null;

    // Mode 1: Manual revalidation via query parameter (e.g., /api/revalidate?path=/blog)
    const hasPathParam = "path" in req.query;
    const queryPath = Array.isArray(req.query?.path)
      ? req.query.path[0]
      : req.query?.path;

    if (hasPathParam) {
      // Manual revalidation mode
      if (!queryPath) {
        return res.status(400).json({
          error: "Empty path provided",
          message:
            "Please provide a valid path to revalidate (e.g., /api/revalidate?path=/blog)",
        });
      }
      console.log(`🔧 Manual revalidation mode - path: ${queryPath}`);
      routesToRevalidate.push(queryPath);
    } else {
      // Mode 2: Sanity webhook with signed body
      if (!process.env.SANITY_REVALIDATE_SECRET) {
        return res.status(500).json({
          error: "Missing environment variable SANITY_REVALIDATE_SECRET",
        });
      }

      const { isValidSignature, body } = await parseBody(
        req,
        process.env.SANITY_REVALIDATE_SECRET
      );

      if (!isValidSignature) {
        const message = "Invalid signature";
        console.warn(message);
        res.status(401).json({ message });
        return;
      }

      webhookBody = body as SanityWebhookBody;
      console.log(
        `📨 Sanity webhook mode - document type: ${webhookBody?._type}`
      );
    }

    // Handle direct page/post updates
    if (webhookBody?.slug?.current) {
      const directRoute =
        webhookBody.slug.current === "home"
          ? "/"
          : `/${webhookBody.slug.current}`;
      routesToRevalidate.push(directRoute);
      console.log(`📄 Adding direct route: ${directRoute}`);
    }

    // Handle blog post updates - find pages that reference this path
    if (webhookBody?._id) {
      try {
        console.log(`🔍 Blog post updated, finding referencing pages...`);

        // Get the published document ID (remove 'drafts.' prefix if present)
        const publishedId = webhookBody._id.replace(/^drafts\./, "");

        // Find all pages that reference this post
        const pageReferencesQuery = `*[references("${publishedId}")]{slug}`;
        const referencingPages = await client.fetch(pageReferencesQuery);

        console.log(
          `📝 Found ${referencingPages.length} page(s) referencing this post`
        );

        if (referencingPages.length > 0) {
          // Add these page routes to revalidation list
          referencingPages.forEach((page: any) => {
            if (page.slug?.current) {
              const pageRoute =
                page.slug.current === "home" ? "/" : `/${page.slug.current}`;
              routesToRevalidate.push(pageRoute);
              console.log(`📄 Adding referencing page route: ${pageRoute}`);
            }
          });
        }
      } catch (error) {
        console.error("❌ Error finding referencing pages:", error);
        // Continue with direct route revalidation even if this fails
      }
    }

    // Remove duplicates and revalidate all routes
    const uniqueRoutes = [...new Set(routesToRevalidate)];

    if (uniqueRoutes.length === 0) {
      console.log("⚠️ No routes found to revalidate");
      return res.status(200).json({
        message: "No routes found to revalidate",
        revalidated: false,
      });
    }

    console.log(
      `🚀 Revalidating ${uniqueRoutes.length} route(s): ${uniqueRoutes.join(
        ", "
      )}`
    );

    // Revalidate all routes
    const revalidatePromises = uniqueRoutes.map(async (route) => {
      try {
        await res.revalidate(route);
        console.log(`✅ Revalidated: ${route}`);
        return { route, success: true };
      } catch (error) {
        console.error(`❌ Failed to revalidate ${route}:`, error);
        return {
          route,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    });

    const results = await Promise.all(revalidatePromises);
    const successCount = results.filter((r) => r.success).length;

    const message = `Revalidated ${successCount}/${
      uniqueRoutes.length
    } routes: ${uniqueRoutes.join(", ")}`;
    console.log(message);

    // Forward webhook to PublishForge for real-time content sync (only for Sanity webhooks)
    let publishForgeResult: {
      success?: boolean;
      status?: number;
      error?: string;
      [key: string]: any;
    } | null = null;

    if (webhookBody) {
      const publishForgeWebhookUrl =
        process.env.NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL;

      if (publishForgeWebhookUrl) {
        try {
          console.log(
            `📤 Forwarding webhook to PublishForge: ${publishForgeWebhookUrl}`
          );

          const forwardResponse = await fetch(publishForgeWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookBody),
          });

          if (forwardResponse.ok) {
            publishForgeResult = await forwardResponse.json();
            console.log(
              `✅ PublishForge webhook forwarded successfully:`,
              publishForgeResult
            );
          } else {
            const errorText = await forwardResponse.text();
            console.error(
              `❌ PublishForge webhook failed: ${forwardResponse.status} - ${errorText}`
            );
            publishForgeResult = {
              success: false,
              status: forwardResponse.status,
              error: errorText,
            };
          }
        } catch (forwardError) {
          console.error(`❌ Error forwarding to PublishForge:`, forwardError);
          publishForgeResult = {
            success: false,
            error:
              forwardError instanceof Error
                ? forwardError.message
                : String(forwardError),
          };
          // Don't fail the main revalidation if forwarding fails
        }
      } else {
        console.log(
          `⚠️ NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL not configured, skipping webhook forwarding`
        );
      }
    }

    return res.status(200).json({
      message,
      revalidated: true,
      routes: uniqueRoutes,
      results,
      publishForge: publishForgeResult,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        "Error revalidating: " +
          (err instanceof Error ? err.message : String(err))
      );
  }
}
