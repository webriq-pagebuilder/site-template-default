import { ConditionalLink, extractLink, logoLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { SignUpForm } from "components/common/form/sign-up-form";
import { CTAProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Heading, Text, Button } from "components/ui";

function VariantD({
  logo,
  title,
  text,
  button,
  form,
  formLinks,
  signInLink,
}: CTAProps) {
  return (
    <section className="px-10 py-20 bg-gray-50">
      <Container>
        <Flex
          align="center"
          justify="between"
          gap={4}
          className="flex-col lg:flex-row"
        >
          <div className="basis-1/2">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="inline-block mb-10 text-3xl font-bold leading-none"
                href={logoLink(logo)}
              >
                <Image
                  className="h-14"
                  src={urlFor(logo?.image)}
                  width={56}
                  height={56}
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </Link>
            )}
            {title && <Heading className="mb-4">{title}</Heading>}
            {text && (
              <Text className="mb-8 leading-loose" muted>
                {text}
              </Text>
            )}
            {button?.label && (
              <Button link={button} ariaLabel={button?.label}>
                {button?.label}
              </Button>
            )}
          </div>
          <div className="max-w-sm ">
            {form?.fields && <SignUpForm form={form} signInLink={signInLink} />}
            {formLinks && (
              <div className="flex flex-wrap items-center justify-center text-sm text-gray-500">
                {formLinks?.map((link, index, { length }) => (
                  <div key={index}>
                    <Link
                      href={extractLink(link)}
                      className="font-bold text-primary hover:text-primary-foreground"
                    >
                      {link?.label}
                    </Link>
                    {index === length - 1 ? null : index === length - 2 ? (
                      <span>&nbsp;and&nbsp;</span>
                    ) : (
                      <span>&nbsp;,&nbsp;</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantD);
