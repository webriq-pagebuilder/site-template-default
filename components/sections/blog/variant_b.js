import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalBtnOrLink } from "helper";


function VariantB({ subtitle, title, posts, primaryButton }) {
  let blogsPerPage = 5,
    count = 0;

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap justify-center">
            <div className="mb-16 w-full text-center">
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
            <div className="flex flex-wrap -mx-3 mb-16">
              <div className="mb-6 lg:mb-0 w-full lg:w-1/2 px-3">
                {posts?.slice(count, count + 1)?.map((post, key) => (
                  <div className="rounded overflow-hidden shadow" key={key}>
                    {post?.mainImage?.asset?._ref && (
                      <Image
                        className="w-full h-full rounded-t overflow-hidden object-cover"
                        src={urlFor(post?.mainImage)}
                        sizes="100vw" 
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        width={271}
                        height={248}
                        alt={`blog-variantB-image-${key}`}
                      />
                    )}
                    <div className="mt-auto p-6 rounded-b bg-white">
                      {post?.publishedAt && (
                        <span className="text-sm text-gray-500">
                          {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
                        </span>
                      )}
                      {post?.title && (
                        <h1 className="my-2 text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold">
                          {post?.title}
                        </h1>
                      )}
                      {post?.excerpt && (
                        <p className="mb-6 leading-loose text-xs lg:text-base xl:text-base 2xl:text-base text-justify text-gray-500">
                          {post?.excerpt}
                        </p>
                      )}
                      {post?.slug?.current && (
                        <Link
                          aria-label={`Go to ${post?.slug?.current} blog page`}
                          className="text-webriq-darkblue hover:text-webriq-babyblue font-bold"
                          href={`/${post?.slug?.current}` ?? "/page-not-found"}
                        >
                          View Blog Post
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts?.slice(count + 1, blogsPerPage)?.map((post, key) => (
                  <div className="mb-6 w-full lg:w-1/2 px-3" key={key}>
                    <div className="rounded overflow-hidden shadow">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="w-full h-full rounded-t overflow-hidden object-cover"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw" 
                          width={259}
                          height={192}
                          alt={`blog-variantB-image-${key}`}
                        />
                      )}
                      <div className="mt-auto p-6 rounded-b bg-white">
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-2 text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold">
                            {post?.title}
                          </h1>
                        )}
                        {post?.excerpt && (
                          <p className="mb-6 leading-loose text-justify text-gray-500">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label={`Go to ${post?.slug?.current} blog page`}
                            className="text-webriq-darkblue hover:text-webriq-babyblue font-bold"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            View Blog Post
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
