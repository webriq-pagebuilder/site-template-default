import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

function VariantB({ title, text, images }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="mb-12 lg:mb-0 w-full lg:w-1/2">
            <div className="max-w-md">
              <h1 className="mb-4 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
              <p className="text-gray-500 leading-loose">{text}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-wrap -mx-2">
            {images &&
              images?.map((image, index) => (
                <div
                  className="mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 px-2 lg:mr-10 xl:mr-0"
                  key={index}
                >
                  {image?.image?.asset?._ref && (
                    <div>
                      <div className="flex w-[192px] h-[192px] bg-gray-50 mx-auto rounded items-center justify-center">
                        <Image
                          className="object-scale-down"
                          src={urlFor(image?.image)}
                          width={192}
                          height={192}
                          alt={image?.alt ?? `logoCloud-image${index}`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
