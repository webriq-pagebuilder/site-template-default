import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { LogoCloudProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";

function VariantC({ title, images, button }: LogoCloudProps) {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden lg:pb-80">
      <div className="container px-4 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <h1 className="mb-8 text-4xl font-bold font-heading lg:text-5xl">
            {title}
          </h1>
          {button?.label && (
            <ConditionalLink
              ariaLabel={button?.label}
              link={button}
              className="inline-block px-6 py-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
            >
              {button?.label}
            </ConditionalLink>
          )}
        </div>
        <div className="relative hidden lg:block">
          {images?.[0]?.image && (
            <div
              className="absolute flex items-center justify-center w-24 h-24 overflow-hidden rounded-full bg-gray-50"
              style={{ top: "-120px", left: "-10px" }}
            >
              <Image
                className="object-scale-down w-16 h-16"
                src={urlFor(images[0]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[0]?.alt ?? "logoCloud-image-1"}
              />
            </div>
          )}
          {images?.[1]?.image && (
            <div className="absolute top-0 left-0 flex items-center justify-center w-24 h-24 mt-20 rounded-full bg-gray-50">
              <Image
                className="object-scale-down w-16 h-16"
                src={urlFor(images[1]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[1]?.alt ?? "logoCloud-image-2"}
              />
            </div>
          )}
          {images?.[2]?.image && (
            <div
              className="absolute flex items-center justify-center w-40 h-40 rounded-full bg-gray-50"
              style={{ bottom: "-250px", left: "20%" }}
            >
              <Image
                className="object-scale-down w-32 h-32"
                src={urlFor(images[2]?.image)}
                sizes="100vw"
                width={96}
                height={96}
                alt={images[2]?.alt ?? "logoCloud-image-3"}
              />
            </div>
          )}
          {images?.[3]?.image && (
            <div
              className="absolute flex items-center justify-center w-40 h-40 rounded-full bg-gray-50"
              style={{ top: "20px", right: "20%" }}
            >
              <Image
                className="object-scale-down w-32 h-32"
                src={urlFor(images[3]?.image)}
                sizes="100vw"
                width={96}
                height={96}
                style={{ objectFit: "scale-down" }}
                alt={images[3]?.alt ?? "logoCloud-image-4"}
              />
            </div>
          )}
          {images?.[4]?.image && (
            <div
              className="absolute flex items-center justify-center w-32 h-32 rounded-full bg-gray-50"
              style={{ bottom: "-250px", right: 0 }}
            >
              <Image
                className="object-scale-down w-24 h-24"
                src={urlFor(images[4]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[4]?.alt ?? "logoCloud-image-5"}
              />
            </div>
          )}
          {images?.[5]?.image && (
            <div
              className="absolute right-0 flex items-center justify-center w-24 h-24 rounded-full bg-gray-50"
              style={{ top: "-150px" }}
            >
              <Image
                className="object-scale-down w-16 h-16"
                src={urlFor(images[5]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[5]?.alt ?? "logoCloud-image-6"}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center mt-16 lg:hidden">
          {images?.map((images, index) => (
            <div
              className="flex items-center justify-center w-24 h-24 mx-4 mb-8 rounded-full bg-gray-50"
              key={index}
            >
              <Image
                className="object-scale-down w-16 h-16"
                src={urlFor(images?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images?.alt ?? `logoCloud-image-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
