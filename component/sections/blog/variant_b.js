import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";

function VariantB({ subtitle, title, posts, buttonLabel }) {
  let blogsPerPage = 5,
    count = 0;
  const [blogsToShow, setBlogsToShow] = React.useState(count + 1); // set number of blogs to show
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // split array into groups of 5 posts
  const splitPosts = (arr, size, numberOfGroups) => {
    const chunks = arr?.reduce(
      (chunks, items, i) =>
        (i % size
          ? chunks[chunks?.length - 1].push(items)
          : chunks.push([items])) && chunks,
      []
    );
    if (chunks?.[chunks?.length]?.length < numberOfGroups) {
      chunks?.[chunks?.length].push(...chunks.pop());
    }
    return chunks;
  };

  const groupedBlogsArray = splitPosts(
    posts,
    blogsPerPage,
    Math.ceil(posts?.length / blogsPerPage)
  );

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
            {groupedBlogsArray &&
              groupedBlogsArray
                ?.slice(count, blogsToShow)
                ?.map((posts, index) => (
                  <div className="flex flex-wrap -mx-3 mb-16" key={index}>
                    <div className="mb-6 lg:mb-0 w-full lg:w-1/2 px-3">
                      {posts?.slice(count, count + 1)?.map((post, key) => (
                        <div
                          className="rounded overflow-hidden shadow"
                          key={key}
                        >
                          <div className="h-full rounded-t overflow-hidden">
                            <Image
                              src={urlFor(post?.mainImage)}
                              layout="responsive"
                              width="271px"
                              height="248px"
                              objectFit="cover"
                              alt={`blog-variantB-image-${key}`}
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                              placeholder="blur"
                            />
                          </div>
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
                              <p className="mb-6 leading-loose text-xs lg:text-base xl:text-base 2xl:text-base text-justify text-gray-500">
                                {post?.excerpt}
                              </p>
                            )}
                            <Link
                              href={
                                `/${post?.slug?.current}` ?? "/page-not-found"
                              }
                            >
                              <a
                                aria-label={`Go to ${post?.slug?.current} blog page`}
                                className="text-webriq-darkblue hover:text-webriq-babyblue font-bold"
                              >
                                View Blog Post
                              </a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap w-full lg:w-1/2">
                      {posts
                        ?.slice(count + 1, blogsPerPage)
                        ?.map((post, key) => (
                          <div className="mb-6 w-full lg:w-1/2 px-3" key={key}>
                            <div className="rounded overflow-hidden shadow">
                              <div className="h-full rounded-t overflow-hidden">
                                <Image
                                  src={urlFor(post?.mainImage)}
                                  layout="responsive"
                                  width="259px"
                                  height="192px"
                                  objectFit="cover"
                                  alt={`blog-variantB-image-${key}`}
                                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                  placeholder="blur"
                                />
                              </div>
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
                                <Link
                                  href={
                                    `/${post?.slug?.current}` ??
                                    "/page-not-found"
                                  }
                                >
                                  <a
                                    aria-label={`Go to ${post?.slug?.current} blog page`}
                                    className="text-webriq-darkblue hover:text-webriq-babyblue font-bold"
                                  >
                                    View Blog Post
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            <div className="text-center">
              {posts?.length > blogsPerPage && !showMore && buttonLabel && (
                <button
                  aria-label="View More Blogs button"
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                  onClick={() => {
                    setBlogsToShow(groupedBlogsArray?.length);
                    setShowMore(true);
                  }}
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
