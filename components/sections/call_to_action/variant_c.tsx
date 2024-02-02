import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";

import { CTAProps } from ".";
import { Text } from "components/ui/Text";
import { Button } from "components/ui/Button";
import { Form } from "components/ui/Form/Form";
import { Input } from "components/ui/Input";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";

function VariantC({ title, text, features, form }: CTAProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex
          align="center"
          className="flex-col lg:flex-row"
          gap={4}
          justify="between"
        >
          <div className="w-full px-4 mb-8 lg:mb-0 lg:w-1/2">
            <Heading className="mb-4">{title}</Heading>
            <Text muted>{text}</Text>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {form?.fields && (
              <Form
                id={form?.id}
                name="Calltoaction-VariantC-Form"
                className="items-center mb-4 form-callToAction sm:flex lg:justify-end"
                thankyouPage={thankYouPageLink(form?.thankYouPage)}
              >
                <Flex gap={2} className="flex-col lg:flex-row">
                  {form?.fields?.[0] && form?.fields[0]?.type && (
                    <Input
                      noLabel
                      ariaLabel={
                        form?.fields[0]?.placeholder ?? form?.fields[0]?.name
                      }
                      className="w-auto mr-2"
                      type={
                        form?.fields[0]?.type === "inputEmail"
                          ? "email"
                          : form?.fields[0]?.type === "inputPassword"
                          ? "password"
                          : form?.fields[0]?.type === "inputNumber"
                          ? "number"
                          : "text"
                      }
                      placeholder={form?.fields[0]?.placeholder}
                      name={form?.fields[0]?.name}
                      required={form?.fields[0]?.isRequired}
                    />
                  )}
                  <div>
                    <div className="webriq-recaptcha" />
                  </div>
                  {form?.buttonLabel && (
                    <Button
                      ariaLabel={
                        form?.buttonLabel ?? "Call to action form submit button"
                      }
                      type="submit"
                    >
                      {form?.buttonLabel}
                    </Button>
                  )}
                </Flex>
              </Form>
            )}

            <Flex
              as="ul"
              align="center"
              className="text-gray-500 lg:justify-end"
              gap={4}
            >
              {features &&
                features?.map((feature, index) => (
                  <li className="flex items-center" key={index}>
                    <span>
                      <svg
                        className="w-6 h-6 mr-2 text-brand-primary-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <Text muted>{feature}</Text>
                  </li>
                ))}
            </Flex>
          </div>
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantC);
