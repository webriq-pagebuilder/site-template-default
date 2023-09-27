import React from "react";
import Head from "next/head";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import { SEO } from "components/list";
import { CartSections } from "components/page/store/cart";
import { PageData, CartData, BlogsData, DefaultSeoData } from "types";

interface Data {
  pageData?: PageData | null;
  blogData?: BlogsData | null;
  cartData?: CartData | null;
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
export function Document({
  data,
  defaultSeo,
}: {
  data: Data;
  defaultSeo: DefaultSeoData;
}) {
  const publishedData = data?.pageData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, _type, seo } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: publishedData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={publishedData} />}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={data?.blogData} />}

      {/*  Show page sections */}
      {data?.cartData && <CartSections data={publishedData} />}
    </>
  );
}
