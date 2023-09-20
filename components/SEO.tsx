import { seoImageUrl } from "lib/sanity";
import { sanityClient } from "lib/sanity.client";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SanityImage } from "types";

type SEOData = {
	type: string; // page type e.g. blog
	seoTitle?: string;
	seoKeywords?: string;
	seoSynonyms?: string;
	seoDescription?: string;
	seoImage?: SanityImage;
};

const INITIAL_SEO_STATE = {
	defaultSeoTitle: undefined,
	defaultSeoSynonyms: undefined,
	defaultSeoKeywords: undefined,
	defaultSeoDescription: undefined,
	defaultSeoImage: undefined,
};

function SEO({ data }: { data: SEOData | undefined }) {
	const url = process.env.NEXT_PUBLIC_SITE_URL;
	const router = useRouter();

	const [defaultSeo, setDefaultSeo] = useState(INITIAL_SEO_STATE);

	useEffect(() => {
		const getDefaultSeo = async () => {
			try {
				const res = await sanityClient.fetch(
					groq`*[_type == 'defaultSeo' && !(_id in path("drafts.**"))][0]`
				);
				if (res) {
					setDefaultSeo(res);
				}
			} catch (error) {
				console.log("Error getting default seo:", error);
			}
		};

		getDefaultSeo();
	}, []);

	const {
		defaultSeoTitle,
		defaultSeoSynonyms,
		defaultSeoKeywords,
		defaultSeoDescription,
		defaultSeoImage,
	} = defaultSeo;

	const finalSeo = getSEOValue(data, data?.type);
	const { title, description, image, synonyms, keywords } = finalSeo;

	return (
		<>
			{/* Primary Meta Tags */}
			<meta name="viewport" content="width=360 initial-scale=1" />
			<link rel="canonical" href={`${url}${router?.asPath}`} />
			<meta name="title" content={title ?? defaultSeoTitle} />
			<meta name="keywords" content={keywords ?? defaultSeoKeywords} />
			<meta name="synonyms" content={synonyms ?? defaultSeoSynonyms} />
			<meta name="description" content={description ?? defaultSeoDescription} />
			{/* Open Graph / Facebook / LinkedIn */}
			<meta property="og:url" content={`${url}${router?.asPath}`} />
			<meta property="og:title" content={title ?? defaultSeoTitle} />
			<meta
				property="og:description"
				content={description ?? defaultSeoDescription}
			/>
			<meta
				property="og:image"
				content={image ? seoImageUrl(image) : seoImageUrl(defaultSeoImage)}
			/>
			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={`${url}${router?.asPath}`} />
			<meta property="twitter:title" content={title ?? defaultSeoTitle} />
			<meta
				property="twitter:description"
				content={description ?? defaultSeoDescription}
			/>
			<meta
				property="twitter:image"
				content={image ? seoImageUrl(image) : seoImageUrl(defaultSeoImage)}
			/>
		</>
	);
}

// this function returns the first 100 characters of the blog post body or excerpt when an SEO description for the blog post is not provided
function blogPostBody(body) {
	let description;

	if (typeof body === "object" && Array.isArray(body)) {
		const block = body?.find((content) => content._type === "block");
		description =
			block?.children?.[0]?.text?.split(". ").slice(0, 2).join(".") + ".";
	} else {
		description = body?.split(". ").slice(0, 2).join(".");
	}

	return description;
}

function getSEOValue(seoData: SEOData, dataType: string) {
	const seo = {
		title: seoData?.seoTitle,
		keywords: seoData?.seoKeywords,
		synonyms: seoData?.seoSynonyms,
		description: seoData?.seoDescription,
		image: seoData?.seoImage,
	};
	if (
		(dataType === "mainCollection" || dataType === "mainProduct") &&
		"commonSections" in seoData
	) {
		seo.title = seoData?.seoTitle || seoData?.name;
		seo.keywords = seoData?.seoKeywords;
		seo.synonyms = seoData?.seoSynonyms;
		seo.description = seoData?.seoDescription;
		seo.image = seoData?.seoImage;
	} else if (dataType === "post" && "excerpt" in seoData) {
		const blogDescription = blogPostBody(seoData?.excerpt || seoData?.body);
		seo.title = seoData?.seoTitle || seoData?.title;
		seo.keywords = seoData?.seoKeywords;
		seo.synonyms = seoData?.seoSynonyms;
		seo.description = seoData?.seoDescription || blogDescription;
		seo.image = seoData?.seoImage;
	} else if (dataType === "page" && "title" in seoData) {
		seo.title = seoData?.seoTitle || seoData?.title;
		seo.keywords = seoData?.seoKeywords;
		seo.synonyms = seoData?.seoSynonyms;
		seo.description = seoData?.seoDescription;
		seo.image = seoData?.seoImage;
	}
	return seo;
}

export default SEO;
