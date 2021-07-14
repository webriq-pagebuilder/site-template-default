import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../lib/sanity";
import dynamic from "next/dynamic";
import PageNotFound from "./404";
import { slugQuery } from "./api/query";
import { groq } from "next-sanity";
import SEO from "../component/SEO";

const Components = {
  navigation: dynamic(() => import("component/sections/navigation")),
  header: dynamic(() => import("component/sections/hero")),
  features: dynamic(() => import("component/sections/features")),
  portfolio: dynamic(() => import("component/sections/portfolio")),
  blog: dynamic(() => import("component/sections/blog")),
  contact: dynamic(() => import("component/sections/contact")),
  pricing: dynamic(() => import("component/sections/pricing")),
  testimonial: dynamic(() => import("component/sections/testimonials")),
  team: dynamic(() => import("component/sections/team")),
  howItWorks: dynamic(() => import("component/sections/how_it_works")),
  newsletter: dynamic(() => import("component/sections/newsletter")),
  faqs: dynamic(() => import("component/sections/faqs")),
  callToAction: dynamic(() => import("component/sections/call_to_action")),
  stats: dynamic(() => import("component/sections/stats")),
  cookies: dynamic(() => import("component/sections/cookies")),
  appPromo: dynamic(() => import("component/sections/app_promo")),
  logoCloud: dynamic(() => import("component/sections/logoCloud")),
  footer: dynamic(() => import("component/sections/footer")),
  signInSignUp: dynamic(() => import("component/sections/sign_in_sign_up")),
  textComponent: dynamic(() => import("component/sections/text_component")),
};

function page({ data, preview, slug }) {
  const router = useRouter();

  if (!router.isFallback && !data?.page?.slug) {
    return <PageNotFound statusCode={404} />;
  }

  const { data: page } = usePreviewSubscription(slugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  const pageData = page?.page || page;
  if (!pageData) {
    return null;
  }

  const { sections, title, seo } = pageData;

  return (
    <>
      <Head>
        <title>{seo?.seoTitle || title}</title>
        <SEO data={pageData} />
      </Head>
      {sections &&
        sections?.map((section) => {
          const Component = Components[section._type];

          return (
            <Component
              key={section._key}
              template={{
                bg: "gray",
                color: "webriq",
              }}
              {...{ [section._type]: section }}
              data={section}
            />
          );
        })}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const page = await getClient(preview).fetch(slugQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: { page },
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "page" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(page);
