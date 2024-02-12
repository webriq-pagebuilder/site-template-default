import { Container, Flex } from "components/layout/index";
import { Button, Form, Heading, Input, Text } from "components/ui";
import { logoLink, thankYouPageLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewsletterProps } from ".";

function VariantB({ logo, title, description, form }: NewsletterProps) {
  const { id, fields, buttonLabel, thankYouPage } = form;

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap align="center">
          <div className="w-full mb-4 text-center lg:mr-8 lg:w-auto">
            <Flex align="center" justify="center" className="mx-auto ">
              {logo?.image && (
                <Link
                  aria-label={
                    logoLink(logo) === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink(logo)}`
                  }
                  className="inline-block p-5 mb-8 bg-white rounded"
                  href={logoLink(logo)}
                >
                  <Image
                    src={urlFor(logo?.image)}
                    width={40}
                    height={40}
                    quality={100}
                    alt={logo?.alt ?? "newsletter-logo"}
                  />
                </Link>
              )}
            </Flex>
          </div>
          <Container
            maxWidth={512}
            className="w-full mb-6 mr-auto text-center lg:ml-0 lg:w-auto lg:text-left"
          >
            {title && <Heading>{title}</Heading>}
            {description && <Text muted>{description}</Text>}
          </Container>
          {fields && fields[0]?.name && (
            <div className="w-full lg:w-2/5">
              <Form
                id={id}
                name="Newsletter-VariantB-Form"
                className="form-newsletter"
                thankyouPage={thankYouPageLink(thankYouPage)}
              >
                <Flex
                  wrap
                  align="center"
                  className="max-w-md mx-auto lg:max-w-sm"
                >
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
                    >
                      {buttonLabel}
                    </Button>
                  )}
                </Flex>
              </Form>
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
