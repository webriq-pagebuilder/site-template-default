import React from "react";

function VariantA({ caption, title, description, plans }) {
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
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-webriq-darkblue font-bold">
              {caption && caption}
            </span>
            <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
              {title && title}
            </h2>
            <p className="mb-6 text-gray-500">{description && description}</p>
            {plans?.[0]?.price && (
              <div className="inline-block py-1 px-1 bg-white rounded-lg">
                <button
                  className={`mr-1 text-sm py-2 px-4 ${
                    plan === "monthly"
                      ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                      : "text-gray-500"
                  } hover:text-gray-900 font-bold focus:outline-none`}
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
          <div className="flex flex-wrap -mx-4">
            {plans?.[0]?.price && (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="p-8 bg-white shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    {plans?.[0]?.planType}
                  </h4>
                  <span className="text-6xl font-bold">
                    {isNaN(parseInt(plans?.[0]?.price))
                      ? plans?.[0]?.price
                      : `$${
                          plan === "yearly"
                            ? plans?.[0]?.price * 12
                            : plans?.[0]?.price
                        }`}
                  </span>
                  {!isNaN(parseInt(plans?.[0]?.price)) && (
                    <span className="text-gray-400 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 text-gray-500 leading-loose">
                    {plans?.[0]?.description}
                  </p>
                  <ul className="mb-6 text-gray-500">
                    {plans?.[0]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-darkblue"
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
                  {plans?.[0]?.primaryButton?.label && (
                    <a
                      className="inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200"
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
                      {plans?.[0]?.primaryButton?.label}
                    </a>
                  )}
                </div>
              </div>
            )}
            {plans?.[1] && (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="p-8 bg-webriq-darkblue shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold text-white">
                    {plans?.[1]?.planType}
                  </h4>
                  <span className="text-6xl font-bold text-white">
                    {isNaN(parseInt(plans?.[1]?.price))
                      ? plans?.[1]?.price
                      : `$${
                          plan === "yearly"
                            ? plans?.[1]?.price * 12
                            : plans?.[1]?.price
                        }`}
                  </span>
                  {!isNaN(parseInt(plans?.[1]?.price)) && (
                    <span className="text-gray-50 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 leading-loose text-gray-50">
                    {plans?.[1]?.description}
                  </p>
                  <ul className="mb-6 text-gray-50">
                    {plans?.[1]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-babyblue"
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
                  {plans?.[1]?.primaryButton?.label && (
                    <a
                      className="inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-white hover:bg-gray-50 font-bold leading-loose transition duration-200"
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
              <div className="w-full lg:w-1/3 px-4">
                <div className="p-8 bg-white shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    {plans?.[2]?.planType}
                  </h4>
                  <span className="text-6xl font-bold">
                    {isNaN(parseInt(plans?.[2]?.price))
                      ? plans?.[2]?.price
                      : `$${
                          plan === "yearly"
                            ? plans?.[2]?.price * 12
                            : plans?.[2]?.price
                        }`}
                  </span>
                  {!isNaN(parseInt(plans?.[2]?.price)) && (
                    <span className="text-gray-400 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 text-gray-500 leading-loose">
                    {plans?.[2]?.description}
                  </p>
                  <ul className="mb-6 text-gray-500">
                    {plans?.[2]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-darkblue"
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
                  <a
                    className="inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200"
                    href="#"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            )}
          </div>
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
    // <section>
    //   <div className="skew skew-top mr-for-radius">
    //     <svg
    //       className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
    //       viewBox="0 0 10 10"
    //       preserveAspectRatio="none"
    //     >
    //       <polygon fill="currentColor" points="0 0 10 10 0 10" />
    //     </svg>
    //   </div>
    //   <div className="skew skew-top ml-for-radius">
    //     <svg
    //       className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
    //       viewBox="0 0 10 10"
    //       preserveAspectRatio="none"
    //     >
    //       <polygon fill="currentColor" points="0 10 10 0 10 10" />
    //     </svg>
    //   </div>
    //   <div className="py-20 bg-gray-50 radius-for-skewed">
    //     <div className="container mx-auto px-4">
    //       <div className="max-w-2xl mx-auto text-center mb-16">
    //         {caption === undefined ? null : (
    //           <span className="text-webriq-darkblue font-bold">{caption}</span>
    //         )}
    //         {title === undefined ? null : (
    //           <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
    //             {title}
    //           </h2>
    //         )}
    //         {description === undefined ? null : (
    //           <p className="mb-6 text-gray-500">{description}</p>
    //         )}
    //         {offers === undefined ? null : (
    //           <div className="inline-block py-1 px-1 bg-white rounded-lg">
    //             <button
    // className={`mr-1 text-sm py-2 px-4 ${
    //   plan === "monthly"
    //     ? "text-gray-900 bg-gray-50 rounded-lg shadow"
    //     : "text-gray-500"
    // } hover:text-gray-900 font-bold focus:outline-none`}
    //               onClick={() => setPlan("monthly")}
    //             >
    //               Monthly
    //             </button>
    //             <button
    // className={`text-sm py-2 px-4 ${
    //   plan === "yearly"
    //     ? "text-gray-900 bg-gray-50 rounded-lg shadow"
    //     : "text-gray-500"
    // } font-bold focus:outline-none`}
    //               onClick={() => setPlan("yearly")}
    //             >
    //               Yearly
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //       {offers?.[0] && (
    //         <div className="flex flex-wrap -mx-4">
    //           <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
    //               <div className="p-8 bg-white shadow rounded">
    //                 <h4 className="mb-2 text-2xl font-bold font-heading">
    //                   {offers?.[0]?.title}
    //                 </h4>
    //                 <span className="text-6xl font-bold">
    //                   {plan === "yearly"
    //                     ? String().concat(
    //                         "$",
    //                         parseInt(String(offers?.[0]?.price).replace("$", "")) *
    //                           12
    //                       ) === "$NaN"
    //                       ? null
    //                       : String().concat(
    //                           "$",
    //                           parseInt(
    //                             String(offers?.[0]?.price).replace("$", "")
    //                           ) * 12
    //                         )
    //                     : `$${offers?.[0]?.price}`}
    //                 </span>
    //                 {offers?.[0]?.price === undefined ? null : (
    //                   <span className="text-gray-500">{`/${plan}`}</span>
    //                 )}
    //                 <p className="mt-3 mb-6 text-gray-500 leading-loose">
    //                   {offers?.[0]?.description}
    //                 </p>
    //                 <ul className="mb-6 text-gray-500">
    //                   {offers?.[0]?.planIncludes?.map(include =>
    //                     <li className="mb-2 flex">
    //                       <svg
    //                         className="mr-2 w-5 h-5 text-webriq-darkblue"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         viewBox="0 0 20 20"
    //                         fill="currentColor"
    //                       >
    //                         <path
    //                           fillRule="evenodd"
    //                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                           clipRule="evenodd"
    //                         />
    //                       </svg>
    //                       <span>{include}</span>
    //                     </li>
    //                     )}
    //                 </ul>
    //                 {offers?.[0]?.primaryButton?.label && (
    //                   <a
    //                     className="inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200"
    //                     href={
    //                       offers?.[0]?.primaryButton.type === "linkInternal" ? (
    //                         offers?.[0]?.primaryButton.internalLink === "Home" ||
    //                         offers?.[0]?.primaryButton.internalLink === "home"
    //                           ? "/"
    //                           : offers?.[0]?.primaryButton.internalLink) : offers?.[0]?.primaryButton.externalLink
    //                     }
    //                   >
    //                     {offers?.[0]?.primaryButton.label}
    //                   </a>
    //                 )}
    //               </div>
    //             </div>
    //           <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
    //             {offers?.[1] && (
    //               <div className="p-8 bg-webriq-darkblue shadow rounded">
    //                 <h4 className="mb-2 text-2xl font-bold text-white">
    //                   {offers?.[1]?.title}
    //                 </h4>
    //                 <span className="text-6xl font-bold  text-white">
    //                   {plan === "yearly"
    //                     ? String().concat(
    //                         "$",
    //                         parseInt(
    //                           String(offers[1].price).replace("$", "")
    //                         ) * 12
    //                       ) === "$NaN"
    //                       ? null
    //                       : String().concat(
    //                           "$",
    //                           parseInt(
    //                             String(offers[1].price).replace("$", "")
    //                           ) * 12
    //                         )
    //                     : offers[1].price}
    //                 </span>
    //                 {offers?.[1]?.price && (
    //                   <span className="text-gray-50 text-xs">{`/${plan}`}</span>
    //                 )}
    //                 <p className="mt-3 mb-6 leading-loose text-gray-50">
    //                   {offers?.[1]?.description}
    //                 </p>
    //                 <ul className="mb-6 text-gray-50">
    //                 {offers?.[1]?.planIncludes?.map(include =>
    //                   <li className="mb-2 flex">
    //                     <svg
    //                       className="mr-2 w-5 h-5 text-webriq-babyblue"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                     <span>{include}</span>
    //                   </li>)}
    //                 </ul>
    //                 {offers?.[1]?.primaryButton?.label && (
    //                   <a
    //                     className="inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-white hover:bg-gray-50 font-bold leading-loose transition duration-200"
    //                     href={
    //                       offers?.[0]?.primaryButton.type === "linkInternal" ? (
    //                         offers?.[0]?.primaryButton.internalLink === "Home" ||
    //                         offers?.[0]?.primaryButton.internalLink === "home"
    //                           ? "/"
    //                           : offers?.[0]?.primaryButton.internalLink) : offers?.[0]?.primaryButton.externalLink
    //                     }
    //                   >
    //                     {offers?.[1]?.primaryButton.label}
    //                   </a>
    //                 )}
    //               </div>
    //             )}
    //           </div>
    //           {offers[2] === undefined ? null : (
    //             <div className="w-full lg:w-1/3 px-4">
    //               <div className="p-8 bg-white shadow rounded">
    //                 <h4 className="mb-2 text-2xl font-bold font-heading">
    //                   {offers[2].title}
    //                 </h4>
    //                 <span className="text-6xl font-bold">
    //                   {plan === "yearly"
    //                     ? String().concat(
    //                         "$",
    //                         parseInt(String(offers[2].price).replace("$", "")) *
    //                           12
    //                       ) === "$NaN"
    //                       ? null
    //                       : String().concat(
    //                           "$",
    //                           parseInt(
    //                             String(offers[2].price).replace("$", "")
    //                           ) * 12
    //                         )
    //                     : offers[2].price}
    //                 </span>
    //                 {offers[2].price === undefined ? null : (
    //                   <span className="text-gray-400 text-xs">{`/${plan}`}</span>
    //                 )}
    //                 <p className="mt-3 mb-6 text-gray-500 leading-loose">
    //                   {offers[2].description}
    //                 </p>
    //                 <ul className="mb-6 text-gray-500">
    //                   <li className="mb-2 flex">
    //                     <svg
    //                       className="mr-2 w-5 h-5 text-webriq-darkblue"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                     <span>Vestibulum viverra</span>
    //                   </li>
    //                   <li className="mb-2 flex">
    //                     <svg
    //                       className="mr-2 w-5 h-5 text-webriq-darkblue"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                     <span>Morbi mollis metus pretium</span>
    //                   </li>
    //                   <li className="mb-2 flex">
    //                     <svg
    //                       className="mr-2 w-5 h-5 text-webriq-darkblue"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                     <span>Etiam lectus nunc, commodo</span>
    //                   </li>
    //                   <li className="mb-2 flex">
    //                     <svg
    //                       className="mr-2 w-5 h-5 text-webriq-darkblue"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                     <span>Ut quam nisl mollis id pretium</span>
    //                   </li>
    //                   <li className="mb-2 flex">
    //                     <svg
    //                       className="mr-2 w-5 h-5 text-webriq-darkblue"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                     <span>Suspendisse bibendum</span>
    //                   </li>
    //                 </ul>
    //                 {offers[2].primaryButton === undefined ||
    //                 offers[2].primaryButton.displayText === undefined ? null : (
    //                   <a
    //                     className="inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200"
    //                     href={
    //                       offers[2].primaryButton.route === "Home" ||
    //                       offers[2].primaryButton.route === "home"
    //                         ? "/"
    //                         : offers[2].primaryButton.route
    //                     }
    //                   >
    //                     {offers[2].primaryButton.displayText}
    //                   </a>
    //                 )}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="skew skew-bottom mr-for-radius">
    //     <svg
    //       className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
    //       viewBox="0 0 10 10"
    //       preserveAspectRatio="none"
    //     >
    //       <polygon fill="currentColor" points="0 0 10 0 0 10" />
    //     </svg>
    //   </div>
    //   <div className="skew skew-bottom ml-for-radius">
    //     <svg
    //       className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
    //       viewBox="0 0 10 10"
    //       preserveAspectRatio="none"
    //     >
    //       <polygon fill="currentColor" points="0 0 10 0 10 10" />
    //     </svg>
    //   </div>
    // </section>
  );
}
export default React.memo(VariantA);
