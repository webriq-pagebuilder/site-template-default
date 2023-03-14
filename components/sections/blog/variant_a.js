import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalBtnOrLink } from "helper";


function VariantA({ subtitle, title, posts, primaryButton }) {
  let blogsPerPage = 6,
    count = 0;

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            {subtitle && (
              <span className="text-webriq-darkblue font-bold">{subtitle}</span>
            )}
            {title && (
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          {posts && (
            <div className="flex flex-wrap justify-center -mx-3">
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts?.slice(count, count + 1)?.map((post, key) => (
                  <div className="w-full px-3 mb-5" key={key}>
                    <div className="relative h-64 mx-auto rounded">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="relative h-full w-full rounded overflow-hidden object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        {post?.categories && (
                          <div className="flex absolute top-5 left-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            aria-label={`blog post ${key}`}
                            className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {posts?.slice(count + 1, count + 3)?.map((post, key) => (
                  <div className="w-full lg:w-1/2 px-3 mb-5" key={key}>
                    <div className="relative mx-auto rounded h-64">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="relative h-full w-full rounded overflow-hidden object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        {post?.categories && (
                          <div className="flex absolute top-5 left-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts?.slice(count + 3, count + 5)?.map((post, key) => (
                  <div className="w-full lg:w-1/2 px-3 mb-5" key={key}>
                    <div className="relative mx-auto rounded h-64">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="relative h-full w-full rounded overflow-hidden object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        {post?.categories && (
                          <div className="flex absolute top-5 left-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {posts?.slice(count + 5, blogsPerPage)?.map((post, key) => (
                  <div className="w-full px-3 mb-5" key={key}>
                    <div className="relative mx-auto rounded h-64">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="relative h-full w-full rounded overflow-hidden object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        {post?.categories && (
                          <div className="flex absolute top-5 left-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto py-1 px-3 mr-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200" />}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
