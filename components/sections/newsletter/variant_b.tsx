import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";
import { NewsletterProps } from ".";
import { Form } from "components/ui/Form/Form";
import { Button } from "components/ui/Button";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";

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
            <Heading>{title}</Heading>
            <Text muted>{description}</Text>
          </Container>
          {fields && fields[0]?.name && (
            <div className="w-full lg:w-2/5">
              <Form
                id={id}
                name="Newsletter-VariantB-Form"
                className="form-newsletter"
                thankyouPage={thankYouPageLink(thankYouPage)}
              >
                <div className="flex flex-wrap items-center max-w-md mx-auto lg:max-w-sm">
                  <input
                    aria-label={fields[0]?.placeholder ?? fields[0]?.name}
                    className="flex-grow px-4 py-3 mr-4 text-xs leading-loose border rounded border-slate-300"
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
                </div>
              </Form>
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
