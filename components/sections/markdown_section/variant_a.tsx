import { useState, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export interface MarkdownSectionProps {
  content?: string;
}

export default function MarkdownVariantA({ content }: MarkdownSectionProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!content) return;
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(content)
      .then((result) => setHtml(result.toString()));
  }, [content]);

  if (!content) return null;

  return (
    <section className="py-10 px-6 mx-auto max-w-4xl">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
