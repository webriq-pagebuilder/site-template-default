import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

function VariantD({ caption, title, features }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-md mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap -mx-4 justify-center">
            {features?.[0] && (
              <div className="mb-8 lg:mb-0 w-full lg:w-1/3 px-4">
                <div className="py-12 px-6 bg-white rounded shadow text-center">
                  <span className="mb-6 inline-block p-2 rounded-lg bg-webriq-lightblue">
                    {features?.[0]?.mainImage?.image?.asset && (
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
                  <p className="px-8 mb-4 text-2xl font-bold font-heading">
                    {features?.[0]?.title}
                  </p>
                  <p className="text-gray-500">{features?.[0]?.plainText}</p>
                </div>
              </div>
            )}
            {features?.[1] && (
              <div className="mb-8 lg:mb-0 w-full lg:w-1/3 px-4">
                <div className="py-12 px-6 bg-white rounded shadow text-center">
                  <span className="mb-6 inline-block p-2 rounded-lg bg-webriq-lightblue">
                    {features?.[1]?.mainImage?.image?.asset && (
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
                  <p className="px-8 mb-4 text-2xl font-bold font-heading">
                    {features?.[1]?.title}
                  </p>
                  <p className="text-gray-500">{features?.[1]?.plainText}</p>
                </div>
              </div>
            )}
            {features?.[2] && (
              <div className="w-full lg:w-1/3 px-4">
                <div className="py-12 px-6 bg-white rounded shadow text-center">
                  <span className="mb-6 inline-block p-2 rounded bg-webriq-lightblue">
                    {features?.[2]?.mainImage?.image?.asset && (
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
                  <p className="px-8 mb-4 text-2xl font-bold font-heading">
                    {features?.[2]?.title}
                  </p>
                  <p className="text-gray-500">{features?.[2]?.plainText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
