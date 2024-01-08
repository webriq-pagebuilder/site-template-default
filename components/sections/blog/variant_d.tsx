import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { SanityBody, SanityImage, Author } from "types";

import { BlogProps } from ".";
import { CategoriesList } from "./stories/use-cases/categories-list";

interface BlogPostProps extends SanityBody {
  category?: string;
  title?: string;
  slug?: {
    _type: "slug";
    current: string;
  };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  authors?: Author[];
}

function VariantD({ subtitle, title, posts }: BlogProps) {
  let blogsPerPage = 6;
  const [activeTab, setActiveTab] = React.useState("All"); //set the first index category as initial value
  const transformedPosts: BlogPostProps[] = posts
    ?.map((post) => {
      return post?.categories?.map((category) => {
        return {
          category: category?.title,
          title: post?.title,
          slug: post?.slug,
          excerpt: post?.excerpt,
          publishedAt: post?.publishedAt,
          mainImage: post?.mainImage,
          authors: post?.authors,
        } as BlogPostProps;
      });
    })
    .flat();

  // get all categories
  const categories: string[] = transformedPosts?.reduce((newArr, items) => {
    const titles = items?.category;

    if (newArr.indexOf(titles) === -1) {
      newArr.push(titles);
    }
    return newArr;
  }, []);

  // filtered posts per category
  const postsPerCategory = transformedPosts?.filter(
    (items) => items?.category === activeTab
  );

  console.log("categories", categories);
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center mb-16">
            <div className="w-full lg:w-1/2">
              {subtitle && (
                <span className="font-bold text-webriq-darkblue">
                  {subtitle}
                </span>
              )}
              {title && (
                <h1 className="text-4xl font-bold font-heading lg:text-5xl">
                  {title}
                </h1>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-8 lg:mb-0 lg:w-1/4">
              {/* <div className="px-6 py-4 bg-white rounded shadow">
                {categories && (
                  <>
                    <h1 className="mb-4 font-bold text-gray-500 uppercase">
                      Topics
                    </h1>
                    <ul>
                      {categories?.length > 1 && (
                        <li
                          className={`rounded hover:bg-webriq-lightblue hover:text-webriq-darkblue ${
                            activeTab === "All" ? "bg-webriq-lightblue" : null
                          }`}
                        >
                          <button
                            aria-label="Show all blog posts"
                            className={`mb-4 block px-3 py-2 focus:outline-none ${
                              activeTab === "All"
                                ? "font-bold text-webriq-darkblue focus:outline-none"
                                : null
                            }`}
                            onClick={() => setActiveTab("All")}
                          >
                            All
                          </button>
                        </li>
                      )}
                      {categories?.map((category, index) => (
                        <li
                          className={`rounded hover:bg-webriq-lightblue hover:text-webriq-darkblue ${
                            activeTab === category
                              ? "bg-webriq-lightblue"
                              : null
                          }`}
                          key={index}
                        >
                          <button
                            aria-label={category}
                            className={`mb-4 block px-3 py-2 focus:outline-none ${
                              activeTab === category
                                ? "font-bold text-webriq-darkblue focus:outline-none"
                                : null
                            }`}
                            onClick={() => setActiveTab(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div> */}
              <CategoriesList
                categories={categories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            {posts && (
              <div className="w-full px-3 lg:w-3/4">
                {activeTab === "All"
                  ? posts?.slice(0, blogsPerPage)?.map((post, index) => (
                      <div
                        className="flex flex-wrap mb-8 -mx-3 lg:mb-6"
                        key={index}
                      >
                        <div className="w-full h-full px-3 mb-4 lg:mb-0 lg:w-1/4">
                          {post?.mainImage && (
                            <Image
                              className="object-cover w-full h-full overflow-hidden rounded"
                              src={urlFor(post?.mainImage)}
                              sizes="100vw"
                              width={188}
                              height={129}
                              alt={`blog-variantD-image-${index}`}
                            />
                          )}
                        </div>
                        <div className="w-full px-3 lg:w-3/4">
                          {post?.title && (
                            <Link
                              aria-label={post?.title}
                              className="hover:text-webriq-babyblue"
                              href={`/${
                                post?.slug?.current ?? "page-not-added"
                              }`}
                            >
                              <p className="mb-1 text-2xl font-bold font-heading">
                                {post?.title}
                              </p>
                            </Link>
                          )}
                          <div className="flex items-center mb-2 text-sm">
                            {post?.authors &&
                              post?.authors?.map(
                                (author, index, { length }) => (
                                  <div className="flex" key={index}>
                                    <span className="text-webriq-darkblue">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span>&nbsp;,&nbsp;</span>
                                    ) : null}
                                  </div>
                                )
                              )}
                            {post?.publishedAt && post?.authors && (
                              <span className="mx-2 text-gray-500">•</span>
                            )}
                            {post?.publishedAt && (
                              <span className="text-gray-500">
                                {format(
                                  new Date(post?.publishedAt),
                                  " dd MMM, yyyy"
                                )}
                              </span>
                            )}
                          </div>
                          {post?.excerpt && (
                            <p className="text-sm text-gray-500">
                              {post?.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  : postsPerCategory?.map((post, index) => (
                      <div
                        className="flex flex-wrap mb-8 -mx-3 lg:mb-6"
                        key={index}
                      >
                        <div className="w-full h-full px-3 mb-4 lg:mb-0 lg:w-1/4">
                          {post?.mainImage && (
                            <Image
                              className="object-cover w-full h-full overflow-hidden rounded"
                              src={urlFor(post?.mainImage)}
                              sizes="100vw"
                              width={188}
                              height={129}
                              alt={`blog-variantD-image-${index}`}
                            />
                          )}
                        </div>
                        <div className="w-full px-3 lg:w-3/4">
                          {post?.title && (
                            <Link
                              aria-label={post?.title}
                              className="hover:text-webriq-babyblue"
                              href={
                                `/${post?.slug?.current}` ?? "/page-not-found"
                              }
                            >
                              <p className="mb-1 text-2xl font-bold font-heading">
                                {post?.title}
                              </p>
                            </Link>
                          )}
                          <div className="flex items-center mb-2 text-sm">
                            {post?.authors &&
                              post?.authors?.map(
                                (author, index, { length }) => (
                                  <div className="flex" key={index}>
                                    <span className="text-webriq-darkblue">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span>&nbsp;,&nbsp;</span>
                                    ) : null}
                                  </div>
                                )
                              )}
                            {post?.publishedAt && post?.authors && (
                              <span className="mx-2 text-gray-500">•</span>
                            )}
                            {post?.publishedAt && (
                              <span className="text-gray-500">
                                {format(
                                  new Date(post?.publishedAt),
                                  " dd MMM, yyyy"
                                )}
                              </span>
                            )}
                          </div>
                          {post?.excerpt && (
                            <p className="text-sm text-gray-500">
                              {post?.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
