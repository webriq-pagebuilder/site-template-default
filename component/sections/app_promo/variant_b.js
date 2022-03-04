import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

function VariantB({ subtitle, title, description, statistics, images }) {
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
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-10">
          <div className="flex flex-wrap mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="mt-8 max-w-xl">
                <p className="text-center md:text-left lg:text-left text-webriq-darkblue font-bold">
                  {subtitle}
                </p>
                <h1 className="mt-3 text-center md:text-left lg:text-left text-xl md:text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h1>
                <p className="mt-3 text-center md:text-left lg:text-left mb-10 text-gray-500 leading-loose">
                  {description}
                </p>
                <div className="flex flex-wrap">
                  {statistics &&
                    statistics.map((items, index) => (
                      <div
                        className="mb-8 w-full lg:w-1/2 text-center md:text-left lg:text-left"
                        key={index}
                      >
                        <p className="mb-3 text-gray-500">{items?.label}</p>
                        <span className="text-xl md:text-3xl lg:text-4xl font-bold">
                          {items?.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
              {images &&
                (images.length > 1 ? (
                  <>
                    <button
                      aria-label="Left Arrow button"
                      className="order-0 md:order-0 lg:order-0 xl:order-1 2xl:order-1 mx-2 md:mr-12 lg:mr-12 xl:mr-12 2xl:mr-12 inline-block p-2 md:p-4 lg:p-4 xl:p-4 2xl:p-4 bg-white rounded-full shadow text-webriq-darkblue hover:text-webriq-babyblue focus:outline-none"
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
                    <div className="order-1 md:order-1 lg:order-1 xl:order-0 2xl:order-0 mr-2 object-contain w-1/2">
                      <div className="mx-auto mb-8 xl:mb-0">
                        <Image
                          src={urlFor(images?.[currentPosition]?.image)}
                          layout="responsive"
                          width="500px"
                          height="850px"
                          objectFit="cover"
                          alt={
                            images?.[currentPosition]?.alt ??
                            `appPromo-variantB-image${currentPosition}`
                          }
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    </div>
                    <button
                      aria-label="Right Arrow button"
                      className="order-2 md:ml-12 lg:ml-12 xl:ml-12 2xl:ml-12 inline-block p-2 md:p-4 lg:p-4 xl:p-4 2xl:p-4 bg-white rounded-full shadow text-webriq-darkblue hover:text-webriq-babyblue focus:outline-none"
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
                  </>
                ) : (
                  <div className="object-contain md:w-2/5 xl:w-2/5">
                    <div className="mx-auto mb-8 xl:mb-0">
                      <Image
                        src={urlFor(images?.[currentPosition]?.image)}
                        layout="responsive"
                        width="500px"
                        height="850px"
                        objectFit="cover"
                        alt={
                          images?.[currentPosition]?.alt ??
                          `appPromo-variantB-image${currentPosition}`
                        }
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
