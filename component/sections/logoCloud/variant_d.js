import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantD({ images }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center -mx-2">
          {images &&
            images?.map((image, index) => (
              <div className="mb-4 w-full md:w-1/3 lg:w-1/6 px-2" key={index}>
                <div className="bg-gray-50 rounded">
                  <img
                    className="mx-auto h-48 w-48 object-scale-down"
                    src={urlFor(image)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
