import { logoLink, thankYouPageLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Container, Flex } from "components/layout/index";
import { Button, Form, Heading, Text, Input } from "components/ui";
import { NewsletterProps } from ".";
import { useMediaQuery } from "hooks/useMediaQuery";

function VariantA({ logo, title, description, form }: NewsletterProps) {
  const { id, fields, buttonLabel, thankYouPage } = form;
  const breakpoint = useMediaQuery("401");

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={576} className="text-center">
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
                src={urlFor(logo?.image)}
                width={48}
                height={48}
                alt={logo?.alt ?? "newsletter-logo"}
              />
            </Link>
          )}
          {title && <Heading className="mb-2">{title}</Heading>}
          {description && (
            <Text className="my-8 leading-loose text-gray-700">
              {description}
            </Text>
          )}
          {fields && fields[0]?.name && (
            <Form
              id={id}
              name="Newsletter-VariantA-Form"
              className="form-newsletter"
              thankyouPage={thankYouPageLink(thankYouPage)}
            >
              <Flex wrap align="center" className="max-w-md mx-auto">
                <Input
                  variant="outline"
                  noLabel
                  ariaLabel={fields[0]?.placeholder ?? fields[0]?.name}
                  className="flex-grow mr-4 w-auto"
                  // className="flex-grow px-4 py-3 mr-4 text-xs leading-loose border rounded border-slate-300"
                  type={
                    fields[0].type === "inputEmail"
                      ? "email"
                      : "inputNumber"
                        ? "number"
                        : "text"
                  }
                  placeholder={fields[0]?.placeholder}
                  name={fields[0]?.name}
                  required={fields[0]?.isRequired}
                />
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {buttonLabel && (
                  <Button
                    as="button"
                    ariaLabel={buttonLabel ?? "Newsletter form submit button"}
                    type="submit"
                    className={`${breakpoint ? 'mt-2' : "mt-0"}`}
                  >
                    {buttonLabel}
                  </Button>
                )}
              </Flex>
            </Form>
          )}
        </Container>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
