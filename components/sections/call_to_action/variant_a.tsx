import { urlFor } from "lib/sanity";
import Link from "next/link";
import React from "react";
import { logoLink } from "helper";

import { CTAProps } from ".";
import Image from "next/image";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { Text } from "components/ui/Text";

function VariantA({ logo, title, text, button }: CTAProps) {
  return (
    <section>
      <div>
        <svg
          className="w-full h-8 text-gray-50 md:h-12 lg:h-20"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
        </svg>
      </div>
      <div className="py-20 rounded-br-3xl rounded-tl-3xl bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="inline-block mb-6 text-3xl font-bold leading-none"
                href={logoLink(logo)}
              >
                <Image
                  className="h-14"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "callToAction-logo"}
                  height={64}
                  width={64}
                />
              </Link>
            )}
            <Text type="h1">{title}</Text>
            <p className="max-w-md mx-auto mb-6 leading-loose text-gray-700">
              {text}
            </p>
            {button?.label && (
              <ConditionalLink link={button} ariaLabel={button?.label}>
                {button?.label}
              </ConditionalLink>
            )}
          </div>
        </div>
      </div>
      <div>
        <svg
          className="w-full h-8 text-gray-50 md:h-12 lg:h-20"
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
