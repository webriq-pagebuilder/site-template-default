import { urlFor } from "lib/sanity";
import React from "react";

function VariantA({ logo, title, text, button }) {
  return (
    <section className="skewed-top-left skewed-bottom-right">
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo && (
              <a
                className="mb-6 inline-block text-3xl font-bold leading-none"
                href="#"
              >
                <img
                  className="h-12"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt}
                  width="auto"
                />
              </a>
            )}
            <h2 className="mb-4 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h2>
            <p className="max-w-md mx-auto mb-6 text-gray-500 leading-loose">
              {text}
            </p>
            {button && (
              <a
                className="inline-block py-2 px-6 bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
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
