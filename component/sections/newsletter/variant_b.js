import React from "react";
import { urlFor } from "lib/sanity";
import WebriQForm from "@webriq/gatsby-webriq-form";

function VariantB({ logo, title, description, formFields, formId, formName }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="mb-4 w-full lg:w-auto lg:mr-8 text-center">
              <div className="mb-8 inline-block px-5 py-5 bg-white rounded-lg">
                {logo && (
                  <img
                    className="h-10"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "newsletter-variantB-logo"}
                    width="auto"
                  />
                )}
              </div>
            </div>
            <div className="mb-6 w-full lg:w-auto max-w-lg mx-auto lg:ml-0 mr-auto text-center lg:text-left">
              <h2 className="text-4xl font-bold">{title}</h2>
              <p className="text-gray-400">{description}</p>
            </div>
            {formFields?.[0] && formFields[0]?.name && (
              <div className="w-full lg:w-2/5">
                <WebriQForm
                  method="POST"
                  data-form-id={formId}
                  name={formName}
                  className="form-newsletter"
                  data-thankyou-url="/thank-you"
                  scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                >
                  <div className="max-w-md lg:max-w-sm mx-auto flex flex-wrap items-center">
                    <input
                      className="flex-grow py-3 px-4 mr-4 text-xs rounded leading-loose"
                      type={
                        formFields[0].type === "inputEmail" ? "email" : "text"
                      }
                      placeholder={
                        formFields[0].type === "inputEmail"
                          ? "sample@email.com"
                          : formFields[0]?.name
                      }
                      name={formFields[0]?.name}
                    />
                    <div>
                      <div className="webriq-recaptcha" />
                    </div>
                    <button
                      aria-label="Submit Newsletter Form button"
                      className="flex-none py-2 px-6 rounded-t-xl rounded-l-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                      type="submit"
                    >
                      Get Started
                    </button>
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
