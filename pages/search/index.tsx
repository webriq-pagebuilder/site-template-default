import React, { useEffect } from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { searchPageQuery, globalSEOQuery } from "pages/api/query";
import { SearchPageSections } from "components/page/store/search";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

interface SeachPageProps {
	data: Data;
	preview: boolean;
	token?: string;
	source?: string;
	defaultSeo: DefaultSeoData;
}

interface Data {
	searchData: SearchData;
}

export interface SearchData extends CommonPageData {
	collections: any;
	slug: string | string[] | null;
}

function SearchPage({
	data,
	preview,
	token,
	source,
	defaultSeo,
}: SeachPageProps) {
	useEffect(() => {
		if (typeof Ecwid !== "undefined") {
			window.Ecwid.init();
		}
	}, []);
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
								slug: "search",
								defaultSeo,
								children: <SearchPageSections data={data?.searchData} />,
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
				slug: "search",
				defaultSeo,
				children: <SearchPageSections data={data?.searchData} />,
			}}
		/>
	);
}

export async function getStaticProps({
	preview = false,
	previewData = {},
}: any): Promise<{ props: SeachPageProps }> {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [searchPage, globalSEO] = await Promise.all([
		client.fetch(searchPageQuery),
		client.fetch(globalSEOQuery),
	]);

	// pass page data and preview to helper function
	const searchData: SearchData = filterDataToSingleItem(searchPage, preview);

	if (!searchData) {
		return {
			props: {
				preview,
				data: { searchData: null },
				defaultSeo: globalSEO,
			},
		};
	}

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData.source) || "",
			data: { searchData },
			defaultSeo: globalSEO,
		},
	};
}

export default React.memo(SearchPage);
