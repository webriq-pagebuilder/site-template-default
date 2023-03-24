import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { logoLink } from "helper";

function VariantA({ logo, subtitle, title, images }) {
  //for image carousel
  let [currentPosition, setCurrentPosition] = React.useState(0); // Initial image index value

  const arrowRightClick = () => {
    currentPosition !== images.length - 1 // Check index length
      ? setCurrentPosition(currentPosition + 1)
      : setCurrentPosition((currentPosition = 0));
  };
  const arrowLeftClick = () => {
    currentPosition !== 0 // Check index length
      ? setCurrentPosition(currentPosition - 1)
      : setCurrentPosition((currentPosition = images.length - 1));
  };

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
            <div className="hidden sm:block h-72">
              {images?.[0]?.image?.asset?._ref && (
                <Image
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-10 h-80 z-20 object-contain rounded-t-2xl"
                  src={urlFor(images[0]?.image)}
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-1"
                />
              )}
              {images?.[1]?.image?.asset?._ref && (
                <Image
                  className="absolute bottom-0 left-0 -mb-24 h-80 object-contain rounded-t-2xl"
                  src={urlFor(images[1]?.image)}
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-2"
                />
              )}
              {images?.[2]?.image?.asset?._ref && (
                <Image
                  className="absolute bottom-0 right-0 -mb-24 h-80 object-contain rounded-t-2xl"
                  src={urlFor(images[2]?.image)}
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-3"
                />
              )}
            </div>
            {/* mobile image view less than 640px */}
            <div className="sm:hidden mx-auto object-contain w-1/2">
              {images?.[currentPosition]?.image && (
                <Image
                  className="w-full h-full object-contain"
                  src={urlFor(images?.[currentPosition]?.image)}
                  sizes="100vw"
                  width={500}
                  height={850}
                  alt={
                    images?.[currentPosition]?.alt ??
                    `appPromo-variantB-image${currentPosition}`
                  }
                  priority
                />
              )}
            </div>
            <div className="sm:hidden flex justify-between mb-16">
              <button
                aria-label="Left Arrow button"
                className="inline-block order-0 md:order-0 lg:order-0 xl:order-1 2xl:order-1 p-2 bg-white rounded-full shadow text-webriq-darkblue hover:text-webriq-babyblue focus:outline-none"
                onClick={arrowLeftClick}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <button
                aria-label="Right Arrow button"
                className="inline-block order-2 p-2 bg-white rounded-full shadow text-webriq-darkblue hover:text-webriq-babyblue focus:outline-none"
                onClick={arrowRightClick}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
