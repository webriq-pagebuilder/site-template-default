import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { AppPromoProps } from ".";
import { Text } from "components/ui/Text";
import { SwiperButton } from "components/ui/SwiperButton";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";

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
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap>
          <div className="w-full mt-8 lg:w-1/2">
            <Text
              weight="bold"
              color="primary"
              className="text-center md:text-left"
            >
              {subtitle}
            </Text>
            <Heading className="mt-3 text-center md:text-left">{title}</Heading>
            <Text
              className="mt-3 mb-10 leading-loose text-center break-words md:text-left"
              muted
            >
              {description}
            </Text>
            <Flex wrap>
              {statistics &&
                statistics.map((items, index) => (
                  <div
                    className="w-full mb-8 text-center md:text-left lg:w-1/2"
                    key={index}
                  >
                    <Text muted className="mb-3 ">
                      {items?.label}
                    </Text>
                    <span className="text-xl font-bold md:text-3xl lg:text-4xl">
                      {items?.value}
                    </span>
                  </div>
                ))}
            </Flex>
          </div>
          <Flex
            align="center"
            justify="center"
            gap={8}
            className="w-full 2xl:w-1/2"
          >
            {images &&
              (images.length > 1 ? (
                <>
                  <SwiperButton
                    type="left"
                    ariaLabel="Left Arrow button"
                    onClick={arrowLeftClick}
                  />

                  <div className="object-contain w-1/2 mr-2">
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
          </Flex>
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
