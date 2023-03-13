import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";

function VariantD({ subtitle, title, posts }) {
  let blogsPerPage = 6;
  const [activeTab, setActiveTab] = React.useState("All"); //set the first index category as initial value
  const [newArray, setNewArray] = React.useState([]);

  // transform array content to easily map posts per category
  React.useState(() => {
    posts?.map((post) => {
      post?.categories?.map((items) => {
        setNewArray((prevState) => [
          ...prevState,
          {
            category: items?.title,
            title: post?.title,
            slug: post?.slug,
            excerpt: post?.excerpt,
            publishedAt: post?.publishedAt,
            mainImage: post?.mainImage,
            authors: post?.authors,
          },
        ]);
      });
    });
  }, []);

  // get all categories
  const categories = newArray?.reduce((newArr, items) => {
    const titles = items?.category;

    if (newArr.indexOf(titles) === -1) {
      newArr.push(titles);
    }
    return newArr;
  }, []);

  // filtered posts per category
  const postsPerCategory = newArray?.filter(
    (items) => items?.category === activeTab
  );

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              {subtitle && (
                <span className="text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
              )}
              {title && (
                <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h1>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
              <div className="py-4 px-6 bg-white shadow rounded">
                {categories && (
                  <>
                    <h1 className="mb-4 text-gray-500 font-bold uppercase">
                      Topics
                    </h1>
                    <ul>
                      {categories?.length > 1 && (
                        <li
                          className={`hover:text-webriq-darkblue hover:bg-webriq-lightblue rounded ${
                            activeTab === "All" ? "bg-webriq-lightblue" : null
                          }`}
                        >
                          <button
                            aria-label="All Blogs tab"
                            className={`block py-2 px-3 mb-4 focus:outline-none ${
                              activeTab === "All"
                                ? "font-bold focus:outline-none text-webriq-darkblue"
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
                          className={`hover:text-webriq-darkblue hover:bg-webriq-lightblue rounded ${
                            activeTab === category
                              ? "bg-webriq-lightblue"
                              : null
                          }`}
                          key={index}
                        >
                          <button
                            aria-label={`${category} Blogs tab`}
                            className={`block py-2 px-3 mb-4 focus:outline-none ${
                              activeTab === category
                                ? "font-bold focus:outline-none text-webriq-darkblue"
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
              </div>
            </div>
            {posts && (
              <div className="w-full lg:w-3/4 px-3">
                {activeTab === "All"
                  ? posts?.slice(0, blogsPerPage)?.map((post, index) => (
                      <div
                        className="flex flex-wrap -mx-3 mb-8 lg:mb-6"
                        key={index}
                      >
                        <div className="mb-4 lg:mb-0 w-full h-full lg:w-1/4 px-3">
                          {post?.mainImage?.asset?._ref && (
                            <div className="rounded overflow-hidden">
                              <Image
                                src={urlFor(post?.mainImage)}
                                layout="responsive"
                                width="188px"
                                height="129px"
                                objectFit="cover"
                                alt={`blog-variantD-image-${index}`}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                            </div>
                          )}
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          {post?.title && (
                            <Link
                              aria-label={`Go to ${post?.slug?.current} blog page`}
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
                          <div className="mb-2 flex items-center text-sm">
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
                              <span className="text-gray-500 mx-2">•</span>
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
                            <p className="text-gray-500 text-sm">
                              {post?.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  : postsPerCategory?.map((post, index) => (
                      <div
                        className="flex flex-wrap -mx-3 mb-8 lg:mb-6"
                        key={index}
                      >
                        <div className="mb-4 lg:mb-0 h-full w-full lg:w-1/4 px-3">
                          {post?.mainImage?.asset?._ref && (
                            <div className="rounded overflow-hidden">
                              <Image
                                src={urlFor(post?.mainImage)}
                                layout="responsive"
                                width="188px"
                                height="129px"
                                objectFit="cover"
                                alt={`blog-variantD-image-${index}`}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                            </div>
                          )}
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          {post?.title && (
                            <Link
                              aria-label={`Go to ${post?.slug?.current} blog page`}
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
                          <div className="mb-2 flex items-center text-sm">
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
                              <span className="text-gray-500 mx-2">•</span>
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
                            <p className="text-gray-500 text-sm">
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
