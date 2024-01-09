import React from "react";
import Image from "next/image";
import { Text } from "components/ui/Text";

import { BlogProps } from "./index";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import Link from "next/link";

function VariantB({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 5,
    count = 0;

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center mb-6">
            <div className="w-full mb-16 text-center">
              {subtitle && (
                <Text className="font-bold text-webriq-darkblue">
                  {subtitle}
                </Text>
              )}
              {title && <Text type="h1">{title}</Text>}
            </div>
            <div className="flex flex-wrap mb-16 -mx-3">
              <div className="w-full px-3 mb-6 lg:mb-0 lg:w-1/2">
                {posts?.slice(count, count + 1)?.map((post, key) => (
                  <div className="overflow-hidden rounded shadow" key={key}>
                    {post?.mainImage && (
                      <Image
                        className="object-cover w-full h-full overflow-hidden rounded-t"
                        src={urlFor(post?.mainImage)}
                        sizes="100vw"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        width={271}
                        height={248}
                        alt={`blog-variantB-image-${key}`}
                      />
                    )}
                    <div className="p-6 mt-auto bg-white rounded-b">
                      {post?.publishedAt && (
                        <span className="text-sm text-gray-500">
                          {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
                        </span>
                      )}
                      {post?.title && (
                        <h1 className="my-2 text-lg font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                          {post?.title}
                        </h1>
                      )}
                      {post?.excerpt && (
                        <p className="mb-6 text-xs leading-loose text-justify text-gray-500 lg:text-base xl:text-base 2xl:text-base">
                          {post?.excerpt}
                        </p>
                      )}
                      {post?.slug?.current && (
                        <Link
                          aria-label="View Blog Post"
                          className="font-bold text-webriq-darkblue hover:text-webriq-babyblue"
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
                  <div className="w-full px-3 mb-6 lg:w-1/2" key={key}>
                    <div className="overflow-hidden rounded shadow">
                      {post?.mainImage && (
                        <Image
                          className="object-cover w-full h-full overflow-hidden rounded-t"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw"
                          width={259}
                          height={192}
                          alt={`blog-variantB-image-${key}`}
                        />
                      )}
                      <div className="p-6 mt-auto bg-white rounded-b">
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-2 text-lg font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
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
                            aria-label="View Blog Post"
                            className="font-bold text-webriq-darkblue hover:text-webriq-babyblue"
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
              {primaryButton?.label && (
                <ConditionalLink
                  link={primaryButton}
                  className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
                  ariaLabel={primaryButton?.label}
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
