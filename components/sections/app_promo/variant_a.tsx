import { Container, Flex } from "components/layout/index";
import { Heading, SwiperButton, Text } from "components/ui";
import { extractLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AppPromoProps } from ".";
import { logoLink } from "helper";

function VariantA({ logo, subtitle, title, images }: AppPromoProps) {
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
    <section className="pt-16 overflow-hidden bg-primary">
      <Container className="relative text-center" maxWidth={448}>
        {logo?.image && (
          <Link
            aria-label={`Go to ${
              logoLink(logo) === "/" ? "home page" : logoLink(logo)
            }`}
            className="inline-block p-5 mb-8 bg-white rounded-lg"
            href={logoLink(logo)}
            target={logo?.linkTarget}
            rel={logo?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
          >
            <Image
              src={urlFor(logo?.image)}
              width={50}
              height={56}
              alt={logo?.alt ?? "appPromo-logo"}
            />
          </Link>
        )}
        {subtitle && <Text className="mb-3 text-gray-50">{subtitle}</Text>}
        {title && <Heading className="mb-8 text-white">{title}</Heading>}
        <div className="hidden h-72 sm:block">
          {images?.[0]?.image && (
            <Image
              className="absolute bottom-0 z-20 object-contain -mb-10 transform -translate-x-1/2 left-1/2 h-80 rounded-t-2xl"
              src={urlFor(images[0]?.image)}
              sizes="218px"
              width={218}
              height={320}
              alt="appPromo-variantA-image-1"
            />
          )}
          {images?.[1]?.image && (
            <Image
              className="absolute bottom-0 left-0 object-contain -mb-24 h-80 rounded-t-2xl"
              src={urlFor(images[1]?.image)}
              sizes="218px"
              width={218}
              height={320}
              alt="appPromo-variantA-image-2"
            />
          )}
          {images?.[2]?.image && (
            <Image
              className="absolute bottom-0 right-0 object-contain -mb-24 h-80 rounded-t-2xl"
              src={urlFor(images[2]?.image)}
              sizes="218px"
              width={218}
              height={320}
              alt="appPromo-variantA-image-3"
            />
          )}
        </div>
        {/* mobile image view less than 640px */}
        <div className="object-contain w-1/2 mx-auto sm:hidden">
          {images?.[currentPosition]?.image && (
            <Image
              className="object-contain w-full h-full"
              src={urlFor(images?.[currentPosition]?.image)}
              sizes="(min-width: 520px) 224px, 45vw"
              width={500}
              height={850}
              alt={
                images?.[currentPosition]?.alt ??
                `appPromo-variantB-image${currentPosition}`
              }
            />
          )}
        </div>
        <Flex justify="between" className="mb-16 sm:hidden">
          <SwiperButton
            type="left"
            ariaLabel="Left Arrow button"
            className="order-0 md:order-0 lg:order-0 xl:order-1 2xl:order-1"
            onClick={arrowLeftClick}
          />

          <SwiperButton
            type="right"
            ariaLabel="Left Arrow button"
            className="order-2"
            onClick={arrowRightClick}
          />
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
