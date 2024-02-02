import { Text } from "components/ui/Text";
import { logoLink, thankYouPageLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Button } from "components/ui/Button";
import { Form } from "components/ui/Form/Form";
import { Heading } from "components/ui/Heading";
import { Input } from "components/ui/Input";
import { CTAProps } from ".";

function VariantB({ logo, title, text, form }: CTAProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container maxWidth={576} className="text-center">
        {logo?.image && (
          <Link
            aria-label={
              logoLink(logo) === "/"
                ? "Go to home page"
                : `Go to ${logoLink(logo)}`
            }
            className="inline-block p-3 mb-6 rounded"
            href={logoLink(logo)}
          >
            <Image
              src={urlFor(logo?.image)}
              width={56}
              height={56}
              alt={logo?.alt ?? "callToAction-logo"}
            />
          </Link>
        )}
        {title && <Heading className="mb-4">{title}</Heading>}
        <Text className="mb-6">{text}</Text>
        {form?.fields && (
          <Form
            id={form?.id}
            name="Calltoaction-VariantB-Form"
            thankyouPage={thankYouPageLink(form?.thankYouPage)}
          >
            <Flex align="center" gap={2} justify="between">
              {form?.fields
                ?.slice(0, 2)
                ?.map((field) => (
                  <Input
                    noLabel
                    key={field?._key}
                    ariaLabel={field?.placeholder ?? field?.name}
                    type={
                      field?.type === "inputEmail"
                        ? "email"
                        : field?.type === "inputPassword"
                        ? "password"
                        : field?.type === "inputNumber"
                        ? "number"
                        : "text"
                    }
                    placeholder={field?.placeholder}
                    name={field?.name}
                    required={field?.isRequired}
                  />
                ))}
              <div>
                <div className="webriq-recaptcha" />
              </div>
              {form?.buttonLabel && (
                <Button
                  className="w-full"
                  ariaLabel={form?.buttonLabel}
                  type="submit"
                >
                  {form?.buttonLabel}
                </Button>
              )}
            </Flex>
          </Form>
        )}
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
