import React from "react";
import { urlFor } from "lib/sanity";
import WebriQForm from "@webriq/gatsby-webriq-form";

function VariantA({ logo, title, description, formFields, formId, formName }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo && (
              <a
                className="mb-6 inline-block text-3xl font-bold leading-none"
                href="#"
              >
                <img
                  className="h-12"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "newsletter-variantA-logo"}
                  width="auto"
                />
              </a>
            )}
            <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h2>
            <p className="mb-8 text-gray-400 leading-loose">{description}</p>
            {formFields?.[0] && formFields[0]?.name && (
              <WebriQForm
                method="POST"
                data-form-id={formId}
                name={formName}
                className="form-newsletter"
                data-thankyou-url="/thank-you"
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                <div className="max-w-md mx-auto flex flex-wrap items-center">
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
                    className="w-auto py-2 px-6 rounded-t-xl rounded-l-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                    type="submit"
                  >
                    Get Started
                  </button>
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
