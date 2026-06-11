import React, { useState, useEffect } from "react";
import { useToast, Tooltip, Box, Text } from "@sanity/ui";
import { useClient, useDocumentOperation, useValidationStatus } from "sanity";
import { processData } from "../../stripeActions/process-data";
import {
  NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO,
  PUBLISHFORGE_WEBHOOK_URL,
  WEBHOOK_INCLUDED_TYPES,
} from "../../config";

export default function createProductsPublishAction(props) {
  const toast = useToast();
  const client = useClient({ apiVersion: "v2021-10-21" });

  const { validation } = useValidationStatus(props.id, props.type);
  const { publish } = useDocumentOperation(props.id, props.type);

  const [isPublishing, setIsPublishing] = useState(false);

  const CStudioSchemas = [
    "mainProduct",
    "mainCollection",
    "productSettings",
    "collectionSettings",
    "cartPage",
    "wishlistPage",
    "searchPage",
  ];

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  useEffect(() => {
    const payload = !props.draft
      ? {
          data: props.published?.variants,
          variant: props.published?.variant,
          type: props.published?._type,
        }
      : {
          data: props.draft?.variants,
          variant: props.draft?.variant,
          type: props.draft?._type,
        };

    async function create() {
      const response = await processData(payload);

      if (response) {
        toast.push({
          status: response.status === 500 ? "error" : "success",
          title: response.statusText,
        });
      }
    }

    publish.disabled !== "ALREADY_PUBLISHED" &&
      publish.disabled !== "NO_CHANGES" &&
      create();
  }, [isPublishing]);

  const isCStudioDisabled =
    NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO !== "true" &&
    CStudioSchemas?.includes(props.type);
  const isDisabled = validation.length !== 0 || isPublishing;

  return {
    disabled: isDisabled || !props?.draft || isCStudioDisabled,
    label: [
      "page",
      "post",
      "category",
      "author",
      "mainProduct",
      "mainCollection",
      "productSettings",
      "collectionSettings",
      "cartPage",
      "wishlistPage",
      "searchPage",
    ].includes(props.type) ? (
      <CustomPublishLabel hasErrors={isDisabled} isPublishing={isPublishing} />
    ) : isPublishing ? (
      "Saving..."
    ) : (
      "Save"
    ),
    onHandle: async () => {
      // This will update the button text
      setIsPublishing(true);

      // Perform the publish
      publish.execute();

      // If the document has a publishedAt or publishStatus field, remove them
      if (props?.draft?.publishedAt || props?.draft?.publishStatus) {
        await client
          .patch(props.id, {
            unset: ["publishedAt", "publishStatus"],
          })
          .commit();
      }

      // Notify PublishForge to process content for AI/robots discovery.
      // Fires only for allow-listed editorial types (page, post) so each gets an
      // agent page + schemaMarkup written back; settings/section documents are
      // skipped. Routes through the local proxy to avoid CORS — Sanity Studio runs
      // in the browser and cannot POST directly to an external Vercel URL.
      // Fire-and-forget: failure must not block the publish.
      if (WEBHOOK_INCLUDED_TYPES.has(props.type) && PUBLISHFORGE_WEBHOOK_URL) {
        fetch("/api/publishforge-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentId: props.id,
            documentType: props.type,
            slug: props.draft?.slug?.current ?? props.published?.slug?.current,
          }),
        }).catch((err) => {
          console.warn("[PublishForge] Webhook call failed:", err);
        });
      }

      // Signal that the action is completed
      props.onComplete();
    },
  };
}

function CustomPublishLabel({ hasErrors = false, isPublishing = false }) {
  if (hasErrors) {
    return (
      <Tooltip
        content={
          <Box padding={2}>
            <Text size={2}>
              There are validation errors that need to be fixed
              <br /> before this document can be published!
            </Text>
          </Box>
        }
        placement="top"
        portal>
        <span>Publish</span>
      </Tooltip>
    );
  }

  return isPublishing ? <span>Publishing...</span> : <span>Publish</span>;
}
