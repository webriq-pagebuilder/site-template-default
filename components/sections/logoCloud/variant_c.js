import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalBtnOrLink } from "helper";


function VariantC({ title, images, button }) {
  return (
    <section className="relative pt-20 pb-12 lg:pb-80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="mb-8 text-4xl lg:text-5xl font-bold font-heading">
            {title}
          </h1>
          {button?.label && (
            <ConditionalBtnOrLink value={button} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"/>
          )}
        </div>
        <div className="hidden lg:block relative">
          {images?.[0]?.image && (
            <div
              className="h-24 w-24 absolute flex items-center justify-center bg-gray-50 rounded-full overflow-hidden"
              style={{ top: "-120px", left: "-10px" }}
            >
              <div className="h-16 w-16">
                <Image
                  src={urlFor(images[0]?.image)}
                  sizes="100vw"
                  width="64px"
                  height="64px"
                  style={{ objectFit: "scale-down" }}
                  alt={images[0]?.alt ?? "logoCloud-image-1"}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          )}
          {images?.[1]?.image && (
            <div className="h-24 w-24 absolute left-0 top-0 mt-20 flex items-center justify-center bg-gray-50 rounded-full">
              <div className="h-16 w-16">
                <Image
                  src={urlFor(images[1]?.image)}
                  sizes="100vw"
                  width="64px"
                  height="64px"
                  style={{ objectFit: "scale-down" }}
                  alt={images[1]?.alt ?? "logoCloud-image-2"}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          )}
          {images?.[2]?.image && (
            <div
              className="h-40 w-40 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ bottom: "-250px", left: "20%" }}
            >
              <div className="h-32 w-32">
                <Image
                  src={urlFor(images[2]?.image)}
                  sizes="100vw"
                  width="96px"
                  height="96px"
                  style={{ objectFit: "scale-down" }}
                  alt={images[2]?.alt ?? "logoCloud-image-3"}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          )}
          {images?.[3]?.image && (
            <div
              className="h-40 w-40 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "20px", right: "20%" }}
            >
              <div className="h-32 w-32">
                <Image
                  src={urlFor(images[3]?.image)}
                  sizes="100vw"
                  width="96px"
                  height="96px"
                  style={{ objectFit: "scale-down" }}
                  alt={images[3]?.alt ?? "logoCloud-image-4"}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          )}
          {images?.[4]?.image && (
            <div
              className="h-32 w-32 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ bottom: "-250px", right: 0 }}
            >
              <div className="h-24 w-24">
                <Image
                  src={urlFor(images[4]?.image)}
                  sizes="100vw"
                  width="64px"
                  height="64px"
                  style={{ objectFit: "scale-down" }}
                  alt={images[4]?.alt ?? "logoCloud-image-5"}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          )}
          {images?.[5]?.image && (
            <div
              className="h-24 w-24 absolute right-0 flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "-150px" }}
            >
              <div className="h-16 w-16">
                <Image
                  src={urlFor(images[5]?.image)}
                  sizes="100vw"
                  width="64px"
                  height="64px"
                  style={{ objectFit: "scale-down" }}
                  alt={images[5]?.alt ?? "logoCloud-image-6"}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          )}
        </div>
        <div className="lg:hidden mt-16 flex flex-wrap justify-center">
          {images?.map((images, index) => (
            <div className="h-24 w-24 mx-4 mb-8 flex items-center justify-center bg-gray-50 rounded-full" key={index}>
              <div className="h-16 w-16">
                <Image
                  src={urlFor(images?.image)}
                  sizes="100vw"
                  width="64px"
                  height="64px"
                  style={{ objectFit: "scale-down" }}
                  alt={images?.alt ?? `logoCloud-image-${index}`}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
