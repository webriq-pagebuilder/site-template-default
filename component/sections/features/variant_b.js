import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

function VariantB({ caption, title, description, features, tags }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <div className="max-w-md lg:mx-auto">
                {caption && (
                  <span className="text-webriq-darkblue font-bold">
                    {/* Dolor sit amet consectutar */}
                    {caption}
                  </span>
                )}
                {title && (
                  <h1 className="my-2 text-4xl lg:text-5xl font-bold font-heading">
                    {/* Build &amp; Launch without problems */}
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mb-6 text-gray-500 leading-loose">
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque efficitur nisl sodales egestas lobortis. */}
                    {description}
                  </p>
                )}
                <ul className="text-gray-500 font-bold">
                  {tags &&
                    tags.map((item) => (
                      <li className="flex mb-4" key={item}>
                        <svg
                          className="mr-2 w-6 h-6 text-webriq-babyblue"
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
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-wrap -mx-4">
              <div className="mb-8 lg:mb-0 w-full md:w-1/2 px-4">
                {features?.[0] && (
                  <div className="mb-8 py-6 pl-6 pr-4 shadow rounded bg-white">
                    <span className="mb-4 inline-block p-3 rounded-lg bg-webriq-lightblue">
                      {features?.[0]?.mainImage?.image?.asset?._ref && (
                        <Image
                          src={urlFor(features?.[0]?.mainImage?.image)}
                          layout="intrinsic"
                          width="40"
                          height="40"
                          objectFit="scale-down"
                          // alt={mainImage?.alt ?? "header-main-image"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      )}
                    </span>
                    <p className="mb-2 text-2xl font-bold font-heading">
                      {features?.[0]?.title}
                    </p>
                    <p className="text-gray-500 leading-loose">
                      {features?.[0]?.plainText}
                    </p>
                  </div>
                )}
                {features === undefined || features[1] === undefined ? null : (
                  <div className="py-6 pl-6 pr-4 shadow rounded bg-white">
                    <span className="mb-4 inline-block p-3 rounded-lg bg-webriq-lightblue">
                      {/* <svg
                        className="w-10 h-10 text-webriq-darkblue"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg> */}
                      {features?.[1]?.mainImage?.image?.asset?._ref && (
                        <Image
                          src={urlFor(features?.[1]?.mainImage?.image)}
                          layout="intrinsic"
                          width="40"
                          height="40"
                          objectFit="scale-down"
                          // alt={mainImage?.alt ?? "header-main-image"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      )}
                    </span>
                    <p className="mb-2 text-2xl font-bold font-heading">
                      {features?.[1]?.title}
                    </p>
                    <p className="text-gray-500 leading-loose">
                      {features?.[1]?.plainText}
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 lg:mt-20 px-4">
                {features?.[2] && (
                  <div className="mb-8 py-6 pl-6 pr-4 shadow rounded-lg bg-white">
                    <span className="mb-4 inline-block p-3 rounded bg-webriq-lightblue">
                      {features?.[2]?.mainImage?.image?.asset?._ref && (
                        <Image
                          src={urlFor(features?.[2]?.mainImage?.image)}
                          layout="intrinsic"
                          width="40"
                          height="40"
                          objectFit="scale-down"
                          // alt={mainImage?.alt ?? "header-main-image"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      )}
                    </span>
                    <p className="mb-2 text-2xl font-bold font-heading">
                      {features?.[2]?.title}
                    </p>
                    <p className="text-gray-500 leading-loose">
                      {features?.[2]?.plainText}
                    </p>
                  </div>
                )}
                {features?.[3] && (
                  <div className="py-6 pl-6 pr-4 shadow rounded-lg bg-white">
                    <span className="mb-4 inline-block p-3 rounded bg-webriq-lightblue">
                      {features?.[3]?.mainImage?.image?.asset?._ref && (
                        <Image
                          src={urlFor(features?.[3]?.mainImage?.image)}
                          layout="intrinsic"
                          width="40"
                          height="40"
                          objectFit="scale-down"
                          // alt={mainImage?.alt ?? "header-main-image"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      )}
                    </span>
                    <p className="mb-2 text-2xl font-bold font-heading">
                      {features?.[3]?.title}
                    </p>
                    <p className="text-gray-500 leading-loose">
                      {features?.[3]?.plainText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
