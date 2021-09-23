import React from "react";
import Head from "next/head";
import { urlFor, usePreviewSubscription } from "lib/sanity";
import { blogQuery } from "pages/api/query";
import { format } from "date-fns";
import BlockContent from "@sanity/block-content-to-react";
import PageNotFound from "pages/404";
//import dynamic from "next/dynamic";

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
            <p className="mb-6 leading-loose text-justify text-gray-900">
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

//const Navigation = dynamic(() => import("component/sections/navigation"));
//const Footer = dynamic(() => import("component/sections/footer"));

function BlogPage({ data, preview, navAndFooter }) {
  const slug = data?.blogData?.slug;
  const { data: blogData } = usePreviewSubscription(blogQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  const post = data?.blogData || blogData;

  if (Object.entries(data).length === 0) {
    return <PageNotFound statusCode={404} />;
  }

  const { authors, categories, body, mainImage, publishedAt, title } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <Navigation
        data={navAndFooter[0]}
        template={{
          bg: "gray",
          color: "webriq",
        }}
      /> */}
      <section>
        <div className="py-20 bg-gray-50 radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl mx-auto text-center">
              {categories &&
                categories?.map((tag, index) => (
                  <span
                    className="uppercase text-base lg:text-xl text-webriq-blue"
                    key={index}
                  >
                    {tag?.title}
                  </span>
                ))}
              {categories && post?.publishedAt && (
                <span className="uppercase text-base lg:text-xl text-gray-400 mx-2">
                  •
                </span>
              )}
              {publishedAt && (
                <span
                  className={`text-base lg:text-xl text-gray-400 ${
                    categories ?? "ml-2"
                  }`}
                >
                  {format(new Date(publishedAt), "MMMM dd, yyyy")}
                </span>
              )}
              <div className="mt-2">
                {title && (
                  <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                    {title}
                  </h2>
                )}
                {authors &&
                  authors?.map((author, index, { length }) => (
                    <div className="flex justify-center" key={index}>
                      <div className="mr-4">
                        {author?.image ? (
                          <img
                            className="w-12 h-12 object-cover object-top rounded-full"
                            src={urlFor(author?.image)}
                            alt=""
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                          </svg>
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="text-webriq-darkblue font-bold">
                          {author?.name}
                        </h3>
                        {index + 1 !== length ? (
                          <span>&nbsp;and&nbsp;</span>
                        ) : null}
                        <span className="text-xs text-gray-900 italic">
                          {authors?.length > 1 ? "Authors" : "Author"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-10">
              {mainImage && (
                <img
                  className="w-full h-80 object-fill rounded-lg"
                  src={urlFor(mainImage)}
                  alt=""
                />
              )}
            </div>
            {body && (
              <div className="max-w-4xl mx-auto">
                <BlockContent blocks={body} serializers={blockStyle} />
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <Footer
        data={navAndFooter[navAndFooter.length - 1].variants}
        template={{
          bg: "gray",
          color: "webriq",
        }}
      /> */}
    </>
  );
}

export default BlogPage;
