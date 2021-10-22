import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

function VariantH({ caption, title, features, images }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2 px-4">
              <div className="max-w-md">
                <span className="text-webriq-darkblue font-bold">
                  {caption && caption}
                </span>
                <h1 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                  {title && title}
                </h1>
                <ul>
                  {features?.[0] && (
                    <li className="flex mb-4">
                      <div>
                        <svg
                          className="mr-3 w-8 h-8 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="font-bold font-heading">
                          {features?.[0]?.heading}
                        </p>
                        <p className="text-gray-500 leading-loose">
                          {features?.[0]?.description}
                        </p>
                      </div>
                    </li>
                  )}
                  {features?.[1] && (
                    <li className="flex mb-4">
                      <div>
                        <svg
                          className="mr-3 w-8 h-8 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="font-bold font-heading">
                          {features?.[1]?.heading}
                        </p>
                        <p className="text-gray-500 leading-loose">
                          {features?.[1]?.description}
                        </p>
                      </div>
                    </li>
                  )}
                  {features?.[2] && (
                    <li className="flex">
                      <div>
                        <svg
                          className="mr-3 w-8 h-8 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="font-bold font-heading">
                          {features?.[2]?.heading}
                        </p>
                        <p className="text-gray-500 leading-loose">
                          {features?.[2]?.description}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {images && (
              <div className="flex flex-wrap items-center w-full lg:w-1/2 px-4">
                <div className="w-1/2 px-3 rounded-lg">
                  {images?.[0] && (
                    <Image
                      src={urlFor(images?.[0])}
                      layout="responsive"
                      width="245px"
                      height="256px"
                      objectFit="cover"
                      alt="features-variantH-image-1"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                  )}
                  {images?.[1] && (
                    <div className="mt-6">
                      <Image
                        src={urlFor(images?.[1])}
                        layout="responsive"
                        width="245px"
                        height="256px"
                        objectFit="cover"
                        alt="features-variantH-image-2"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                </div>
                <div className="w-1/2 px-3 rounded-lg">
                  {images?.[2] && (
                    <Image
                      src={urlFor(images?.[2])}
                      layout="responsive"
                      width="245px"
                      height="256px"
                      objectFit="cover"
                      alt="features-variantH-image-3"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantH);
