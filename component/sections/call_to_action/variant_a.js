import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function VariantA({ logo, title, text, button }) {
  return (
    <section className="skewed-top-left skewed-bottom-right">
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <Link href="/">
                <a className="mb-6 inline-block text-3xl font-bold leading-none">
                  <Image
                    src={urlFor(logo?.image)}
                    layout="fixed"
                    width="132px"
                    height="48px"
                    objectFit="contain"
                    alt={logo?.alt ?? "callToAction-logo"}
                  />
                </a>
              </Link>
            )}
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="max-w-md mx-auto mb-6 text-gray-700 leading-loose">
              {text}
            </p>
            {button && button?.type === "linkInternal" ? (
              <Link
                href={
                  button?.internalLink === "Home" ||
                  button?.internalLink === "home"
                    ? "/"
                    : `/${
                        button.internalLink === undefined
                          ? "page-not-found"
                          : button.internalLink
                      }`
                }
              >
                <a
                  aria-label={`Call to action ${
                    button?.label ?? "primary"
                  } button which directs to ${
                    button?.internalLink === undefined
                      ? "page-not-found"
                      : button?.internalLink
                  }`}
                  className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                  target={button?.linkTarget}
                  rel={
                    button?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {button?.label}
                </a>
              </Link>
            ) : (
              <a
                aria-label={`Call to action ${
                  button?.label ?? "primary"
                } button which directs to ${
                  button?.externalLink === undefined
                    ? "link-not-found"
                    : button?.externalLink
                }`}
                className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                target={button?.linkTarget}
                href={`/${
                  button.externalLink === undefined
                    ? "link-not-found"
                    : button.externalLink
                }`}
                rel={
                  button?.linkTarget === "_blank" ? "noopener noreferrer" : null
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
