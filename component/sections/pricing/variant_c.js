import React from "react";

function VariantC({ caption, title, description, plans }) {
  const [plan, setPlan] = React.useState("monthly");
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
          <div className="mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
            {description && <p className="mb-6 text-gray-500">{description}</p>}
            {plans && (
              <div className="inline-block py-1 px-1 bg-white rounded-lg">
                <button
                  className={`mr-1 text-sm py-2 px-4 ${
                    plan === "monthly"
                      ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                      : "text-gray-500"
                  } font-bold focus:outline-none`}
                  onClick={() => setPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`text-sm py-2 px-4 ${
                    plan === "yearly"
                      ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                      : "text-gray-500"
                  } font-bold focus:outline-none`}
                  onClick={() => setPlan("yearly")}
                >
                  Yearly
                </button>
              </div>
            )}
          </div>
          {plans && (
            <div className="flex flex-wrap max-w-4xl mx-auto">
              {plans?.[0] && (
                <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                  <div className="py-8 px-10 max-w-md mx-auto bg-white shadow rounded text-center">
                    <div className="mb-12">
                      <h3 className="mb-4 text-2xl font-bold font-heading">
                        {plans?.[0]?.planType}
                      </h3>
                      <p className="mb-6 text-gray-500">
                        {plans?.[0]?.description}
                      </p>
                    </div>
                    <div>
                      {plans?.[0]?.price && (
                        <span className="text-5xl lg:text-6xl font-bold">
                          {isNaN(parseInt(plans?.[0]?.price))
                            ? plans?.[0]?.price
                            : `$${
                                plan === "yearly"
                                  ? plans?.[0]?.price * 12
                                  : plans?.[0]?.price
                              }`}
                        </span>
                      )}
                      {!isNaN(parseInt(plans?.[0]?.price)) && (
                        <span className="text-gray-500">{`/${plan}`}</span>
                      )}
                      {plans?.[0]?.primaryButton?.label && (
                        <a
                          className="block mt-6 w-full py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200"
                          target={
                            plans?.[0]?.primaryButton?.linkTarget ===
                            "openLinkToNewTab"
                              ? "_blank"
                              : null
                          }
                          rel={
                            plans?.[0]?.primaryButton?.linkTarget ===
                            "openLinkToNewTab"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={
                            plans?.[0]?.primaryButton?.type === "linkInternal"
                              ? plans?.[0]?.primaryButton?.internalLink ===
                                  "Home" ||
                                plans?.[0]?.primaryButton?.internalLink ===
                                  "home"
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
                </div>
              )}
              {plans?.[1] && (
                <div className="w-full lg:w-1/2 px-4">
                  <div className="py-8 px-10 max-w-md mx-auto bg-white shadow rounded text-center">
                    <div className="mb-12">
                      <h3 className="mb-4 text-2xl font-bold font-heading">
                        {plans?.[1].planType}
                      </h3>
                      <p className="mb-6 text-gray-500">
                        {plans?.[1].description}
                      </p>
                    </div>
                    <div>
                      {plans?.[1]?.price && (
                        <span className="text-5xl lg:text-6xl font-bold">
                          {isNaN(parseInt(plans?.[1]?.price))
                            ? plans?.[1]?.price
                            : `$${
                                plan === "yearly"
                                  ? plans?.[1]?.price * 12
                                  : plans?.[1]?.price
                              }`}
                        </span>
                      )}
                      {!isNaN(parseInt(plans?.[1]?.price)) && (
                        <span className="text-gray-500">{`/${plan}`}</span>
                      )}
                      {plans?.[1]?.primaryButton?.label && (
                        <a
                          className="block mt-6 w-full py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200"
                          target={
                            plans?.[1]?.primaryButton?.linkTarget ===
                            "openLinkToNewTab"
                              ? "_blank"
                              : null
                          }
                          rel={
                            plans?.[1]?.primaryButton?.linkTarget ===
                            "openLinkToNewTab"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={
                            plans?.[1]?.primaryButton?.type === "linkInternal"
                              ? plans?.[1]?.primaryButton?.internalLink ===
                                  "Home" ||
                                plans?.[1]?.primaryButton?.internalLink ===
                                  "home"
                                ? "/"
                                : plans?.[1]?.primaryButton?.internalLink
                              : plans?.[1]?.primaryButton?.externalLink
                          }
                        >
                          {plans?.[1].primaryButton?.label}
                        </a>
                      )}
                    </div>
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
  );
}
export default React.memo(VariantC);
