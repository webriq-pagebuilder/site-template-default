import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";

function VariantB({ logo, title, description, form }) {
  const { id, fields, buttonLabel, thankYouPage } = form;

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="mb-4 w-full lg:w-auto lg:mr-8 text-center">
              <div className="flex justify-center items-center mx-auto">
                {logo?.image && (
                  <Link href={logoLink()}>
                    <a
                      aria-label={
                        logoLink() === "/"
                          ? "Go to home page"
                          : `Go to ${logoLink()}`
                      }
                      className="mb-8 inline-block p-5 bg-white rounded"
                    >
                      <img
                        className="h-10"
                        src={urlFor(logo?.image)}
                        alt={logo?.alt ?? "newsletter-logo"}
                      />
                    </a>
                  </Link>
                )}
              </div>
            </div>
            <div className="mb-6 w-full lg:w-auto max-w-lg mx-auto lg:ml-0 mr-auto text-center lg:text-left">
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-gray-700">{description}</p>
            </div>
            {fields && fields[0]?.name && (
              <div className="w-full lg:w-2/5">
                <WebriQForm
                  method="POST"
                  data-form-id={id}
                  name="Newsletter-VariantB-Form"
                  className="form-newsletter"
                  data-thankyou-url={thankYouPageLink(thankYouPage)}
                  scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                >
                  <div className="max-w-md lg:max-w-sm mx-auto flex flex-wrap items-center">
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
                        className="flex-none py-2 px-6 rounded-t-xl rounded-l-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
                        type="submit"
                      >
                        {buttonLabel}
                      </button>
                    )}
                  </div>
                </WebriQForm>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
