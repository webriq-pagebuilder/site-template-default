import { urlFor } from "lib/sanity";
import React from "react";
import WebriQForm from "@webriq/gatsby-webriq-form";

function VariantB({ logo, title, text, formFields, formId, formName }) {
  return (
    <section className="skewed-top-left skewed-bottom-right">
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo && (
              <span className="mb-6 inline-block p-3 bg-webriq-lightblue rounded">
                <img
                  className="h-12"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "callToAction-variantB-logo"}
                  width="auto"
                />
              </span>
            )}
            <h2 className="mb-4 text-4xl md:text-5xl font-bold font-heading">
              {title}
            </h2>
            <p className="mb-6 text-gray-500">{text}</p>
            {formFields && (
              <div className="flex flex-wrap justify-center items-center">
                <WebriQForm
                  method="POST"
                  data-form-id={formId}
                  name={formName}
                  className="form-callToAction"
                  data-thankyou-url="/thank-you"
                  scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                >
                  {formFields?.[0] && formFields[0]?.type && (
                    <input
                      className="w-full md:w-auto mb-3 md:mb-0 md:mr-4 py-2 px-4 bg-white rounded leading-loose"
                      type={
                        formFields[0].type === "inputEmail" ? "email" : "text"
                      }
                      placeholder={
                        formFields[0].type === "inputEmail"
                          ? "hello@example.com"
                          : formFields[0]?.name
                      }
                      name={formFields[0]?.name}
                    />
                  )}
                  {formFields?.[1] && formFields[1]?.type && (
                    <input
                      className="w-full md:w-auto mb-3 md:mb-0 md:mr-4 py-2 px-4 bg-white rounded leading-loose"
                      type={
                        formFields[1].type === "inputEmail" ? "email" : "text"
                      }
                      placeholder={
                        formFields[1].type === "inputEmail"
                          ? "hello@example.com"
                          : formFields[1]?.name
                      }
                      name={formFields[1]?.name}
                    />
                  )}
                  <div>
                    <div className="webriq-recaptcha" />
                  </div>
                  <button
                    className="w-full md:w-auto py-2 px-4 bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                    type="submit"
                  >
                    Get&nbsp;Started
                  </button>
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
