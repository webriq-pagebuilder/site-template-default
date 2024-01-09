import { urlFor } from "lib/sanity";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";
import { Text } from "components/ui/Text";

import { CTAProps } from ".";
import { Form } from "components/ui/Form/Form";
import { FormField } from "components/ui/FormField";
import { Button } from "components/ui/Button";
import { Input } from "components/ui/Input";

function VariantB({ logo, title, text, form }: CTAProps) {
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
            <Text type="h1" className="mb4">
              {title}
            </Text>
            <p className="mb-6 text-gray-700">{text}</p>
            {form?.fields && (
              <Form
                id={form?.id}
                name="Calltoaction-VariantB-Form"
                className="flex flex-wrap items-center justify-center"
                thankyouPage={thankYouPageLink(form?.thankYouPage)}
              >
                {form?.fields
                  ?.slice(0, 2)
                  ?.map((field) => (
                    <Input
                      label=" "
                      key={field?._key}
                      ariaLabel={field?.placeholder ?? field?.name}
                      className="mb-3 md:mb-0 md:mr-4 md:w-auto"
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
                  <Button ariaLabel={form?.buttonLabel} type="submit">
                    {form?.buttonLabel}
                  </Button>
                )}
              </Form>
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
export default React.memo(VariantB);
