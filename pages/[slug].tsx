import React from "react";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { blogQuery, slugQuery, globalSEOQuery } from "./api/query";
import { PreviewBanner } from "components/PreviewBanner";
import { filterDataToSingleItem } from "components/list";
import PageNotFound from "pages/404";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { GetStaticPaths, GetStaticProps } from "next";
import { CommonPageData, BlogsData, DefaultSeoData } from "types";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import Document from "components/Document";
import DocumentWithPreview from "components/DocumentWithPreview";

interface PageBySlugProps {
	data: Data;
	preview: boolean;
	token: string | null;
	source: string;
	defaultSeo: DefaultSeoData;
}

interface Data {
	pageData: PageData | null;
	blogData: BlogsData | null;
}

export interface PageData extends CommonPageData {
	collections: any;
	slug: string | string[];
	title: string;
}

export function PageBySlug({
	data,
	preview,
	token,
	source,
	defaultSeo,
}: PageBySlugProps) {
	const router = useRouter();
	const slug = router.query.slug;
	const showInlineEditor = source === "studio";
	let finalData = {
		query: slugQuery,
		children: <PageSections data={data?.pageData} />,
	};

	if (!data?.pageData && !data?.blogData) {
		return <PageNotFound />;
	} else {
		if (preview) {
			if (!data?.pageData) {
				finalData = {
					query: blogQuery,
					children: <BlogSections data={data?.blogData} />,
				};
			}

			return (
				<>
					<PreviewBanner />
					<PreviewSuspense fallback="Loading...">
						<InlineEditorContextProvider showInlineEditor={showInlineEditor}>
							<DocumentWithPreview
								{...{
									token: token || null,
									slug,
									source,
									defaultSeo,
									...finalData,
								}}
							/>
						</InlineEditorContextProvider>
					</PreviewSuspense>
				</>
			);
		}

		return <Document {...{ data, slug, defaultSeo, ...finalData }} />;
	}
}

export const getStaticProps: GetStaticProps = async ({
	params,
	preview = false,
	previewData = {},
}: any): Promise<{ props: PageBySlugProps; revalidate?: number }> => {
	const client =
		preview && previewData?.token
			? getClient(false).withConfig({ token: previewData.token })
			: getClient(preview);

	const [page, blogData, globalSEO] = await Promise.all([
		client.fetch(slugQuery, { slug: params.slug }),
		client.fetch(blogQuery, { slug: params.slug }),
		client.fetch(globalSEOQuery),
	]);

	// pass page data and preview to helper function
	const singlePageData: PageData = filterDataToSingleItem(page, preview);
	const singleBlogData: BlogsData = filterDataToSingleItem(blogData, preview);

	return {
		props: {
			preview,
			token: (preview && previewData.token) || "",
			source: (preview && previewData?.source) || "",
			data: {
				pageData: singlePageData || null,
				blogData: singleBlogData || null,
			},
			defaultSeo: globalSEO,
		},
		// If webhooks isn't setup then attempt to re-generate in 1 minute intervals
		revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// When this is true (in preview environments) don't
	// prerender any static pages
	// (faster builds, but slower initial page load)
	if (process.env.SKIP_BUILD_STATIC_GENERATION) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	const paths = await sanityClient.fetch(
		groq`*[_type in ["page", "post"] && defined(slug.current)][].slug.current`
	);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
};

export default React.memo(PageBySlug);
