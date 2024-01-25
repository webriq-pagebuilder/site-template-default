import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalLink } from "helper";

import { BlogProps } from ".";

function VariantC({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 3;

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center mb-16">
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              {subtitle && (
                <span className="font-bold text-brand-primary">{subtitle}</span>
              )}
              {title && (
                <h1 className="text-4xl font-bold font-heading lg:text-5xl xl:text-5xl">
                  {title}
                </h1>
              )}
            </div>
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
          {posts && (
            <div>
              {posts?.slice(0, blogsPerPage)?.map((post, key) => (
                <div
                  className="flex flex-wrap mb-8 overflow-hidden rounded-lg shadow"
                  key={key}
                >
                  {key % 2 === 0 ? (
                    <>
                      {post?.mainImage && (
                        <Image
                          className="object-cover w-full h-auto rounded-l lg:w-1/2"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw"
                          width={554}
                          height={416}
                          alt={`blog-variantC-image-${key}`}
                        />
                      )}
                      <div className="w-full px-6 py-6 bg-white rounded-r lg:w-1/2 lg:pt-10">
                        {post?.categories &&
                          post?.categories?.map((category, index) => (
                            <span
                              className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase rounded-full bg-brand-secondary-foreground text-brand-primary"
                              key={index}
                            >
                              {category?.title}
                            </span>
                          ))}
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-4 text-xl font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                            {post?.title}
                          </h1>
                        )}
                        {post?.authors && (
                          <div className="flex mb-10">
                            <span className="italic text-brand-primary">
                              By&nbsp;
                            </span>
                            {post?.authors?.map((author, index, { length }) => (
                              <div key={index}>
                                <span className="italic text-brand-primary">
                                  {author?.name}
                                </span>
                                {index + 1 !== length ? (
                                  <span>&nbsp;,&nbsp;</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        )}
                        {post?.excerpt && (
                          <p className="mb-6 text-sm text-justify text-gray-500 lg:text-base lg:leading-loose xl:text-base xl:leading-loose 2xl:text-base 2xl:leading-loose">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label="View Blog Post"
                            className="font-bold text-brand-primary hover:text-brand-primary-foreground"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            View Blog Post
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full px-6 py-6 bg-white rounded-r lg:w-1/2 lg:pt-10">
                        {post?.categories &&
                          post?.categories?.map((category, index) => (
                            <span
                              className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase rounded-full bg-brand-secondary-foreground text-brand-primary"
                              key={index}
                            >
                              {category?.title}
                            </span>
                          ))}
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-4 text-xl font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                            {post?.title}
                          </h1>
                        )}
                        {post?.authors && (
                          <div className="flex mb-10">
                            <span className="italic text-brand-primary">
                              By&nbsp;
                            </span>
                            {post?.authors?.map((author, index, { length }) => (
                              <div key={index}>
                                <span className="italic text-brand-primary">
                                  {author?.name}
                                </span>
                                {index + 1 !== length ? (
                                  <span>&nbsp;,&nbsp;</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        )}
                        {post?.excerpt && (
                          <p className="mb-6 text-sm text-justify text-gray-500 lg:text-base lg:leading-loose xl:text-base xl:leading-loose 2xl:text-base 2xl:leading-loose">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label="View Blog Post"
                            className="font-bold text-brand-primary hover:text-brand-primary-foreground"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            View Blog Post
                          </Link>
                        )}
                      </div>
                      {post?.mainImage && (
                        <Image
                          className="object-cover w-full h-auto rounded-l order-0 lg:order-1 lg:w-1/2"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw"
                          width={554}
                          height={416}
                          alt={`blog-variantC-image-${key}`}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          {primaryButton?.label && (
            <div className="block text-center lg:hidden lg:w-1/2">
              <ConditionalLink
                link={primaryButton}
                className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-brand-primary hover:bg-brand-primary-foreground text-gray-50"
                ariaLabel={primaryButton?.label}
              >
                {primaryButton?.label}
              </ConditionalLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
