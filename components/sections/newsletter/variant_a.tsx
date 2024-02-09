import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";

import { NewsletterProps } from ".";
import { Form } from "components/ui/Form/Form";
import { Button } from "components/ui/Button";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";
import { Input } from "components/ui/Input";

function VariantA({ logo, title, description, form }: NewsletterProps) {
  const { id, fields, buttonLabel, thankYouPage } = form;

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
            >
              <Image
                src={urlFor(logo?.image)}
                width={48}
                height={48}
                alt={logo?.alt ?? "newsletter-logo"}
              />
            </Link>
          )}
          {title && <Heading className="mb-2 ">{title}</Heading>}
          {description && (
            <Text className="mb-8 leading-loose text-gray-700">
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
