import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

function VariantD({ images }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center -mx-2">
          {images &&
            images?.map((image, index) => (
              <div className="mb-4 w-full md:w-1/3 lg:w-1/6 px-2" key={index}>
                {image?.image && (
                  <div className="bg-gray-50 mx-auto rounded">
                    <Image
                      src={urlFor(image?.image)}
                      layout="responsive"
                      width="192px"
                      height="192px"
                      objectFit="scale-down"
                      alt={image?.alt ?? `logoCloud-image${index}`}
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
