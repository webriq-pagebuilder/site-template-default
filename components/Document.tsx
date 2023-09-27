import React from "react";
import Head from "next/head";
import { SEO } from "components/list";
import { DefaultSeoData, SanitySlug } from "types";

interface DocumentProps {
	data: any;
	slug: string | SanitySlug | string[];
	defaultSeo: DefaultSeoData;
	children: React.ReactNode;
}

// Display published document
export default function Document({
	data,
	slug,
	defaultSeo,
	children,
}: DocumentProps) {
	// General safeguard against empty data
	if (!data) {
		return null;
	}

	const { title, _type, seo } = data;

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

			{/*  Show sections */}
			{children}
		</>
	);
}
