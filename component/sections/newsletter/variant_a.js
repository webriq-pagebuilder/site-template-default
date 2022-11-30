import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import WebriQForm from "component/webriq-form";
import { logoLink, thankYouPageLink } from "helper";

function VariantA({ logo, title, description, form }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <Link href={logoLink()}>
                <a
                  aria-label={
                    logoLink() === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink()}`
                  }
                  className="mb-6 inline-block text-3xl font-bold leading-none"
                >
                  <img
                    className="h-12"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "newsletter-logo"}
                  />
                </a>
              </Link>
            )}
            <h1 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="mb-8 text-gray-700 leading-loose">{description}</p>
            {fields?.[0] && fields[0]?.name && (
              <WebriQForm
                method="POST"
                data-form-id={id}
                name="Newsletter-VariantA-Form"
                className="form-newsletter"
                data-thankyou-url={thankYouPageLink(thankYouPage)}
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                <div className="max-w-md mx-auto flex flex-wrap items-center">
                  <input
                    aria-label={`${
                      fields[0]?.type === "inputText"
                        ? `Input ${fields[0]?.name}`
                        : `${fields[0]?.type}`
                    }`}
                    className="flex-grow py-3 px-4 mr-4 text-xs rounded leading-loose"
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
                    <button
                      aria-label={
                        buttonLabel ?? "Newsletter form submit button"
                      }
                      className="w-auto py-2 px-6 rounded-t-xl rounded-l-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
                      type="submit"
                    >
                      {buttonLabel}
                    </button>
                  )}
                </div>
              </WebriQForm>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
