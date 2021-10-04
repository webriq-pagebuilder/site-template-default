import React from "react";
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
                <div className="mb-4 w-full lg:w-1/3 px-2" key={index}>
                  <div className="bg-gray-50 rounded">
                    <img
                      className="mx-auto h-48 w-48 object-scale-down"
                      src={urlFor(image)}
                      alt={`logoCloud-image${index}`}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
