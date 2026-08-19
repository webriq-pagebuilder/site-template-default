import type { AgentFrontmatter } from "./read-agents";
function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function buildAgentJsonLd(
  frontmatter: AgentFrontmatter,
): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.summary,
  };

  if (frontmatter.generated_at) {
    jsonLd.dateModified = frontmatter.generated_at;
  }

  if (Array.isArray(frontmatter.faq) && frontmatter.faq.length > 0) {
    const faqEntries = frontmatter.faq
      .map((item) => {
        const question = (item as { question?: unknown } | null | undefined)
          ?.question;
        const answer = (item as { answer?: unknown } | null | undefined)
          ?.answer;
        if (!isNonEmptyString(question) || !isNonEmptyString(answer))
          return null;
        return {
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    if (faqEntries.length === 0) {
      return jsonLd;
    }
    jsonLd.mainEntity = {
      "@type": "FAQPage",
      mainEntity: faqEntries,
    };
  }

  return jsonLd;
}
