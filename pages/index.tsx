import React from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { homeQuery, globalSEOQuery } from "./api/query";
import { PageSections } from "components/page";
import { filterDataToSingleItem, SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

interface HomeProps {
	data: Data;
	preview: boolean;
	token?: string | null;
	source?: string;
	defaultSeo: DefaultSeoData;
}

interface Data {
	pageData: PageData | null;
}

interface PageData extends CommonPageData {
	collections: any;
	slug: string | string[];
	title: string;
}

function Home({ data, preview, token, source, defaultSeo }: HomeProps) {
	const showInlineEditor = source === "studio";

	if (preview) {
		return (
			<>
				<PreviewBanner />
				<PreviewSuspense fallback="Loading...">
					<InlineEditorContextProvider showInlineEditor={showInlineEditor}>
						<DocumentWithPreview
							{...{
								data,
								token,
								slug: "",
								defaultSeo,
								children: <PageSections data={data?.pageData} />,
							}}
						/>
					</InlineEditorContextProvider>
				</PreviewSuspense>
			</>
		);
	}

	return (
		<Document
			{...{
				data,
				slug: "",
				defaultSeo,
				children: <PageSections data={data?.pageData} />,
			}}
		/>
	);
}

export const getStaticProps = async ({
	preview = false,
	previewData = {},
}: any): Promise<{ props: HomeProps }> => {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [indexPage, globalSEO] = await Promise.all([
		client.fetch(homeQuery),
		client.fetch(globalSEOQuery),
	]);

	// pass page data and preview to helper function
	const pageData: PageData = filterDataToSingleItem(indexPage, preview);

	// if our query failed, then return null to display custom no-preview page
	if (!pageData) {
		return {
			props: {
				preview,
				data: { pageData: null },
				defaultSeo: globalSEO,
			},
		};
	}

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData.source) || "",
			data: { pageData },
			defaultSeo: globalSEO,
		},
	};
};

export default Home;
