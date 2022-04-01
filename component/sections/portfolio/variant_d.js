import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";

function VariantD({ caption, title, portfoliosWithCategory }) {
  let portfoliosPerPage = 6,
    count = 0; // default number of portfolios per category
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); // set the first index category as initial value

  // group portfolios per category
  const portfoliosPerCategory = portfoliosWithCategory?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h1 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap py-1 bg-white rounded text-sm">
                {portfoliosWithCategory?.map((content, index) => (
                  <button
                    aria-label={`Portfolios ${content?.category} tab`}
                    key={index}
                    onClick={() => setActiveTab(content?.category)}
                    className={`w-auto mb-1 mx-auto py-2 px-4 ${
                      activeTab === content?.category
                        ? "bg-gray-50 text-webriq-darkblue shadow rounded font-bold focus:outline-none transition duration-200"
                        : "hover:bg-webriq-lightblue text-gray-500 hover:text-webriq-blue rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="lg:flex xl:flex -mx-4 mb-12">
            <div className="flex flex-wrap w-full lg:w-1/2 mb-8 lg:mb-0">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count, count + 2)
                ?.map((content) => (
                  <div
                    className="w-full lg:w-1/2 px-4 mb-8"
                    key={content?._key}
                  >
                    {content?.mainImage?.image?.asset?._ref && (
                      <div className="relative rounded overflow-hidden">
                        <Image
                          src={urlFor(content?.mainImage?.image)}
                          layout="responsive"
                          width="352px"
                          height="280px"
                          objectFit="cover"
                          alt={`portfolio-image-${content?._key}`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                        <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg overflow-y-auto">
                          <div className="max-w-md my-auto text-xs">
                            <span className="text-webriq-blue font-bold">
                              {content?.subtitle}
                            </span>
                            <h1 className="text-white font-bold my-5">
                              {content?.title}
                            </h1>
                            <div className="max-w-xs my-5">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label &&
                              content?.primaryButton?.type ===
                                "linkInternal" ? (
                                <Link
                                  href={
                                    content?.primaryButton?.internalLink ===
                                      "Home" ||
                                    content?.primaryButton?.internalLink ===
                                      "home"
                                      ? "/"
                                      : `/${
                                          content?.primaryButton
                                            ?.internalLink === undefined
                                            ? "page-not-found"
                                            : content?.primaryButton
                                                ?.internalLink
                                        }`
                                  }
                                >
                                  <a
                                    aria-label={`Portfolio ${
                                      content?.primaryButton?.label ??
                                      "View Project"
                                    } button which directs to ${
                                      content?.primaryButton?.internalLink ===
                                      undefined
                                        ? "page-not-found"
                                        : content?.primaryButton?.internalLink
                                    }`}
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                </Link>
                              ) : (
                                <a
                                  aria-label={`Portfolio ${
                                    content?.primaryButton?.label ??
                                    "View Project"
                                  } button which directs to ${
                                    content?.primaryButton?.externalLink ===
                                    undefined
                                      ? "page-not-found"
                                      : content?.primaryButton?.externalLink
                                  }`}
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                  target={content?.primaryButton?.linkTarget}
                                  href={`${
                                    content?.primaryButton?.externalLink ===
                                    undefined
                                      ? "link-not-found"
                                      : content?.primaryButton?.externalLink
                                  }`}
                                  rel={
                                    content?.primaryButton?.linkTarget ===
                                    "_blank"
                                      ? "noopener noreferrer"
                                      : null
                                  }
                                >
                                  {content?.primaryButton?.label ?? "See More"}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 2, count + 3)
                ?.map((content) => (
                  <div
                    className="w-full px-4 mb-8 lg:w-full lg:px-4 xl:w-full xl:px-4"
                    key={content?._key}
                  >
                    {content?.mainImage?.image?.asset?._ref && (
                      <div className="relative rounded overflow-hidden">
                        <Image
                          src={urlFor(content?.mainImage?.image)}
                          layout="responsive"
                          width="352px"
                          height="256px"
                          objectFit="cover"
                          alt={`portfolio-image-${content?._key}`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                        <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg overflow-y-auto">
                          <div className="lg:mt-10 xl:mt-10 2xl:mt-10 max-w-md my-auto text-xs lg:text-sm xl:text-sm 2xl:text-sm">
                            <span className="text-webriq-blue font-bold">
                              {content?.subtitle}
                            </span>
                            <h1 className="lg:text-4xl xl:text-4xl 2xl:text-4xl text-white font-bold my-5">
                              {content?.title}
                            </h1>
                            <div className="max-w-sm my-5">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label &&
                              content?.primaryButton?.type ===
                                "linkInternal" ? (
                                <Link
                                  href={
                                    content?.primaryButton?.internalLink ===
                                      "Home" ||
                                    content?.primaryButton?.internalLink ===
                                      "home"
                                      ? "/"
                                      : `/${
                                          content?.primaryButton
                                            ?.internalLink === undefined
                                            ? "page-not-found"
                                            : content?.primaryButton
                                                ?.internalLink
                                        }`
                                  }
                                >
                                  <a
                                    aria-label={`Portfolio ${
                                      content?.primaryButton?.label ??
                                      "View Project"
                                    } button which directs to ${
                                      content?.primaryButton?.internalLink ===
                                      undefined
                                        ? "page-not-found"
                                        : content?.primaryButton?.internalLink
                                    }`}
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                </Link>
                              ) : (
                                <a
                                  aria-label={`Portfolio ${
                                    content?.primaryButton?.label ??
                                    "View Project"
                                  } button which directs to ${
                                    content?.primaryButton?.externalLink ===
                                    undefined
                                      ? "page-not-found"
                                      : content?.primaryButton?.externalLink
                                  }`}
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                  target={content?.primaryButton?.linkTarget}
                                  href={`${
                                    content?.primaryButton?.externalLink ===
                                    undefined
                                      ? "link-not-found"
                                      : content?.primaryButton?.externalLink
                                  }`}
                                  rel={
                                    content?.primaryButton?.linkTarget ===
                                    "_blank"
                                      ? "noopener noreferrer"
                                      : null
                                  }
                                >
                                  {content?.primaryButton?.label ?? "See More"}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="w-full lg:w-1/2">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 3, count + 4)
                ?.map((content) => (
                  <div
                    className="w-full px-4 mb-8 lg:w-full lg:px-4 xl:w-full xl:px-4"
                    key={content?._key}
                  >
                    {content?.mainImage?.image?.asset?._ref && (
                      <div className="relative rounded overflow-hidden">
                        <Image
                          src={urlFor(content?.mainImage?.image)}
                          layout="responsive"
                          width="352px"
                          height="256px"
                          objectFit="cover"
                          alt={`portfolio-image-${content?._key}`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                        <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg overflow-y-auto">
                          <div className="lg:mt-10 xl:mt-10 2xl:mt-10 max-w-md my-auto text-xs lg:text-sm xl:text-sm 2xl:text-sm">
                            <span className="text-webriq-blue font-bold">
                              {content?.subtitle}
                            </span>
                            <h1 className="lg:text-4xl xl:text-4xl 2xl:text-4xl text-white font-bold my-5">
                              {content?.title}
                            </h1>
                            <div className="max-w-xs my-5">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label &&
                              content?.primaryButton?.type ===
                                "linkInternal" ? (
                                <Link
                                  href={
                                    content?.primaryButton?.internalLink ===
                                      "Home" ||
                                    content?.primaryButton?.internalLink ===
                                      "home"
                                      ? "/"
                                      : `/${
                                          content?.primaryButton
                                            ?.internalLink === undefined
                                            ? "page-not-found"
                                            : content?.primaryButton
                                                ?.internalLink
                                        }`
                                  }
                                >
                                  <a
                                    aria-label={`Portfolio ${
                                      content?.primaryButton?.label ??
                                      "View Project"
                                    } button which directs to ${
                                      content?.primaryButton?.internalLink ===
                                      undefined
                                        ? "page-not-found"
                                        : content?.primaryButton?.internalLink
                                    }`}
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                </Link>
                              ) : (
                                <a
                                  aria-label={`Portfolio ${
                                    content?.primaryButton?.label ??
                                    "View Project"
                                  } button which directs to ${
                                    content?.primaryButton?.externalLink ===
                                    undefined
                                      ? "page-not-found"
                                      : content?.primaryButton?.externalLink
                                  }`}
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                  target={content?.primaryButton?.linkTarget}
                                  href={`${
                                    content?.primaryButton?.externalLink ===
                                    undefined
                                      ? "link-not-found"
                                      : content?.primaryButton?.externalLink
                                  }`}
                                  rel={
                                    content?.primaryButton?.linkTarget ===
                                    "_blank"
                                      ? "noopener noreferrer"
                                      : null
                                  }
                                >
                                  {content?.primaryButton?.label ?? "See More"}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              <div className="flex flex-wrap">
                {portfoliosPerCategory?.[0]?.content
                  ?.slice(count + 4, portfoliosPerPage)
                  ?.map((content) => (
                    <div
                      className="relative w-full lg:w-1/2 px-4 mb-8 lg:mb-0"
                      key={content?._key}
                    >
                      {content?.mainImage?.image?.asset?._ref && (
                        <div className="relative rounded overflow-hidden">
                          <Image
                            src={urlFor(content?.mainImage?.image)}
                            layout="responsive"
                            width="352px"
                            height="280px"
                            objectFit="cover"
                            alt={`portfolio-image${content?._key}`}
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                            placeholder="blur"
                          />
                          <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg overflow-y-auto">
                            <div className="max-w-md my-auto text-xs">
                              <span className="text-webriq-blue font-bold">
                                {content?.subtitle}
                              </span>
                              <h1 className="text-white font-bold my-5">
                                {content?.title}
                              </h1>
                              <div className="max-w-xs my-5">
                                <p className="mb-6 text-gray-500">
                                  {content?.description}
                                </p>
                                {content?.primaryButton?.label &&
                                content?.primaryButton?.type ===
                                  "linkInternal" ? (
                                  <Link
                                    href={
                                      content?.primaryButton?.internalLink ===
                                        "Home" ||
                                      content?.primaryButton?.internalLink ===
                                        "home"
                                        ? "/"
                                        : `/${
                                            content?.primaryButton
                                              ?.internalLink === undefined
                                              ? "page-not-found"
                                              : content?.primaryButton
                                                  ?.internalLink
                                          }`
                                    }
                                  >
                                    <a
                                      aria-label={`Portfolio ${
                                        content?.primaryButton?.label ??
                                        "View Project"
                                      } button which directs to ${
                                        content?.primaryButton?.internalLink ===
                                        undefined
                                          ? "page-not-found"
                                          : content?.primaryButton?.internalLink
                                      }`}
                                      className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                      target={
                                        content?.primaryButton?.linkTarget
                                      }
                                      rel={
                                        content?.primaryButton?.linkTarget ===
                                        "_blank"
                                          ? "noopener noreferrer"
                                          : null
                                      }
                                    >
                                      {content?.primaryButton?.label ??
                                        "See More"}
                                    </a>
                                  </Link>
                                ) : (
                                  <a
                                    aria-label={`Portfolio ${
                                      content?.primaryButton?.label ??
                                      "View Project"
                                    } button which directs to ${
                                      content?.primaryButton?.externalLink ===
                                      undefined
                                        ? "page-not-found"
                                        : content?.primaryButton?.externalLink
                                    }`}
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    href={`${
                                      content?.primaryButton?.externalLink ===
                                      undefined
                                        ? "link-not-found"
                                        : content?.primaryButton?.externalLink
                                    }`}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {portfoliosPerCategory?.[0]?.primaryButton?.label && (
            <div className="text-center">
              {portfoliosPerCategory?.[0]?.primaryButton?.type ===
              "linkInternal" ? (
                <Link
                  href={
                    portfoliosPerCategory?.[0]?.primaryButton?.internalLink ===
                      "Home" ||
                    portfoliosPerCategory?.[0]?.primaryButton?.internalLink ===
                      "home"
                      ? "/"
                      : `/${
                          portfoliosPerCategory?.[0]?.primaryButton
                            ?.internalLink === undefined
                            ? "page-not-found"
                            : portfoliosPerCategory?.[0]?.primaryButton
                                ?.internalLink
                        }`
                  }
                >
                  <a
                    aria-label={`Click here to ${
                      portfoliosPerCategory?.[0]?.primaryButton?.label ??
                      "View More Projects"
                    }`}
                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                    target={
                      portfoliosPerCategory?.[0]?.primaryButton?.linkTarget
                    }
                    rel={
                      portfoliosPerCategory?.[0]?.primaryButton?.linkTarget ===
                      "_blank"
                        ? "noopener noreferrer"
                        : null
                    }
                  >
                    {portfoliosPerCategory?.[0]?.primaryButton?.label}
                  </a>
                </Link>
              ) : (
                <a
                  aria-label={`Click here to ${
                    portfoliosPerCategory?.[0]?.primaryButton?.label ??
                    "View More Projects"
                  }`}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                  target={portfoliosPerCategory?.[0]?.primaryButton?.linkTarget}
                  href={`${
                    portfoliosPerCategory?.[0]?.primaryButton?.externalLink ===
                    undefined
                      ? "link-not-found"
                      : portfoliosPerCategory?.[0]?.primaryButton?.externalLink
                  }`}
                  rel={
                    portfoliosPerCategory?.[0]?.primaryButton?.linkTarget ===
                    "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {portfoliosPerCategory?.[0]?.primaryButton?.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
