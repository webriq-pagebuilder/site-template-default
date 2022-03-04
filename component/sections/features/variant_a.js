import React from "react";

function VariantA({ caption, title, features }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-md mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">
                {/* Dolor sit amet consectutar */}
                {caption}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold">
                {/* Build &amp; Launch without problems */}
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap -mx-4">
            {features?.[0] && (
              <div className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/4 px-4">
                <span className="mb-4 md:mb-6 inline-block bg-webriq-lightblue p-3 text-webriq-blue rounded">
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </span>
                <p className="mb-4 text-2xl font-bold font-heading">
                  {/* Lorem ipsum dolor sit amet consectutar */}
                  {features?.[0]?.title}
                </p>
                <p className="text-gray-500 leading-loose">
                  {/* Fusce quam tellus, placerat eu metus ut, viverra aliquet purus.
                  Suspendisse potenti. Nulla non nibh feugiat. */}
                  {features?.[0]?.description}
                </p>
              </div>
            )}
            {features?.[1] && (
              <div className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/4 px-4">
                <span className="mb-4 md:mb-6 inline-block bg-webriq-lightblue p-3 text-webriq-blue rounded">
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="mb-4 text-2xl font-bold font-heading">
                  {/* Ut congue nec leo eget aliquam */}
                  {features?.[1]?.title}
                </p>
                <p className="text-gray-500 leading-loose">
                  {/* Ut tempus tellus ac nisi vestibulum tempus. Nunc tincidunt
                    lectus libero, ac ultricies augue elementum at. */}
                  {features?.[1]?.description}
                </p>
              </div>
            )}
            {features?.[2] && (
              <div className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/4 px-4">
                <span className="mb-4 md:mb-6 inline-block bg-webriq-lightblue p-3 text-webriq-blue rounded">
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p className="mb-4 text-2xl font-bold font-heading">
                  {/* Proin fringilla eleifend justo pellentesque */}
                  {features?.[2]?.title}
                </p>

                <p className="text-gray-500 leading-loose">
                  {/* Donec ut ligula nunc. Mauris blandit vel est et facilisis.
                    Integer sapien felis, aliquet at posuere et, porttitor quis
                    ligula. */}
                  {features?.[2]?.description}
                </p>
              </div>
            )}
            {features?.[3] && (
              <div className="w-full md:w-1/2 lg:w-1/4 px-4">
                <span className="mb-4 md:mb-6 inline-block bg-webriq-lightblue p-3 text-webriq-blue rounded">
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </span>
                <p className="mb-4 text-2xl font-bold font-heading">
                  {/* Morbi sagittis ligula sit amet elit maximus */}
                  {features?.[3]?.title}
                </p>
                <p className="text-gray-500 leading-loose">
                  {/* Duis ut facilisis orci. Morbi lacinia nunc a augue eleifend, sed
                    placerat ex faucibus. Duis ante arcu, pretium ac luctus
                    vulputate. */}
                  {features?.[3]?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
