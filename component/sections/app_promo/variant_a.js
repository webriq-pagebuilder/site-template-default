import React from "react";
import { urlFor } from "lib/sanity";


function VariantA({ logo, subtitle, title, images }) {
  return (
    <section>
      <div className="pt-16 bg-webriq-darkblue overflow-hidden radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto text-center">
            {logo && (
              <a
                className="mb-8 inline-block px-5 py-5 bg-white rounded-lg"
                href="#"
              >
                <img
                  className="h-12"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "appPromo-variantA-logo"}
                />
              </a>
            )}
            <p className="text-gray-50 font-bold">{subtitle}</p>
            <h2 className="text-5xl lg:text-4xl text-white font-bold">
              {title}
            </h2>
            <div className="h-80">
              {images?.[0] && (
                <img
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-10 h-80 z-20"
                  src={urlFor(images[0])}
                  alt="image-1"
                />
              )}
              {images?.[1] && (
                <img
                  className="absolute bottom-0 left-0 -mb-24 h-80"
                  src={urlFor(images[1])}
                  alt="image-2"
                />
              )}
              {images?.[2] && (
                <img
                  className="absolute bottom-0 right-0 -mb-24 h-80"
                  src={urlFor(images[2])}
                  alt="image-3"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);