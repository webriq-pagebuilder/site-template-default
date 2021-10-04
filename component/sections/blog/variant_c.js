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

function VariantC({ subtitle, title, posts, buttonLabel }) {
  let blogs = 5,
    startPage = 1;
  let [numberOfPages, setNumberOfPages] = React.useState(startPage); // number of pages
  let [blogsPerPage, setBlogsPerPage] = React.useState(blogs); // sets the number of blogs to initially show on page
  let [activePage, setActivePage] = React.useState(startPage); // the current page
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // get blog list for page
  const indexOfLastPost = numberOfPages * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;

  // change page
  const changePage = (buttonNumber) => setNumberOfPages(buttonNumber);

  // pagination
  const Pagination = ({ blogsPerPage, changePage }) => {
    const pageButtons = [];

    for (let i = 1; i <= Math.ceil(posts?.length / blogsPerPage); i++) {
      pageButtons.push(i);
    }

    return (
      <div className="mb-16 flex justify-center space-x-4">
        <div className="flex justify-center">
          <nav
            className="flex items-center bg-white shadow rounded"
            aria-label="Pagination"
          >
            {activePage > startPage && (
              <button
                aria-label="Show Previous Blog button"
                className="px-4 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  activePage !== startPage
                    ? setActivePage(activePage - startPage)
                    : setActivePage(startPage);
                  changePage(activePage - 1);
                }}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            )}
            <div className="p-2 border-r border-l text-gray-500">
              {pageButtons?.map((buttonNumber) => (
                <button
                  aria-label={`Page ${buttonNumber + 1} button`}
                  className={`"mx-1 px-2 rounded hover:bg-webriq-lightblue hover:text-webriq-blue text-webriq-darkblue" ${
                    activePage === buttonNumber
                      ? "bg-webriq-lightblue text-webriq-blue"
                      : null
                  }`}
                  key={buttonNumber}
                  onClick={() => {
                    changePage(buttonNumber);
                    setActivePage(buttonNumber);
                  }}
                >
                  {buttonNumber}
                </button>
              ))}
            </div>
            {activePage !== pageButtons?.length && (
              <button
                aria-label="Show Next Blog button"
                className="px-4 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  changePage(pageButtons[activePage]);
                  activePage !== pageButtons?.length
                    ? setActivePage(activePage + 1)
                    : setActivePage(startPage);
                }}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            )}
          </nav>
        </div>
      </div>
    );
  };

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
                <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
              )}
            </div>
            {posts?.length > blogsPerPage && buttonLabel && (
              <div className="hidden lg:block text-right w-1/2">
                <button
                  aria-label="View More Blogs button"
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                  onClick={() => {
                    setBlogsPerPage(posts?.length);
                    setShowMore(true);
                  }}
                >
                  {buttonLabel}
                </button>
              </div>
            )}
          </div>
          {posts && (
            <div>
              {posts
                ?.slice(indexOfFirstPost, indexOfLastPost)
                ?.map((post, key) => (
                  <div
                    className="mb-8 flex flex-wrap rounded-lg shadow overflow-hidden"
                    key={key}
                  >
                    {key % 2 === 0 ? (
                      <>
                        <div className="w-full lg:w-1/2 rounded-l">
                          {post?.mainImage && (
                            <img
                              className="object-cover"
                              src={urlFor(post?.mainImage)}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="w-full lg:w-1/2 py-6 lg:pt-10 px-6 rounded-r bg-white">
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
                            <h2 className="my-4 text-2xl font-bold">
                              {post?.title}
                            </h2>
                          )}
                          {post?.authors && (
                            <div className="flex mb-10">
                              <span className="text-webriq-darkblue italic">
                                By&nbsp;
                              </span>
                              {post?.authors?.map(
                                (author, index, { length }) => (
                                  <div key={index}>
                                    <span className="text-webriq-darkblue italic">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span>&nbsp;,&nbsp;</span>
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
                            <a className="text-webriq-blue hover:text-webriq-darkblue font-bold">
                              Learn More
                            </a>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full lg:w-1/2 py-6 lg:pt-10 px-6 rounded-r bg-white">
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
                            <h2 className="my-4 text-2xl font-bold">
                              {post?.title}
                            </h2>
                          )}
                          {post?.authors && (
                            <div className="flex mb-10">
                              <span className="text-webriq-darkblue italic">
                                By&nbsp;
                              </span>
                              {post?.authors?.map(
                                (author, index, { length }) => (
                                  <div key={index}>
                                    <span className="text-webriq-darkblue italic">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span>&nbsp;,&nbsp;</span>
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
                            <a className="text-webriq-blue hover:text-webriq-darkblue font-bold">
                              Learn More
                            </a>
                          </Link>
                        </div>
                        <div className="w-full lg:w-1/2 rounded-l order-0 lg:order-1">
                          {post?.mainImage && (
                            <img
                              className="object-cover"
                              src={urlFor(post?.mainImage)}
                              alt=""
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              {posts?.length > 10 && !showMore && (
                <Pagination
                  blogsPerPage={blogsPerPage}
                  changePage={changePage}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
