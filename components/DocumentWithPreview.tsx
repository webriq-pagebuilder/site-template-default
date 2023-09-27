import React from "react";
import Head from "next/head";
import { usePreview } from "lib/sanity.preview";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO } from "components/list";
import { DefaultSeoData, SanitySlug } from "types";

interface DocumentWithPreviewProps {
	slug: string | SanitySlug | string[];
	token: string | null;
	defaultSeo: DefaultSeoData;
	query?: any;
	children: React.ReactNode;
}

export default function DocumentWithPreview({
	slug,
	token = null,
	defaultSeo,
	query,
	children,
}: DocumentWithPreviewProps) {
	// Current drafts data in Sanity
	const previewDataEventSource = usePreview(token, query, {
		slug,
	});

	const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

	// General safeguard against empty data
	if (!previewData) {
		return null;
	}

	const { title, seo, _type } = previewData;

	return (
		<>
			<Head>
				<SEO
					data={{
						pageTitle: title,
						type: _type,
						route: slug,
						...seo,
					}}
					defaultSeo={defaultSeo}
				/>
				<title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
			</Head>

			{/* if page has no sections, show no sections only in preview */}
			{_type !== "post" &&
				"sections" in previewData &&
				(!previewData ||
					!previewData?.sections ||
					previewData?.sections?.length === 0) && <PreviewNoContent />}

			{/*  Show sections */}
			{children}
		</>
	);
}
