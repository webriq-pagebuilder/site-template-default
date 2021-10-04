import React from "react";
import { urlFor } from "lib/sanity";

function VariantC({ title, images, button }) {
  return (
    <section className="relative pt-32 pb-12 lg:pb-80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="mb-8 text-4xl lg:text-5xl font-bold font-heading">
            {title}
          </h1>
          {button && (
            <a
              aria-label={`Logo Cloud ${
                button?.label ?? "Primary"
              } button which directs to ${
                button?.type === "linkExternal"
                  ? button?.externalLink
                  : button?.type === "linkInternal"
                  ? button?.internalLink
                  : "not found"
              } page`}
              className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
              target={button?.linkTarget}
              rel={button?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
              href={
                button.type === "linkExternal"
                  ? button?.externalLink
                  : button.type === "linkInternal"
                  ? button.internalLink === "Home" ||
                    button.internalLink === "home"
                    ? "/"
                    : button?.internalLink
                  : "page-not-found"
              }
            >
              {button?.label}
            </a>
          )}
        </div>
        <div className="hidden lg:block relative">
          {images?.[0] && (
            <div
              className="h-24 w-24 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "-120px", left: "-10px" }}
            >
              <img
                className="mx-auto w-16 h-24 rounded-full object-scale-down"
                src={urlFor(images[0])}
                alt="logoCloud-image1"
              />
            </div>
          )}
          {images?.[1] && (
            <div className="h-24 w-24 absolute left-0 top-0 mt-20 flex items-center justify-center bg-gray-50 rounded-full">
              <img
                className="mx-auto w-20 h-24 rounded-full object-scale-down"
                src={urlFor(images[1])}
                alt="logoCloud-image2"
              />
            </div>
          )}
          {images?.[2] && (
            <div
              className="h-40 w-40 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ bottom: "-250px", left: "20%" }}
            >
              <img
                className="mx-auto w-36 h-36 rounded-full object-scale-down"
                src={urlFor(images[2])}
                alt="logoCloud-image3"
              />
            </div>
          )}
          {images?.[3] && (
            <div
              className="h-40 w-40 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "20px", right: "20%" }}
            >
              <img
                className="mx-auto w-36 h-36 rounded-full object-scale-down"
                src={urlFor(images[3])}
                alt="logoCloud-image4"
              />
            </div>
          )}
          {images?.[4] && (
            <div
              className="h-32 w-32 absolute flex items-center justify-center bg-gray-50 rounded-full"
              style={{ bottom: "-250px", right: 0 }}
            >
              <img
                className="mx-auto w-28 h-28 rounded-full object-scale-down"
                src={urlFor(images[4])}
                alt="logoCloud-image5"
              />
            </div>
          )}
          {images?.[5] && (
            <div
              className="h-24 w-24 absolute right-0 flex items-center justify-center bg-gray-50 rounded-full"
              style={{ top: "-150px" }}
            >
              <img
                className="mx-auto w-24 h-24 rounded-full object-scale-down"
                src={urlFor(images[5])}
                alt="logoCloud-image6"
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
