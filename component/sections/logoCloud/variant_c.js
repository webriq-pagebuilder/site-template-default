import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";

function VariantC({ title, images, button }) {
  return (
    <section className="relative pt-32 pb-12 lg:pb-80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="mb-8 text-4xl lg:text-5xl font-bold font-heading">
            {title}
          </h1>
          {button && button?.type === "linkInternal" ? (
            <Link
              href={
                button?.internalLink === "Home" ||
                button?.internalLink === "home"
                  ? "/"
                  : `/${
                      button?.internalLink === undefined
                        ? "page-not-found"
                        : button?.internalLink
                    }`
              }
            >
              <a
                aria-label={`Logo Cloud ${
                  button?.label ?? "Primary"
                } button which directs to ${
                  button?.internalLink === undefined
                    ? "page-not-found"
                    : button?.internalLink
                }`}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                target={button?.linkTarget}
                rel={
                  button?.linkTarget === "_blank" ? "noopener noreferrer" : ""
                }
              >
                {button?.label}
              </a>
            </Link>
          ) : (
            <a
              aria-label={`Logo Cloud ${
                button?.label ?? "Primary"
              } button which directs to ${
                button?.externalLink === undefined
                  ? "link-not-found"
                  : button?.externalLink
              }`}
              className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
              target={button?.linkTarget}
              href={`${
                button?.externalLink === undefined
                  ? "link-not-found"
                  : button?.externalLink
              }`}
              rel={button?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
            >
              {button?.label}
            </a>
          )}
        </div>
        <div className="hidden lg:block relative">
          {images?.[0] && (
            <div
              className="h-24 w-24 mx-auto absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "-120px", left: "-10px" }}
            >
              <Image
                src={urlFor(images[0])}
                layout="fixed"
                width="96px"
                height="96px"
                objectFit="scale-down"
                alt="logoCloud-image1"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          )}
          {images?.[1] && (
            <div className="h-24 w-24 mx-auto absolute left-0 top-0 mt-20 flex items-center justify-center bg-gray-50 rounded-full">
              <Image
                src={urlFor(images[1])}
                layout="fixed"
                width="80px"
                height="96px"
                objectFit="scale-down"
                alt="logoCloud-image2"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          )}
          {images?.[2] && (
            <div
              className="h-40 w-40 mx-auto absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ bottom: "-250px", left: "20%" }}
            >
              <Image
                src={urlFor(images[2])}
                layout="fixed"
                width="144px"
                height="144px"
                objectFit="scale-down"
                alt="logoCloud-image3"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          )}
          {images?.[3] && (
            <div
              className="h-40 w-40 mx-auto absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "20px", right: "20%" }}
            >
              <Image
                src={urlFor(images[3])}
                layout="fixed"
                width="144px"
                height="144px"
                objectFit="scale-down"
                alt="logoCloud-image4"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          )}
          {images?.[4] && (
            <div
              className="h-32 w-32 mx-auto absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ bottom: "-250px", right: 0 }}
            >
              <Image
                src={urlFor(images[4])}
                layout="fixed"
                width="112px"
                height="112px"
                objectFit="scale-down"
                alt="logoCloud-image5"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          )}
          {images?.[5] && (
            <div
              className="h-24 w-24 mx-auto absolute right-0 flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "-150px" }}
            >
              <Image
                src={urlFor(images[5])}
                layout="fixed"
                width="96px"
                height="96px"
                objectFit="scale-down"
                alt="logoCloud-image6"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          )}
        </div>
        <div className="lg:hidden mt-16 flex flex-wrap justify-center">
          {images?.[6] && (
            <div className="h-24 w-24 mx-4 mb-8 flex items-center justify-center bg-gray-50 rounded-full">
              <img
                className="w-16"
                src={urlFor(images[6])}
                alt="logoCloud-image7"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
