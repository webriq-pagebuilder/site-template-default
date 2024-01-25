import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";

import { CTAProps } from ".";
import { Text } from "components/ui/Text";
import { Button } from "components/ui/Button";
import { Form } from "components/ui/Form/Form";
import { Input } from "components/ui/Input";

function VariantC({ title, text, features, form }: CTAProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="mb-8 w-full px-4 lg:mb-0 lg:w-1/2">
            <Text type="h1">{title}</Text>
            <p className="max-w-lg leading-loose text-gray-700">{text}</p>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {form?.fields && (
              <Form
                id={form?.id}
                name="Calltoaction-VariantC-Form"
                className="form-callToAction mb-4 sm:flex items-center lg:justify-end"
                thankyouPage={thankYouPageLink(form?.thankYouPage)}
              >
                {form?.fields?.[0] && form?.fields[0]?.type && (
                  <Input
                    noLabel
                    ariaLabel={
                      form?.fields[0]?.placeholder ?? form?.fields[0]?.name
                    }
                    className="mr-2"
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
              </Form>
            )}
            <div>
              <ul className="flex items-center text-gray-500 lg:justify-end">
                {features &&
                  features?.map((feature, index) => (
                    <li className="mr-4 flex items-center" key={index}>
                      <span>
                        <svg
                          className="mr-2 h-6 w-6 text-brand-primary-foreground"
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
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
