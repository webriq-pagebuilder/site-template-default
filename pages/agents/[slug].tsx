import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import {
  listAgentFiles,
  readAgentBySlug,
  type AgentFrontmatter,
} from "lib/agents/read-agents";
import { buildAgentJsonLd } from "lib/agents/json-ld";

interface AgentPageProps {
  frontmatter: AgentFrontmatter;
  bodyHtml: string;
  jsonLd: Record<string, unknown>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const refs = await listAgentFiles();
  return {
    paths: refs.map((r) => ({ params: { slug: r.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<AgentPageProps> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const doc = await readAgentBySlug(slug);
  if (!doc) {
    return { notFound: true };
  }

  return {
    props: {
      frontmatter: doc.frontmatter,
      bodyHtml: doc.bodyHtml,
      jsonLd: buildAgentJsonLd(doc.frontmatter),
    },
  };
};

export default function AgentPage({
  frontmatter,
  bodyHtml,
  jsonLd,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.summary} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{frontmatter.title}</h1>
          <p className="lead">{frontmatter.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </article>
      </main>
    </>
  );
}
