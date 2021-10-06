import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

function VariantA({ logo, subtitle, title, images }) {
  return (
    <section>
      <div className="pt-16 bg-webriq-darkblue overflow-hidden radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto text-center">
            {logo && (
              <a className="mb-8 inline-block p-5 bg-white rounded-lg" href="/">
                <Image
                  src={urlFor(logo?.image).url()}
                  layout="fixed"
                  width="38px"
                  height="48px"
                  objectFit="contain"
                  alt={logo?.alt ?? "appPromo-logo"}
                />
              </a>
            )}
            <p className="text-gray-50 mb-3">{subtitle}</p>
            <h1 className="text-3xl lg:text-5xl text-white font-bold mb-8">
              {title}
            </h1>
            <div className="h-72">
              {images?.[0] && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-10 h-80 z-20">
                  <Image
                    src={urlFor(images[0]).url()}
                    layout="fixed"
                    width="218px"
                    height="320px"
                    objectFit="contain"
                    alt="appPromo-variantA-image-1"
                  />
                </div>
              )}
              {images?.[1] && (
                <div className="absolute bottom-0 left-0 -mb-24 h-80">
                  <Image
                    src={urlFor(images[1]).url()}
                    layout="fixed"
                    width="218px"
                    height="320px"
                    objectFit="contain"
                    alt="appPromo-variantA-image-2"
                  />
                </div>
              )}
              {images?.[2] && (
                <div className="absolute bottom-0 right-0 -mb-24 h-80">
                  <Image
                    src={urlFor(images[2]).url()}
                    layout="fixed"
                    width="218px"
                    height="320px"
                    objectFit="contain"
                    alt="appPromo-variantA-image-3"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
