import { urlFor } from "lib/sanity";
import Link from "next/link";
import React from "react";
import { logoLink } from "helper";

import { CTAProps } from ".";
import Image from "next/image";
import { Text, Heading, Button } from "components/ui";
import { Container } from "components/layout/index";

function VariantA({ logo, title, text, button }: CTAProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container className="text-center" maxWidth={576}>
        {logo?.image && (
          <Link
            aria-label={
              logoLink(logo) === "/"
                ? "Go to home page"
                : `Go to ${logoLink(logo)}`
            }
            className="inline-block mb-6 text-3xl font-bold leading-none"
            href={logoLink(logo)}
            target={logo?.linkTarget}
            rel={logo?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
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
        {title && <Heading className="mb-4">{title}</Heading>}
        {text && <Text className="mb-6">{text}</Text>}
        {button?.label && (
          <Button as="link" link={button} ariaLabel={button?.label}>
            {button?.label}
          </Button>
        )}
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
