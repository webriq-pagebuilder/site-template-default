import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
function VariantG({ caption, title, description, images, tags }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2 px-4">
              <div className="max-w-md">
                {caption && (
                  <span className="text-webriq-darkblue font-bold">
                    {caption}
                  </span>
                )}
                {title && (
                  <h1 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mb-6 max-w-sm text-gray-500 leading-loose">
                    {description}
                  </p>
                )}
                <ul className="text-gray-500 font-bold">
                  {tags &&
                    tags.map((item) => (
                      <li className="mb-2 flex items-center" key={item}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-blue"
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
            {images && (
              <div className="w-full lg:w-1/2">
                <div className="mb-4 flex flex-wrap items-end">
                  {images?.[0] && (
                    <div className="w-2/3 h-full px-3 rounded">
                      <Image
                        src={urlFor(images?.[0])}
                        layout="responsive"
                        width="356px"
                        height="192px"
                        objectFit="cover"
                        alt="features-variantG-image-1"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                  {images?.[1] && (
                    <div className="w-1/3 h-full px-3 rounded">
                      <Image
                        src={urlFor(images?.[1])}
                        layout="responsive"
                        width="166px"
                        height="128px"
                        objectFit="cover"
                        alt="features-variantG-image-2"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4 flex flex-wrap items-start">
                  {images?.[2] && (
                    <div className="w-1/3 h-full px-3 rounded">
                      <Image
                        src={urlFor(images?.[2])}
                        layout="responsive"
                        width="166px"
                        height="128px"
                        objectFit="cover"
                        alt="features-variantG-image-3"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                  {images?.[3] && (
                    <div className="w-2/3 h-full px-3 rounded">
                      <Image
                        src={urlFor(images?.[3])}
                        layout="responsive"
                        width="356px"
                        height="192px"
                        objectFit="cover"
                        alt="features-variantG-image-4"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
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
export default React.memo(VariantG);
