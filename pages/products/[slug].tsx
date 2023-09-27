/** This component displays content for the PRODUCT page */

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { globalSEOQuery, productsQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { ProductSections } from "components/page/store/products";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CollectionProduct, CommonSections, DefaultSeoData } from "types";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

interface ProductPageBySlugProps {
	data: Data;
	preview: boolean;
	token: string;
	source: string;
	defaultSeo: DefaultSeoData;
}

interface Data {
	productData: ProductData;
}

export interface ProductData extends CollectionProduct {
	commonSections: CommonSections;
}

function ProductPageBySlug({
	data,
	preview,
	token,
	source,
	defaultSeo,
}: ProductPageBySlugProps) {
	const router = useRouter();
	const slug = router.query.slug;
	const showInlineEditor = source === "studio";
	useEffect(() => {
		if (typeof Ecwid !== "undefined") Ecwid.init();
	}, []);

	if (!data?.productData) {
		return <PageNotFound />;
	} else {
		if (preview) {
			return (
				<>
					<PreviewBanner />
					<PreviewSuspense fallback={"Loading..."}>
						<InlineEditorContextProvider showInlineEditor={showInlineEditor}>
							<DocumentWithPreview
								{...{
									data,
									token: token || null,
									slug,
									defaultSeo,
									children: <ProductSections data={data?.productData} />,
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
					slug,
					defaultSeo,
					children: <ProductSections data={data?.productData} />,
				}}
			/>
		);
	}
}

export async function getStaticProps({
	params,
	preview = false,
	previewData = {},
}: any): Promise<{ props: ProductPageBySlugProps; revalidate: number }> {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [products, globalSEO] = await Promise.all([
		client.fetch(productsQuery, { slug: params.slug }),
		client.fetch(globalSEOQuery),
	]);

	// pass products data and preview to helper function
	const singleProductsData: ProductData = filterDataToSingleItem(
		products,
		preview
	);

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData.source) || "",
			data: {
				productData: singleProductsData || null,
			},
			defaultSeo: globalSEO,
		},
		// If webhooks isn't setup then attempt to re-generate in 1 minute intervals
		revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
	};
}

export async function getStaticPaths() {
	// When this is true (in preview environments) don't
	// prerender any static pages
	// (faster builds, but slower initial page load)
	if (process.env.SKIP_BUILD_STATIC_GENERATION) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	const products = await sanityClient.fetch(
		groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
	);

	return {
		paths: products.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export default React.memo(ProductPageBySlug);
