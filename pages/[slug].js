import React from "react";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../lib/sanity";
import dynamic from "next/dynamic";
import { blogQuery, blogNavAndFooter, slugQuery } from "./api/query";
import { groq } from "next-sanity";

const Components = {
  navigation: dynamic(() => import("component/sections/navigation"), {
    ssr: false,
  }),
  header: dynamic(() => import("component/sections/hero"), {
    ssr: false,
  }),
  features: dynamic(() => import("component/sections/features"), {
    ssr: false,
  }),
  portfolio: dynamic(() => import("component/sections/portfolio"), {
    ssr: false,
  }),
  blog: dynamic(() => import("component/sections/blog"), {
    ssr: false,
  }),
  contact: dynamic(() => import("component/sections/contact"), {
    ssr: false,
  }),
  pricing: dynamic(() => import("component/sections/pricing"), {
    ssr: false,
  }),
  testimonial: dynamic(() => import("component/sections/testimonials"), {
    ssr: false,
  }),
  team: dynamic(() => import("component/sections/team"), {
    ssr: false,
  }),
  howItWorks: dynamic(() => import("component/sections/how_it_works"), {
    ssr: false,
  }),
  newsletter: dynamic(() => import("component/sections/newsletter"), {
    ssr: false,
  }),
  faqs: dynamic(() => import("component/sections/faqs"), {
    ssr: false,
  }),
  callToAction: dynamic(() => import("component/sections/call_to_action"), {
    ssr: false,
  }),
  stats: dynamic(() => import("component/sections/stats"), {
    ssr: false,
  }),
  cookies: dynamic(() => import("component/sections/cookies"), {
    ssr: false,
  }),
  appPromo: dynamic(() => import("component/sections/app_promo"), {
    ssr: false,
  }),
  logoCloud: dynamic(() => import("component/sections/logoCloud"), {
    ssr: false,
  }),
  footer: dynamic(() => import("component/sections/footer"), {
    ssr: false,
  }),
  signInSignUp: dynamic(() => import("component/sections/sign_in_sign_up"), {
    ssr: false,
  }),
  textComponent: dynamic(() => import("component/sections/text_component"), {
    ssr: false,
  }),
};

const BlogPage = dynamic(() => import("component/blog/"), { ssr: false });

function page({ data, preview }) {
  const router = useRouter();
  if (!router.isFallback && !data?.page?.slug) {
    return (
      <BlogPage
        data={data?.blogData}
        preview={preview}
        navAndFooter={data?.navAndFooter?.[0]?.sections}
      />
    );
  }

  const slug = data?.page?.slug;
  const { data: page } = usePreviewSubscription(slugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  const pageData = page?.page || page;
  if (!pageData) {
    return null;
  }
  const { sections } = pageData;

  return (
    <>
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

  const blogData = await getClient(preview).fetch(blogQuery, {
    slug: params.slug,
  });

  const navAndFooter = await getClient(preview).fetch(blogNavAndFooter, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: {
        page,
        blogData,
        navAndFooter,
      },
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
