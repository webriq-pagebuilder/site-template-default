import React, { useEffect } from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { wishlistPageQuery, globalSEOQuery } from "pages/api/query";
import { WishlistSections } from "components/page/store/wishlist";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

interface WishListPageProps {
	data: Data;
	preview: boolean;
	token?: string;
	source?: string;
	defaultSeo: DefaultSeoData;
}

interface Data {
	wishlistData: WishlistData;
}

export interface WishlistData extends CommonPageData {
	wishlistSectionVariant: {
		variant: string;
		_type: string;
	};
}

function WishlistPage({
	data,
	preview,
	token,
	source,
	defaultSeo,
}: WishListPageProps) {
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
				<PreviewSuspense fallback={"Loading..."}>
					<InlineEditorContextProvider showInlineEditor={showInlineEditor}>
						<DocumentWithPreview
							{...{
								data,
								token,
								slug: "wishlist",
								defaultSeo,
								children: <WishlistSections data={data?.wishlistData} />,
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
				slug: "wishlist",
				defaultSeo,
				children: <WishlistSections data={data?.wishlistData} />,
			}}
		/>
	);
}

export async function getStaticProps({
	preview = false,
	previewData = {},
}: any): Promise<{ props: WishListPageProps }> {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [searchPage, globalSEO] = await Promise.all([
		client.fetch(wishlistPageQuery),
		client.fetch(globalSEOQuery),
	]);

	// pass page data and preview to helper function
	const wishlistData = filterDataToSingleItem(searchPage, preview);

	if (!wishlistData) {
		return {
			props: {
				preview,
				data: { wishlistData: null },
				defaultSeo: globalSEO,
			},
		};
	}

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData.source) || "",
			data: { wishlistData },
			defaultSeo: globalSEO,
		},
	};
}

export default React.memo(WishlistPage);
