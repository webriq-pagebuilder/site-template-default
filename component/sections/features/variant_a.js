import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

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
            {features &&
              features?.map((feature) => {
                return (
                  <div className="mb-12 mt-16 lg:mb-0 w-full md:w-1/2 lg:w-1/4 px-4">
                    {feature?.mainImage?.image && (
                      <span className="mb-4 md:mb-6 inline-block bg-webriq-lightblue p-3 text-webriq-blue rounded">
                        {/* <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg> */}
                        {feature?.mainImage?.image?.asset && (
                          <Image
                            src={urlFor(feature?.mainImage?.image)}
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
                    )}

                    {feature?.title && (
                      <p className="mb-4 text-2xl font-bold font-heading">
                        {/* Lorem ipsum dolor sit amet consectutar */}
                        {feature?.title}
                      </p>
                    )}
                    {feature?.plainText && (
                      <p className="text-gray-500 leading-loose">
                        {/* Fusce quam tellus, placerat eu metus ut, viverra aliquet purus.
                Suspendisse potenti. Nulla non nibh feugiat. */}
                        {feature?.plainText}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
