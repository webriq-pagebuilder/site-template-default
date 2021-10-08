import { urlFor } from "lib/sanity";
import Image from "next/image";
import React from "react";

function VariantA({ logo, title, text, button }) {
  return (
    <section className="skewed-top-left skewed-bottom-right">
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <a
                className="mb-6 inline-block text-3xl font-bold leading-none"
                href="/"
              >
                <Image
                  src={urlFor(logo?.image)}
                  layout="fixed"
                  width="132px"
                  height="48px"
                  objectFit="contain"
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </a>
            )}
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="max-w-md mx-auto mb-6 text-gray-700 leading-loose">
              {text}
            </p>
            {button && (
              <a
                aria-label={`Call to action ${
                  button?.label ?? "primary"
                } button which directs to ${
                  button?.type === "linkExternal"
                    ? button?.externalLink
                    : button?.type === "linkInternal"
                    ? button?.internalLink
                    : "not found"
                } page`}
                className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                target={button?.linkTarget}
                rel={
                  button?.linkTarget === "_blank" ? "noopener noreferrer" : null
                }
                href={
                  button?.type === "linkExternal"
                    ? button?.externalLink
                    : button?.type === "linkInternal"
                    ? button?.internalLink === "Home" ||
                      button?.internalLink === "home"
                      ? "/"
                      : button?.internalLink
                    : "page-not-found"
                }
              >
                {button?.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
