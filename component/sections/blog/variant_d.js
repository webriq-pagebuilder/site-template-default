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
            <p className="mb-6 leading-loose text-justify text-gray-500">
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

function VariantD({ subtitle, title, posts, buttonLabel }) {
  let blogs = 5;
  let [blogsPerPage, setBlogsPerPage] = React.useState(blogs); // sets the number of blogs to initially show on page
  const [activeTab, setActiveTab] = React.useState("All"); //set the first index category as initial value
  const [newArray, setNewArray] = React.useState([]);

  // transform array content to easily map posts per category
  React.useState(() => {
    posts?.map((post) => {
      post?.categories?.map((items) => {
        setNewArray((prevState) => [
          ...prevState,
          {
            category: items?.title,
            title: post?.title,
            slug: post?.slug,
            excerpt: post?.excerpt,
            publishedAt: post?.publishedAt,
            mainImage: post?.mainImage,
            authors: post?.authors,
          },
        ]);
      });
    });
  }, []);

  // get all categories
  const categories = newArray?.reduce((newArr, items) => {
    const titles = items?.category;

    if (newArr.indexOf(titles) === -1) {
      newArr.push(titles);
    }
    return newArr;
  }, []);

  // filtered posts per category
  const postsPerCategory = newArray?.filter(
    (items) => items?.category === activeTab
  );

  return (
    <section>
      <div className="p-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
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
            <div className="hidden lg:block text-right w-1/2">
              {activeTab === "All" ? (
                posts?.length > blogsPerPage ? (
                  <button
                    aria-label="View All Blogs button"
                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                    onClick={() => setBlogsPerPage(posts?.length)}
                  >
                    {buttonLabel}
                  </button>
                ) : null
              ) : postsPerCategory?.length > blogsPerPage ? (
                <button
                  aria-label={`View All Blogs For ${activeTab} button`}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                  onClick={() => setBlogsPerPage(postsPerCategory?.length)}
                >
                  {buttonLabel}
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
              <div className="py-4 px-6 bg-white shadow rounded">
                <h4 className="mb-4 text-gray-500 font-bold uppercase">
                  Topics
                </h4>
                {categories && (
                  <ul>
                    {categories?.length > 1 && (
                      <li
                        className={`hover:text-webriq-darkblue hover:bg-webriq-lightblue rounded ${
                          activeTab === "All" ? "bg-webriq-lightblue" : null
                        }`}
                      >
                        <button
                          aria-label="All Blogs tab"
                          className={`block py-2 px-3 mb-4 ${
                            activeTab === "All"
                              ? "font-bold focus:outline-none text-webriq-darkblue"
                              : null
                          }`}
                          onClick={() => setActiveTab("All")}
                        >
                          All
                        </button>
                      </li>
                    )}
                    {categories?.map((category, index) => (
                      <li
                        className={`hover:text-webriq-darkblue hover:bg-webriq-lightblue rounded ${
                          activeTab === category ? "bg-webriq-lightblue" : null
                        }`}
                        key={index}
                      >
                        <button
                          aria-label={`${category} Blogs tab`}
                          className={`block py-2 px-3 mb-4 focus:outline-none ${
                            activeTab === category
                              ? "font-bold focus:outline-none text-webriq-darkblue"
                              : null
                          }`}
                          onClick={() => setActiveTab(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {posts && (
              <div className="w-full lg:w-3/4 px-3">
                {activeTab === "All"
                  ? posts?.slice(0, blogsPerPage)?.map((post, index) => (
                      <div
                        className="flex flex-wrap -mx-3 mb-8 lg:mb-6"
                        key={index}
                      >
                        <div className="mb-4 lg:mb-0 w-full lg:w-1/4 px-3">
                          {post?.mainImage && (
                            <img
                              className="w-full h-full object-cover rounded"
                              src={urlFor(post?.mainImage)}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          {post?.title && (
                            <Link href={`/${post?.slug?.current}`}>
                              <a className="hover:text-webriq-babyblue">
                                <h3 className="mb-1 text-2xl font-bold font-heading">
                                  {post?.title}
                                </h3>
                              </a>
                            </Link>
                          )}
                          <div className="mb-2 flex items-center text-sm">
                            {post?.authors &&
                              post?.authors?.map(
                                (author, index, { length }) => (
                                  <div className="flex" key={index}>
                                    <span className="text-webriq-darkblue">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span>&nbsp;,&nbsp;</span>
                                    ) : null}
                                  </div>
                                )
                              )}
                            {post?.publishedAt && post?.authors && (
                              <span className="text-gray-400 mx-2">•</span>
                            )}
                            {post?.publishedAt && (
                              <span className="text-gray-400">
                                {format(
                                  new Date(post?.publishedAt),
                                  " dd MMM, yyyy"
                                )}
                              </span>
                            )}
                          </div>
                          {post?.excerpt && (
                            <BlockContent
                              blocks={post?.excerpt}
                              serializers={blockStyle}
                            />
                          )}
                        </div>
                      </div>
                    ))
                  : postsPerCategory?.map((post, index) => (
                      <div
                        className="flex flex-wrap -mx-3 mb-8 lg:mb-6"
                        key={index}
                      >
                        <div className="mb-4 lg:mb-0 w-full lg:w-1/4 px-3">
                          {post?.mainImage && (
                            <img
                              className="w-full h-full object-cover rounded"
                              src={urlFor(post?.mainImage)}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          {post?.title && (
                            <Link href={`/${post?.slug?.current}`}>
                              <a className="hover:text-webriq-babyblue">
                                <h3 className="mb-1 text-2xl font-bold font-heading">
                                  {post?.title}
                                </h3>
                              </a>
                            </Link>
                          )}
                          <div className="mb-2 flex items-center text-sm">
                            {post?.authors &&
                              post?.authors?.map(
                                (author, index, { length }) => (
                                  <div className="flex" key={index}>
                                    <span className="text-webriq-darkblue">
                                      {author?.name}
                                    </span>
                                    {index + 1 !== length ? (
                                      <span>&nbsp;,&nbsp;</span>
                                    ) : null}
                                  </div>
                                )
                              )}
                            {post?.publishedAt && post?.authors && (
                              <span className="text-gray-400 mx-2">•</span>
                            )}
                            {post?.publishedAt && (
                              <span className="text-gray-400">
                                {format(
                                  new Date(post?.publishedAt),
                                  " dd MMM, yyyy"
                                )}
                              </span>
                            )}
                          </div>
                          {post?.excerpt && (
                            <BlockContent
                              blocks={post?.excerpt}
                              serializers={blockStyle}
                            />
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
