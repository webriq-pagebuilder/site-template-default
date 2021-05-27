import React from "react"

function VariantB({ caption, title, description, plans }) {
  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 w-full flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              {caption === undefined ? null : (
                <span className="text-green-600 font-bold">{caption}</span>
              )}
              {title === undefined ? null : (
                <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              {description === undefined ? null : (
                <p className="max-w-xs lg:mx-auto text-gray-500 leading-loose">
                  {description}
                </p>
              )}
            </div>
          </div>
          {plans === undefined ? null : (
            <div className="flex flex-wrap">
              {plans?.[0] && (
                <div className="mb-8 w-full p-8 flex flex-wrap items-center bg-white rounded shadow">
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-2xl font-bold font-heading">
                      {plans?.[0]?.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {plans?.[0]?.planIncludes?.map(include => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 w-5 h-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(plans?.[0]?.price))
                        ? plans?.[0]?.price
                        : `$${plans?.[0]?.price}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    {plans?.[0]?.primaryButton?.label && (
                      <a
                        className="inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-white font-bold leading-loose transition duration-200"
                        href={
                          plans?.[0]?.primaryButton?.type === "linkInternal"
                            ? plans?.[0]?.primaryButton?.internalLink ===
                                "Home" ||
                              plans?.[0]?.primaryButton?.internalLink === "home"
                              ? "/"
                              : plans?.[0]?.primaryButton?.internalLink
                            : plans?.[0]?.primaryButton?.externalLink
                        }
                      >
                        {plans?.[0]?.primaryButton.label}
                      </a>
                    )}
                  </div>
                </div>
              )}
              {plans?.[1] && (
                <div className="mb-8 w-full p-8 flex flex-wrap items-center bg-white rounded shadow">
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-2xl font-bold font-heading">
                      {plans?.[1]?.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {plans?.[1].planIncludes?.map(include => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 w-5 h-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(plans?.[1]?.price))
                        ? plans?.[1]?.price
                        : `$${plans?.[1]?.price}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    {plans?.[1]?.primaryButton === undefined ||
                    plans?.[1]?.primaryButton.label === undefined ? null : (
                      <a
                        className="inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-white font-bold leading-loose transition duration-200"
                        href={
                          plans?.[1]?.primaryButton?.type === "linkInternal"
                            ? plans?.[1]?.primaryButton?.internalLink ===
                                "Home" ||
                              plans?.[1]?.primaryButton?.internalLink === "home"
                              ? "/"
                              : plans?.[1]?.primaryButton?.internalLink
                            : plans?.[1]?.primaryButton?.externalLink
                        }
                      >
                        {plans?.[1]?.primaryButton?.label}
                      </a>
                    )}
                  </div>
                </div>
              )}
              {plans?.[2] && (
                <div className="w-full p-8 flex flex-wrap items-center bg-white rounded shadow">
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-2xl font-bold font-heading">
                      {plans?.[2]?.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {plans?.[2]?.planIncludes?.map(include => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 w-5 h-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(plans?.[2]?.price))
                        ? plans?.[2]?.price
                        : `$${plans?.[2]?.price}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    {plans?.[2]?.primaryButton === undefined ||
                    plans?.[2]?.primaryButton.label === undefined ? null : (
                      <a
                        className="inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-white font-bold leading-loose transition duration-200"
                        href={
                          plans?.[2]?.primaryButton?.type === "linkInternal"
                            ? plans?.[2]?.primaryButton?.internalLink ===
                                "Home" ||
                              plans?.[2]?.primaryButton?.internalLink === "home"
                              ? "/"
                              : plans?.[2]?.primaryButton?.internalLink
                            : plans?.[2]?.primaryButton?.externalLink
                        }
                      >
                        {plans?.[2]?.primaryButton?.label}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="skew skew-bottom mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section>
  )
}
export default React.memo(VariantB)
