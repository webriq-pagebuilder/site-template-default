import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";

import { NewsletterProps } from ".";
import { Form } from "components/ui/Form/Form";
import { Button } from "components/ui/Button";

function VariantA({ logo, title, description, form }: NewsletterProps) {
  const { id, fields, buttonLabel, thankYouPage } = form;

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center">
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
            <h1 className="mb-2 text-4xl font-bold font-heading lg:text-5xl">
              {title}
            </h1>
            <p className="mb-8 leading-loose text-gray-700">{description}</p>
            {fields && fields[0]?.name && (
              <Form
                id={id}
                name="Newsletter-VariantA-Form"
                className="form-newsletter"
                thankyouPage={thankYouPageLink(thankYouPage)}
              >
                <div className="flex flex-wrap items-center max-w-md mx-auto">
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
                      ariaLabel={buttonLabel ?? "Newsletter form submit button"}
                      type="submit"
                      className="py-2 leading-loose"
                    >
                      {buttonLabel}
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
