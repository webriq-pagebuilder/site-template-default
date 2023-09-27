/** This component displays content for the COLLECTIONS page */

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { collectionsQuery, globalSEOQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { CollectionSections } from "components/page/store/collections";
import InlineEditorContextProvider from "context/InlineEditorContext";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

import {
	CommonPageData,
	CommonSections,
	CollectionProduct,
	DefaultSeoData,
} from "types";

interface CollectionPageBySlugProps {
	data: Data;
	preview: boolean;
	token: string;
	source: string;
	defaultSeo: DefaultSeoData;
}
interface Data {
	collectionData: CollectionData;
}

export interface CollectionData extends CommonPageData {
	collectionInfoVariant?: {
		variant?: string;
	};
	commonSections?: CommonSections | null;
	products?: CollectionProduct[] | null;
	slug?: string | null;
	name?: string | null;
}

function CollectionPageBySlug({
	data,
	preview,
	token,
	source,
	defaultSeo,
}: CollectionPageBySlugProps) {
	const router = useRouter();
	const slug = router.query.slug;
	const showInlineEditor = source === "studio";

	useEffect(() => {
		if (typeof Ecwid !== "undefined") Ecwid.init();
	}, []);

	if (!data?.collectionData) {
		return <PageNotFound />;
	} else {
		if (preview) {
			return (
				<>
					<PreviewBanner />
					<PreviewSuspense fallback="Loading...">
						<InlineEditorContextProvider showInlineEditor={showInlineEditor}>
							<DocumentWithPreview
								{...{
									data,
									token: token || null,
									slug,
									defaultSeo,
									children: <CollectionSections data={data?.collectionData} />,
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
					children: <CollectionSections data={data?.collectionData} />,
				}}
			/>
		);
	}
}

export async function getStaticProps({
	params,
	preview = false,
	previewData = {},
}: any): Promise<{ props: CollectionPageBySlugProps; revalidate: number }> {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [collections, globalSEO] = await Promise.all([
		client.fetch(collectionsQuery, {
			slug: params.slug,
		}),
		client.fetch(globalSEOQuery),
	]);

	// pass collections data and preview to helper function
	const singleCollectionsData: CollectionData = filterDataToSingleItem(
		collections,
		preview
	);

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData.source) || "",
			data: {
				collectionData: singleCollectionsData || null,
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

	const collections = await sanityClient.fetch(
		groq`*[_type == "mainCollection" && defined(slug.current)][].slug.current`
	);

	return {
		paths: collections.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export default React.memo(CollectionPageBySlug);
