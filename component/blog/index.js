import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { urlFor, PortableText } from "lib/sanity";
import { sanityConfig } from "lib/config";
import { blogQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { format } from "date-fns";

const Navigation = dynamic(() => import("component/sections/navigation"));
const Footer = dynamic(() => import("component/sections/footer"));
const PreviewMode = lazy(() => import("next-sanity/preview"));

// block styling as props to `components` of the PortableText component
const blockStyle = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-6 text-7xl leading-loose text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-6 text-5xl leading-loose text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className="mb-6 text-3xl leading-loose text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className="mb-6 text-xl leading-loose text-gray-900">{children}</h4>
      );
    },
    normal: ({ children }) => {
      return (
        <p className="mb-6 leading-loose text-justify text-gray-900">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 px-14 leading-loose italic text-gray-500">
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    <pre data-language={value.language}>
      <code>{value.code}</code>
    </pre>;
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul className="mb-6 pl-10 leading-loose text-gray-900 list-disc">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="mb-6 leading-loose text-gray-900 list-decimal">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        className="hover:text-webriq-darkorange text-webriq-lightorange"
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

function BlogPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const blogData = data || data?.[0];
  const slug = blogData?.slug?.current;

  if (!router.isFallback && !slug) {
    return <PageNotFound data={preview} />;
  }

  if (!blogData) {
    return null;
  }

  const { authors, categories, body, mainImage, publishedAt, title, seo } =
    blogData;

  return (
    <>
      {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={blogQuery}
            onChange={setData}
            token={token}
            params={{ slug }}
          />
        </Suspense>
      )}
      <Head>
        <title>{seo?.seoTitle || title}</title>
      </Head>
      {blogData?.navigation?.map((nav) => (
        <Navigation
          key={nav?._key}
          data={nav}
          template={{
            bg: "gray",
            color: "webriq",
          }}
        />
      ))}
      <section className="pb-20">
        <div
          className="p-20 mb-12"
          style={{
            backgroundImage: `url(${mainImage && urlFor(mainImage)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              {categories &&
                categories?.map((tag, index) => (
                  <span
                    className="uppercase text-base lg:text-xl text-webriq-blue"
                    key={index}
                  >
                    {tag?.title}
                  </span>
                ))}
              {categories && publishedAt && (
                <span className="uppercase text-base lg:text-xl text-gray-500 mx-2">
                  •
                </span>
              )}
              {publishedAt && (
                <span
                  className={`text-base lg:text-xl text-white ${
                    categories ?? "ml-2"
                  }`}
                >
                  {format(new Date(publishedAt), "MMMM dd, yyyy")}
                </span>
              )}
              <div className="mt-2">
                {title && (
                  <h2 className="mb-6 text-4xl lg:text-5xl text-white font-bold">
                    {title}
                  </h2>
                )}
                <div className="flex justify-center">
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
                          <h3 className="text-webriq-blue font-bold">
                            {author?.name}
                          </h3>
                          {index + 1 !== length ? (
                            <span>&nbsp;and&nbsp;</span>
                          ) : null}
                          <span className="text-xs text-webriq-lightblue italic">
                            {authors?.length > 1 ? "Authors" : "Author"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          {body && (
            <div className="max-w-4xl mx-auto">
              <PortableText value={body} components={blockStyle} />
            </div>
          )}
        </div>
      </section>
      {blogData?.footer?.map((footer) => (
        <Footer
          key={footer?._key}
          data={footer}
          template={{
            bg: "gray",
            color: "webriq",
          }}
        />
      ))}
    </>
  );
}

export default BlogPage;
