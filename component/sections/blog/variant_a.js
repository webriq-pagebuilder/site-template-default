import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";

function VariantA({ subtitle, title, posts, buttonLabel }) {
  let blogsPerPage = 6,
    count = 0;
  const [blogsToShow, setBlogsToShow] = React.useState(count + 1); // set number of blogs to show
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // split array into groups of 6 posts
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

  const newArray = splitPosts(
    posts,
    blogsPerPage,
    Math.ceil(posts?.length / blogsPerPage)
  );

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
          {newArray &&
            newArray?.slice(count, blogsToShow)?.map((posts, index) => (
              <div className="flex flex-wrap justify-center -mx-3" key={index}>
                <div className="flex flex-wrap w-full lg:w-1/2">
                  {posts?.slice(count, count + 1)?.map((post, key) => (
                    <div
                      className="w-full px-3 mb-5 transform hover:scale-110 motion-reduce:transform-none"
                      key={key}
                    >
                      <Link
                        href={`/${post?.slug?.current}` ?? "/page-not-found"}
                      >
                        <a aria-label={`blog post ${key}`}>
                          <div className="relative h-64 mx-auto overflow-hidden rounded">
                            <div className="relative h-full w-full rounded">
                              <Image
                                src={urlFor(post?.mainImage)}
                                layout="fill"
                                objectFit="cover"
                                alt={`blog-variantA-image-${key}`}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                              <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                              <div className="absolute inset-0 p-6 flex flex-col items-start">
                                {post?.categories && (
                                  <div className="flex absolute top-5 left-5">
                                    {post?.categories?.map(
                                      (category, index) => (
                                        <span
                                          className="mb-auto py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                          key={index}
                                        >
                                          {category?.title}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                                <div className="flex absolute bottom-14 left-5">
                                  {post?.authors && (
                                    <div className="flex">
                                      {post?.authors?.map(
                                        (author, index, { length }) => (
                                          <div key={index}>
                                            <span className="text-sm text-webriq-babyblue">
                                              {author?.name}
                                            </span>
                                            {index + 1 !== length ? (
                                              <span className="text-sm text-webriq-babyblue">
                                                &nbsp;,&nbsp;
                                              </span>
                                            ) : null}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                  {post?.publishedAt && post?.authors && (
                                    <span className="text-sm text-gray-500 mx-2">
                                      •
                                    </span>
                                  )}
                                  {post?.publishedAt && (
                                    <span className="text-sm text-gray-500">
                                      {format(
                                        new Date(post?.publishedAt),
                                        "dd MMM, yyyy"
                                      )}
                                    </span>
                                  )}
                                </div>
                                {post?.title && (
                                  <p className="absolute bottom-5 left-5 text-xl lg:text-2xl text-white font-bold overflow-ellipsis overflow-hidden">
                                    {post?.title?.length > 30
                                      ? post?.title.substring(0, 30) + "..."
                                      : post?.title}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                  {posts?.slice(count + 1, count + 3)?.map((post, key) => (
                    <div
                      className="w-full lg:w-1/2 px-3 mb-5 transform hover:scale-110 motion-reduce:transform-none"
                      key={key}
                    >
                      <Link
                        href={`/${post?.slug?.current}` ?? "/page-not-found"}
                      >
                        <a aria-label={`blog post ${key}`}>
                          <div className="relative mx-auto overflow-hidden rounded h-128">
                            <div className="relative h-full w-full rounded">
                              <Image
                                src={urlFor(post?.mainImage)}
                                layout="responsive"
                                width="358px"
                                height="237px"
                                objectFit="cover"
                                alt={`blog-variantA-image-${key}`}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                            </div>
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
                              <div className="flex absolute bottom-14 left-5">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-500 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-500">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="absolute bottom-5 left-5 text-xl lg:text-2xl text-white font-bold overflow-ellipsis overflow-hidden">
                                  {post?.title?.length > 30
                                    ? post?.title.substring(0, 30) + "..."
                                    : post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap w-full lg:w-1/2">
                  {posts?.slice(count + 3, count + 5)?.map((post, key) => (
                    <div
                      className="w-full lg:w-1/2 px-3 mb-5 transform hover:scale-110 motion-reduce:transform-none"
                      key={key}
                    >
                      <Link
                        href={`/${post?.slug?.current}` ?? "/page-not-found"}
                      >
                        <a aria-label={`blog post ${key}`}>
                          <div className="relative mx-auto overflow-hidden rounded h-128">
                            <div className="relative h-full w-full rounded">
                              <Image
                                src={urlFor(post?.mainImage)}
                                layout="responsive"
                                width="358px"
                                height="237px"
                                objectFit="cover"
                                alt={`blog-variantA-image-${key}`}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                            </div>
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
                              <div className="flex absolute bottom-14 left-5">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-500 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-500">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="absolute bottom-5 left-5 text-xl lg:text-2xl text-white font-bold overflow-ellipsis overflow-hidden">
                                  {post?.title?.length > 30
                                    ? post?.title.substring(0, 30) + "..."
                                    : post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                  {posts?.slice(count + 5, blogsPerPage)?.map((post, key) => (
                    <div
                      className="w-full px-3 mb-5 transform hover:scale-110 motion-reduce:transform-none"
                      key={key}
                    >
                      <Link
                        href={`/${post?.slug?.current}` ?? "/page-not-found"}
                      >
                        <a aria-label={`blog post ${key}`}>
                          <div className="relative mx-auto overflow-hidden rounded h-64">
                            <Image
                              src={urlFor(post?.mainImage)}
                              layout="fill"
                              objectFit="cover"
                              alt={`blog-variantA-image-${key}`}
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                              placeholder="blur"
                            />
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
                              <div className="flex absolute bottom-14 left-5">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-500 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-500">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="absolute bottom-5 left-5 text-xl lg:text-2xl text-white font-bold">
                                  {post?.title?.length > 30
                                    ? post?.title.substring(0, 30) + "..."
                                    : post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  {!showMore && buttonLabel && (
                    <button
                      aria-label="View More Blogs button"
                      className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                      onClick={() => {
                        setBlogsToShow(newArray?.length);
                        setShowMore(true);
                      }}
                    >
                      {buttonLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
