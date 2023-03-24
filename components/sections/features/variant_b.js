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
                    {caption}
                  </span>
                )}
                {title && (
                  <h1 className="my-2 text-4xl lg:text-5xl font-bold font-heading">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mb-6 text-gray-500 leading-loose">
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
              {features &&
                features?.map((feature, index) =>
                  index % 2 === 0 ? (
                    <div
                      className="mb-8 lg:mb-0 w-full md:w-1/2 px-4"
                      key={index}
                    >
                      <div className="mb-8 py-6 pl-6 pr-4 shadow rounded bg-white">
                        <span className="mb-4 inline-block p-3 rounded-lg bg-webriq-lightblue">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ??
                                `features-image-${index}`
                              }
                            />
                          )}
                        </span>
                        <p className="mb-2 text-2xl font-bold font-heading">
                          {feature?.title}
                        </p>
                        <p className="text-gray-500 leading-loose">
                          {feature?.plainText}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full md:w-1/2 lg:mt-12 px-4" key={index}>
                      <div className="mb-8 lg:mb-0 py-6 pl-6 pr-4 shadow rounded-lg bg-white">
                        <span className="mb-4 inline-block p-3 rounded bg-webriq-lightblue">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ??
                                `features-image-${index}`
                              }
                            />
                          )}
                        </span>
                        <p className="mb-2 text-2xl font-bold font-heading">
                          {feature?.title}
                        </p>
                        <p className="text-gray-500 leading-loose">
                          {feature?.plainText}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
