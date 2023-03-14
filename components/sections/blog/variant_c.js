import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalBtnOrLink } from "helper";


function VariantC({ subtitle, title, posts, primaryButton }) {
  let blogsPerPage = 3;

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              {subtitle && (
                <span className="text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
              )}
              {title && (
                <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold font-heading">
                  {title}
                </h1>
              )}
            </div>
            {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200" />}
          </div>
          {posts && (
            <div>
              {posts?.slice(0, blogsPerPage)?.map((post, key) => (
                <div
                  className="mb-8 flex flex-wrap rounded-lg shadow overflow-hidden"
                  key={key}
                >
                  {key % 2 === 0 ? (
                    <>
                      {post?.mainImage && (
                        <Image
                          className="w-full h-auto lg:w-1/2 rounded-l object-cover"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw" 
                          width={554}
                          height={416}
                          alt={`blog-variantC-image-${key}`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      )}
                      <div className="w-full lg:w-1/2 py-6 lg:pt-10 px-6 rounded-r bg-white">
                        {post?.categories &&
                          post?.categories?.map((category, index) => (
                            <span
                              className="mb-auto py-1 px-3 mr-3 text-sm bg-webriq-lightblue rounded-full text-webriq-darkblue uppercase font-bold"
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
                          <h1 className="my-4 text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold">
                            {post?.title}
                          </h1>
                        )}
                        {post?.authors && (
                          <div className="flex mb-10">
                            <span className="text-webriq-darkblue italic">
                              By&nbsp;
                            </span>
                            {post?.authors?.map((author, index, { length }) => (
                              <div key={index}>
                                <span className="text-webriq-darkblue italic">
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
                          <p className="mb-6 text-sm lg:text-base xl:text-base 2xl:text-base lg:leading-loose xl:leading-loose 2xl:leading-loose text-justify text-gray-500">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label={`Go to ${post?.slug?.current} blog page`}
                            className="text-webriq-darkblue hover:text-webriq-blue font-bold"
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
                      <div className="w-full lg:w-1/2 py-6 lg:pt-10 px-6 rounded-r bg-white">
                        {post?.categories &&
                          post?.categories?.map((category, index) => (
                            <span
                              className="mb-auto py-1 px-3 mr-3 text-sm bg-webriq-lightblue rounded-full text-webriq-darkblue uppercase font-bold"
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
                          <h1 className="my-4 text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold">
                            {post?.title}
                          </h1>
                        )}
                        {post?.authors && (
                          <div className="flex mb-10">
                            <span className="text-webriq-darkblue italic">
                              By&nbsp;
                            </span>
                            {post?.authors?.map((author, index, { length }) => (
                              <div key={index}>
                                <span className="text-webriq-darkblue italic">
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
                          <p className="mb-6 text-sm lg:text-base xl:text-base 2xl:text-base lg:leading-loose xl:leading-loose 2xl:leading-loose text-justify text-gray-500">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label={`Go to ${post?.slug?.current} blog page`}
                            className="text-webriq-darkblue hover:text-webriq-blue font-bold"
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
                          className="w-full h-auto lg:w-1/2 rounded-l order-0 lg:order-1 object-cover"
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
              <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
