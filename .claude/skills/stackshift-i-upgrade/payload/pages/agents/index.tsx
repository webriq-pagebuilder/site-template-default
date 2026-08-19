import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { listAgentFiles } from "lib/agents/read-agents";

/**
 * Machine-discovery hub for the AI-agent surface.
 *
 * Lists every /agents/<slug> page so any crawler that lands here can fan out
 * to the whole tree in one hop. Referenced from sitemap-agents.xml and
 * llms.txt — deliberately NOT linked from human-facing navigation/footer
 * (user decision, docs/task/agents-discoverability.md). noindex like the
 * rest of /agents/*.
 */

interface AgentIndexEntry {
  slug: string;
  title: string;
  summary: string;
}

interface AgentIndexProps {
  entries: AgentIndexEntry[];
}

export const getStaticProps: GetStaticProps<AgentIndexProps> = async () => {
  const refs = await listAgentFiles();

  const entries = await Promise.all(
    refs.map(async (ref) => {
      const raw = await readFile(ref.absPath, "utf-8");
      const { data } = matter(raw);
      return {
        slug: ref.slug,
        title: typeof data.title === "string" ? data.title : ref.slug,
        summary: typeof data.summary === "string" ? data.summary : "",
      };
    }),
  );

  entries.sort((a, b) => a.title.localeCompare(b.title));

  return { props: { entries } };
};

export default function AgentIndexPage({
  entries,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>AI-readable pages index</title>
        <meta
          name="description"
          content="Index of AI-readable (markdown) versions of this site's pages."
        />
        <meta name="robots" content="noindex" />
      </Head>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>AI-readable pages</h1>
          <p className="lead">
            Machine-optimized versions of this site&apos;s content. Each page
            also serves raw markdown when requested with{" "}
            <code>Accept: text/markdown</code>.
          </p>
          <ul>
            {entries.map((e) => (
              <li key={e.slug}>
                <Link href={`/agents/${e.slug}`}>{e.title}</Link>
                {e.summary ? <>: {e.summary}</> : null}
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}
