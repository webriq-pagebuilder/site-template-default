import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { logoLink } from "helper";

function VariantA({ logo, subtitle, title, images }) {
  return (
    <section>
      <div className="pt-16 bg-webriq-darkblue overflow-hidden radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto text-center">
            {logo?.image && (
              <Link 
                aria-label={
                  logoLink() === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink()}`
                }
                className="mb-8 inline-block p-5 bg-white rounded-lg"
                href={logoLink()}
              >
                <img
                  className="h-14"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "appPromo-logo"}
                />
              </Link>
            )}
            <p className="text-gray-50 mb-3">{subtitle}</p>
            <h1 className="text-3xl lg:text-5xl text-white font-bold mb-8">
              {title}
            </h1>
            <div className="h-72">
              {images?.[0]?.image?.asset?._ref && (
                <Image
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-10 h-80 z-20 object-contain"
                  src={urlFor(images[0]?.image)}
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-1"
                />
              )}
              {images?.[1]?.image?.asset?._ref && (
                <Image
                  className="absolute bottom-0 left-0 -mb-24 h-80 object-contain"
                  src={urlFor(images[1]?.image)}
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-2"
                />
              )}
              {images?.[2]?.image?.asset?._ref && (
                <Image
                  className="absolute bottom-0 right-0 -mb-24 h-80 object-contain"
                  src={urlFor(images[2]?.image)}
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-3"
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