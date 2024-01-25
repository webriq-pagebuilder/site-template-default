import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { Text } from "components/ui/Text";

import { BlogProps } from ".";
import { Badge } from "components/ui/Badge";
import { ConditionalLink } from "components/ui/ConditionalLink";

function VariantA({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 6,
    count = 0;

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            {subtitle && (
              <Text className="font-bold text-brand-primary">{subtitle}</Text>
            )}
            {title && <Text type="h1">{title}</Text>}
          </div>
          {posts && (
            <div className="flex flex-wrap justify-center -mx-3">
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts?.slice(count, count + 1)?.map((post, key) => (
                  <div className="w-full px-3 mb-5" key={key}>
                    <div className="relative h-64 mx-auto rounded">
                      {post?.mainImage && (
                        <Image
                          className="relative object-cover w-full h-full overflow-hidden rounded"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          sizes="(min-width: 1540px) 740px, (min-width: 1280px) 612px, (min-width: 1040px) 484px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 rounded opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute flex left-5 top-5">
                            {post?.categories?.map((category, index) => (
                              <Badge key={index}>{category?.title}</Badge>
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
                            aria-label={post?.title}
                            className="text-xl font-bold text-white transform hover:scale-110 hover:text-brand-secondary motion-reduce:transform-none lg:text-2xl"
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
                  <div className="w-full px-3 mb-5 lg:w-1/2" key={key}>
                    <div className="relative h-64 mx-auto rounded">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="relative object-cover w-full h-full overflow-hidden rounded"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          style={{
                            objectFit: "fill",
                          }}
                          sizes="(min-width: 1540px) 358px, (min-width: 1280px) 294px, (min-width: 1040px) 230px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 rounded opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute flex left-5 top-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase bg-white rounded-full text-brand-primary"
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
                            className="text-xl font-bold text-white transform hover:scale-110 hover:text-brand-secondary motion-reduce:transform-none lg:text-2xl"
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
                  <div className="w-full px-3 mb-5 lg:w-1/2" key={key}>
                    <div className="relative h-64 mx-auto rounded">
                      {post?.mainImage && (
                        <Image
                          className="relative object-cover w-full h-full overflow-hidden rounded"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          sizes="(min-width: 1540px) 358px, (min-width: 1280px) 294px, (min-width: 1040px) 230px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 rounded opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute flex left-5 top-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase bg-white rounded-full text-brand-primary"
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
                            className="text-xl font-bold text-white transform hover:scale-110 hover:text-brand-secondary motion-reduce:transform-none lg:text-2xl"
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
                    <div className="relative h-64 mx-auto rounded">
                      {post?.mainImage && (
                        <Image
                          className="relative object-cover w-full h-full overflow-hidden rounded"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          sizes="(min-width: 1540px) 740px, (min-width: 1280px) 612px, (min-width: 1040px) 484px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900 rounded opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute flex left-5 top-5">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase bg-white rounded-full text-brand-primary"
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
                            className="text-xl font-bold text-white transform hover:scale-110 hover:text-brand-secondary motion-reduce:transform-none lg:text-2xl"
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
                {primaryButton?.label && (
                  <ConditionalLink
                    link={primaryButton}
                    className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-brand-primary hover:bg-brand-primary-foreground text-gray-50"
                    ariaLabel={primaryButton?.label}
                  >
                    {primaryButton?.label}
                  </ConditionalLink>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
