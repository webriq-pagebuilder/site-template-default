import React from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { cartPageQuery, globalSEOQuery } from "pages/api/query";
import { CartSections } from "components/page/store/cart";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

interface CartPageProps {
	data: Data;
	preview: boolean;
	token?: string;
	source?: string;
	defaultSeo: DefaultSeoData;
}

interface Data {
	cartData: CartData;
}
export interface CartData extends CommonPageData {
	cartSectionVariant?: {
		variant: string;
		_type: string;
	};
	id?: string;
}

function CartPage({ data, preview, token, source, defaultSeo }: CartPageProps) {
	const showInlineEditor = source === "studio";

	if (preview) {
		return (
			<>
				<PreviewBanner />
				<PreviewSuspense fallback="Loading">
					<InlineEditorContextProvider showInlineEditor={showInlineEditor}>
						<DocumentWithPreview
							{...{
								data,
								slug: "cart",
								token,
								defaultSeo,
								children: <CartSections data={data?.cartData} />,
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
				slug: "cart",
				defaultSeo,
				children: <CartSections data={data?.cartData} />,
			}}
		/>
	);
}

export async function getStaticProps({
	preview = false,
	previewData = {},
}: any): Promise<{ props: CartPageProps }> {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [cartPage, globalSEO] = await Promise.all([
		client.fetch(cartPageQuery),
		client.fetch(globalSEOQuery),
	]);

	// pass page data and preview to helper function
	const cartData: CartData = filterDataToSingleItem(cartPage, preview);

	if (!cartData) {
		return {
			props: {
				preview,
				data: { cartData: null },
				defaultSeo: globalSEO,
			},
		};
	}

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData.source) || "",
			data: { cartData },
			defaultSeo: globalSEO,
		},
	};
}

export default React.memo(CartPage);
