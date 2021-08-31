import React from "react";
import { urlFor } from "lib/sanity";

function VariantD({ caption, title, portfolios, buttonLabel }) {
  const [activeTab, setActiveTab] = React.useState(portfolios?.[0]?.category); //set the first index category as initial value

  //creates new array of items filtered by active tab
  const filteredData = portfolios?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section>
      <div className="p-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
            {portfolios && (
              <div className="inline-flex flex-wrap py-1 sm:px-1 sm:space-x-1 bg-white rounded text-sm">
                {portfolios?.map((content, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(content?.category)}
                    className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
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
          {filteredData && (
            <div className="flex -mx-4 mb-12">
              <div className="flex flex-wrap w-full lg:w-1/2 mb-8 lg:mb-0">
                {filteredData?.[0]?.content
                  ?.slice(0, 2)
                  ?.map((content, index) => (
                    <div className="w-full lg:w-1/2 px-4 mb-8" key={index}>
                      {content?.mainImage && (
                        <div className="relative">
                          <img
                            className="h-64 w-full rounded-lg object-cover"
                            src={urlFor(content?.mainImage)}
                            alt=""
                          />
                          <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                            <div className="max-w-md my-auto text-xs">
                              <span className="text-webriq-blue font-bold">
                                {content?.subtitle ??
                                  "Dolor sit amet consectutar"}
                              </span>
                              <h2 className="text-white font-bold my-5">
                                {content?.heading ??
                                  "Build & Launch without problems"}
                              </h2>
                              <div className="max-w-xs my-5">
                                <p className="mb-6 text-gray-400">
                                  {content?.description ??
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis."}
                                </p>
                                <a
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                  target={content?.primaryButton?.linkTarget}
                                  rel={
                                    content?.primaryButton?.linkTarget ===
                                    "_blank"
                                      ? "noopener noreferrer"
                                      : null
                                  }
                                  href={
                                    content?.primaryButton?.type ===
                                    "linkExternal"
                                      ? content?.primaryButton?.externalLink
                                      : content?.primaryButton?.type ===
                                        "linkInternal"
                                      ? content?.primaryButton?.internalLink ===
                                          "Home" ||
                                        content?.primaryButton?.internalLink ===
                                          "home"
                                        ? "/"
                                        : content?.primaryButton?.internalLink
                                      : "page-not-found"
                                  }
                                >
                                  {content?.primaryButton?.label}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                {filteredData?.[0]?.content
                  ?.slice(2, 3)
                  ?.map((content, index) => (
                    <div className="w-full px-4" key={index}>
                      {content?.mainImage && (
                        <div className="relative">
                          <img
                            className="h-96 w-full rounded-lg object-cover"
                            src={urlFor(content?.mainImage)}
                            alt=""
                          />
                          <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                            <div className="max-w-md my-auto text-sm">
                              <span className="text-webriq-blue font-bold">
                                {content?.subtitle ??
                                  "Dolor sit amet consectutar"}
                              </span>
                              <h2 className="text-4xl text-white font-bold my-5">
                                {content?.heading ??
                                  "Build & Launch without problems"}
                              </h2>
                              <div className="max-w-xs my-5">
                                <p className="mb-6 text-gray-400">
                                  {content?.description ??
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis."}
                                </p>
                                <a
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                  target={content?.primaryButton?.linkTarget}
                                  rel={
                                    content?.primaryButton?.linkTarget ===
                                    "_blank"
                                      ? "noopener noreferrer"
                                      : null
                                  }
                                  href={
                                    content?.primaryButton?.type ===
                                    "linkExternal"
                                      ? content?.primaryButton?.externalLink
                                      : content?.primaryButton?.type ===
                                        "linkInternal"
                                      ? content?.primaryButton?.internalLink ===
                                          "Home" ||
                                        content?.primaryButton?.internalLink ===
                                          "home"
                                        ? "/"
                                        : content?.primaryButton?.internalLink
                                      : "page-not-found"
                                  }
                                >
                                  {content?.primaryButton?.label}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="w-full lg:w-1/2">
                {filteredData?.[0]?.content
                  ?.slice(3, 4)
                  ?.map((content, index) => (
                    <div className="w-full px-4 mb-8" key={index}>
                      {content?.mainImage && (
                        <div className="relative">
                          <img
                            className="h-96 w-full rounded-lg object-cover"
                            src={urlFor(content?.mainImage)}
                            alt=""
                          />
                          <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                            <div className="max-w-md my-auto text-sm">
                              <span className="text-webriq-blue font-bold">
                                {content?.subtitle ??
                                  "Dolor sit amet consectutar"}
                              </span>
                              <h2 className="text-4xl text-white font-bold my-5">
                                {content?.heading ??
                                  "Build & Launch without problems"}
                              </h2>
                              <div className="max-w-xs my-5">
                                <p className="mb-6 text-gray-400">
                                  {content?.description ??
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis."}
                                </p>
                                <a
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                  target={content?.primaryButton?.linkTarget}
                                  rel={
                                    content?.primaryButton?.linkTarget ===
                                    "_blank"
                                      ? "noopener noreferrer"
                                      : null
                                  }
                                  href={
                                    content?.primaryButton?.type ===
                                    "linkExternal"
                                      ? content?.primaryButton?.externalLink
                                      : content?.primaryButton?.type ===
                                        "linkInternal"
                                      ? content?.primaryButton?.internalLink ===
                                          "Home" ||
                                        content?.primaryButton?.internalLink ===
                                          "home"
                                        ? "/"
                                        : content?.primaryButton?.internalLink
                                      : "page-not-found"
                                  }
                                >
                                  {content?.primaryButton?.label}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                <div className="flex flex-wrap">
                  {filteredData?.[0]?.content
                    ?.slice(4, 5)
                    ?.map((content, index) => (
                      <div
                        className="relative w-full lg:w-1/2 px-4 mb-8 lg:mb-0"
                        key={index}
                      >
                        {content?.mainImage && (
                          <div className="relative">
                            <img
                              className="h-64 w-full rounded-lg object-cover"
                              src={urlFor(content?.mainImage)}
                              alt=""
                            />
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                              <div className="max-w-md my-auto text-xs">
                                <span className="text-webriq-blue font-bold">
                                  {content?.subtitle ??
                                    "Dolor sit amet consectutar"}
                                </span>
                                <h2 className="text-white font-bold my-5">
                                  {content?.heading ??
                                    "Build & Launch without problems"}
                                </h2>
                                <div className="max-w-xs my-5">
                                  <p className="mb-6 text-gray-400">
                                    {content?.description ??
                                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis."}
                                  </p>
                                  <a
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                    href={
                                      content?.primaryButton?.type ===
                                      "linkExternal"
                                        ? content?.primaryButton?.externalLink
                                        : content?.primaryButton?.type ===
                                          "linkInternal"
                                        ? content?.primaryButton
                                            ?.internalLink === "Home" ||
                                          content?.primaryButton
                                            ?.internalLink === "home"
                                          ? "/"
                                          : content?.primaryButton?.internalLink
                                        : "page-not-found"
                                    }
                                  >
                                    {content?.primaryButton?.label}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  {filteredData?.[0]?.content
                    ?.slice(5, 6)
                    ?.map((content, index) => (
                      <div
                        className="relative w-full lg:w-1/2 px-4"
                        key={index}
                      >
                        {content?.mainImage && (
                          <div className="relative">
                            <img
                              className="h-64 w-full rounded-lg object-cover"
                              src={urlFor(content?.mainImage)}
                              alt=""
                            />
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                              <div className="max-w-md my-auto text-xs">
                                <span className="text-webriq-blue font-bold">
                                  {content?.subtitle ??
                                    "Dolor sit amet consectutar"}
                                </span>
                                <h2 className="text-white font-bold my-5">
                                  {content?.heading ??
                                    "Build & Launch without problems"}
                                </h2>
                                <div className="max-w-xs my-5">
                                  <p className="mb-6 text-gray-400">
                                    {content?.description ??
                                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis."}
                                  </p>
                                  <a
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                    href={
                                      content?.primaryButton?.type ===
                                      "linkExternal"
                                        ? content?.primaryButton?.externalLink
                                        : content?.primaryButton?.type ===
                                          "linkInternal"
                                        ? content?.primaryButton
                                            ?.internalLink === "Home" ||
                                          content?.primaryButton
                                            ?.internalLink === "home"
                                          ? "/"
                                          : content?.primaryButton?.internalLink
                                        : "page-not-found"
                                    }
                                  >
                                    {content?.primaryButton?.label}
                                  </a>
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
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
