import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { AppPromoProps } from ".";
import { Text } from "components/ui/Text";
import { SwiperButton } from "components/ui/SwiperButton";

function VariantB({
  subtitle,
  title,
  description,
  statistics,
  images,
}: AppPromoProps) {
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
      <div className="py-20 bg-gray-50">
        <div className="container px-10 mx-auto">
          <div className="lg:mx-4 lg:flex lg:flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <div className="max-w-xl mt-8">
                <Text className="font-bold text-center text-brand-primary md:text-left lg:text-left">
                  {subtitle}
                </Text>
                <Text
                  type="h1"
                  className="mt-3 text-xl text-center md:text-4xl lg:text-5xl md:text-left"
                >
                  {title}
                </Text>
                <Text className="mt-3 mb-10 leading-loose text-center text-gray-500 break-words md:text-left lg:text-left">
                  {description}
                </Text>
                <div className="sm:flex sm:flex-wrap">
                  {statistics &&
                    statistics.map((items, index) => (
                      <div
                        className="w-full mb-8 text-center md:text-left lg:w-1/2 lg:text-left"
                        key={index}
                      >
                        <p className="mb-3 text-gray-500">{items?.label}</p>
                        <span className="text-xl font-bold md:text-3xl lg:text-4xl">
                          {items?.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full sm:flex-wrap lg:w-1/2 xl:w-1/2 2xl:w-1/2">
              {images &&
                (images.length > 1 ? (
                  <>
                    <SwiperButton
                      type="left"
                      ariaLabel="Left Arrow button"
                      className="hidden mx-2 order-0 md:order-0 lg:order-0 sm:inline-block md:mr-12 md:p-4 lg:mr-12 lg:p-4 xl:order-1 xl:mr-12 xl:p-4 2xl:order-1 2xl:mr-12 2xl:p-4"
                      onClick={arrowLeftClick}
                    />

                    <div className="order-1 object-contain w-1/2 mr-2 xl:order-0 2xl:order-0 md:order-1 lg:order-1">
                      {images?.[currentPosition]?.image && (
                        <Image
                          className="object-cover w-full mx-auto mb-8 xl:mb-0"
                          src={urlFor(images?.[currentPosition]?.image)}
                          sizes="100vw"
                          width={500}
                          height={850}
                          alt={
                            images?.[currentPosition]?.alt ??
                            `appPromo-variantB-image${currentPosition}`
                          }
                        />
                      )}
                    </div>
                    <SwiperButton
                      type="right"
                      ariaLabel="Right Arrow button"
                      className="order-2 hidden sm:inline-block md:ml-12 md:p-4 lg:ml-12 lg:p-4 xl:ml-12 xl:p-4 2xl:ml-12 2xl:p-4"
                      onClick={arrowRightClick}
                    />
                  </>
                ) : (
                  <div className="object-contain md:w-2/5 xl:w-2/5">
                    {images?.[currentPosition]?.image && (
                      <Image
                        className="object-cover mx-auto mb-8 xl:mb-0"
                        src={urlFor(images?.[currentPosition]?.image)}
                        sizes="100vw"
                        width={500}
                        height={850}
                        alt={
                          images?.[currentPosition]?.alt ??
                          `appPromo-variantB-image${currentPosition}`
                        }
                      />
                    )}
                  </div>
                ))}
            </div>
            <div className="flex justify-between sm:hidden">
              <SwiperButton
                type="left"
                ariaLabel="Left Arrow button"
                className="order-0 md:order-0 lg:order-0xl:order-1 2xl:order-1"
                onClick={arrowLeftClick}
              />
              <SwiperButton
                type="right"
                ariaLabel="Right Arrow button"
                className="order-2 "
                onClick={arrowRightClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
