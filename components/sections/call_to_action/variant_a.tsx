import { urlFor } from "lib/sanity";
import Link from "next/link";
import React from "react";
import { logoLink, ConditionalBtnOrLink } from "helper";

import { CTAProps } from "./index";

function VariantA({ logo, title, text, button }: CTAProps) {
  return (
    <section>
      <div>
        <svg
          className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
        </svg>
      </div>
      <div className="rounded-br-3xl rounded-tl-3xl bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink() === "/" ? "Go to home page" : `Go to ${logoLink()}`
                }
                className="mb-6 inline-block text-3xl font-bold leading-none"
                href={logoLink()}
              >
                <img
                  className="h-14"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </Link>
            )}
            <h1 className="font-heading mb-4 text-4xl font-bold lg:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mb-6 max-w-md leading-loose text-gray-700">
              {text}
            </p>
            {button?.label && (
              <ConditionalBtnOrLink
                value={button}
                style="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <svg
          className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
        </svg>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
