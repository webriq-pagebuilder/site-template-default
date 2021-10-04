import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import BlockContent from "@sanity/block-content-to-react";

// block styling as props to `serializers` of the BlockContent component
const blockStyle = {
  types: {
    block: (props) => {
      const style = props.node.style || "normal";
      switch (style) {
        case "h1":
          return <h1 className="mb-6 leading-loose text-gray-900"></h1>;
        case "h2":
          return <h2 className="mb-6 leading-loose text-gray-900"></h2>;
        case "h3":
          return <h3 className="mb-6 leading-loose text-gray-900"></h3>;
        case "h4":
          return <h4 className="mb-6 leading-loose text-gray-900"></h4>;
        case "normal":
          return (
            <p className="mb-6 leading-loose text-justify text-gray-400">
              {props.children}
            </p>
          );
        case "blockquote":
          return (
            <blockquote className="mb-6 px-14 leading-loose italic text-gray-500">
              - {props.children}
            </blockquote>
          );
      }

      if (/^h\d/.test(style)) {
        const level = style.replace(/[^\d]/g, "");
        return React.createElement(
          style,
          { className: `heading-${level}` },
          props.children
        );
      }
    },
    code: (props) => {
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>;
    },
  },
  list: (props) =>
    props.type === "bullet" ? (
      <ul className="mb-6 pl-10 leading-loose text-gray-900 list-disc">
        {props.children}
      </ul>
    ) : (
      <ol className="mb-6 leading-loose text-gray-900 list-decimal">
        {props.children}
      </ol>
    ),
  listItem: (props) =>
    props.type === "bullet" ? (
      <li className="mb-6 leading-loose text-gray-900">{props.children}</li>
    ) : (
      <li className="mb-6 leading-loose text-gray-900">{props.children}</li>
    ),
  marks: {
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
    code: (props) => <code>{props.children}</code>,
    link: ({ children, mark }) => (
      <a
        className="hover:text-webriq-darkorange text-webriq-lightorange"
        href={mark.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

function VariantB({ subtitle, title, posts, buttonLabel }) {
  let blogsPerPage = 5,
    count = 0;
  const [blogsToShow, setBlogsToShow] = React.useState(count + 1); // set number of blogs to show
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // split array into groups of 5 posts
  const splitPosts = (arr, size, numberOfGroups) => {
    const chunks = arr.reduce(
      (chunks, items, i) =>
        (i % size
          ? chunks[chunks?.length - 1].push(items)
          : chunks.push([items])) && chunks,
      []
    );
    if (chunks[chunks?.length - 1]?.length < numberOfGroups) {
      chunks[chunks?.length - 2].push(...chunks.pop());
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
      <div className="p-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap justify-center">
            <div className="mb-16 w-full text-center">
              {subtitle && (
                <span className="text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
              )}
            </div>
            {newArray &&
              newArray?.slice(count, blogsToShow)?.map((posts, index) => (
                <div className="flex flex-wrap -mx-3 mb-16" key={index}>
                  <div className="mb-6 lg:mb-0 w-full lg:w-1/2 px-3">
                    {posts?.slice(count, count + 1)?.map((post, key) => (
                      <div
                        className="h-full flex flex-col rounded shadow"
                        key={key}
                      >
                        {post?.mainImage && (
                          <img
                            className="rounded-t object-cover h-80 lg:h-full w-full"
                            src={urlFor(post?.mainImage)}
                            alt={`blog-variantB-image-${key}`}
                          />
                        )}
                        <div className="mt-auto p-6 rounded-b bg-white">
                          {post?.categories &&
                            post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto py-1 px-3 text-sm bg-webriq-lightblue rounded-full text-webriq-darkblue uppercase font-bold"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          {post?.publishedAt && (
                            <span className="text-sm text-gray-400">
                              {format(
                                new Date(post?.publishedAt),
                                " dd MMM, yyyy"
                              )}
                            </span>
                          )}
                          {post?.title && (
                            <h2 className="my-2 text-2xl font-bold">
                              {post?.title}
                            </h2>
                          )}
                          {post?.authors && (
                            <div className="flex mb-5">
                              {post?.authors?.map(
                                (author, index, { length }) => (
                                  <div key={index}>
                                    <span className="text-webriq-babyblue text-sm italic">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span className="text-webriq-darkblue">
                                        &nbsp;,&nbsp;
                                      </span>
                                    ) : null}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          {post?.excerpt && (
                            <BlockContent
                              blocks={post?.excerpt}
                              serializers={blockStyle}
                            />
                          )}
                          <Link href={`/${post?.slug?.current}`}>
                            <a className="text-webriq-darkblue hover:text-webriq-babyblue font-bold">
                              Learn More
                            </a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap w-full lg:w-1/2">
                    {posts?.slice(count + 1, blogsPerPage)?.map((post, key) => (
                      <div className="mb-6 w-full lg:w-1/2 px-3" key={key}>
                        <div className="rounded overflow-hidden shadow">
                          {post?.mainImage && (
                            <img
                              className="h-80 lg:h-full w-full rounded-t object-cover"
                              src={urlFor(post?.mainImage)}
                              alt={`blog-variantB-image-${key}`}
                            />
                          )}
                          <div className="p-6 rounded-b bg-white">
                            {post?.categories &&
                              post?.categories?.map((category, index) => (
                                <span
                                  className="mb-auto py-1 px-3 text-sm bg-webriq-lightblue rounded-full text-webriq-darkblue uppercase font-bold"
                                  key={index}
                                >
                                  {category?.title}
                                </span>
                              ))}
                            {post?.publishedAt && (
                              <span className="text-sm text-gray-400">
                                {format(
                                  new Date(post?.publishedAt),
                                  " dd MMM, yyyy"
                                )}
                              </span>
                            )}
                            {post?.title && (
                              <h2 className="my-2 text-2xl font-bold">
                                {post?.title}
                              </h2>
                            )}
                            {post?.authors && (
                              <div className="flex mb-5">
                                {post?.authors?.map(
                                  (author, index, { length }) => (
                                    <div key={index}>
                                      <span className="text-webriq-babyblue text-sm italic">
                                        {author?.name}
                                      </span>
                                      {index + 1 !== length ? (
                                        <span className="text-webriq-darkblue">
                                          &nbsp;,&nbsp;
                                        </span>
                                      ) : null}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                            <Link href={`/${post?.slug?.current}`}>
                              <a className="text-webriq-darkblue hover:text-webriq-babyblue font-bold">
                                Learn More
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            <div>
              {posts?.length > blogsPerPage && !showMore && buttonLabel && (
                <button
                  aria-label="View More Blogs button"
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose outline-none transition duration-200"
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
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
