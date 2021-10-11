import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import WebriQForm from "@webriq/gatsby-webriq-form";

function VariantA({ logo, title, description, formFields, formId, formName }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <Link prefetch={false} href="/">
                <a className="mb-6 inline-block text-3xl font-bold leading-none">
                  <Image
                    src={urlFor(logo?.image)}
                    layout="fixed"
                    width="132px"
                    height="48px"
                    objectFit="contain"
                    alt={logo?.alt ?? "newsletter-logo"}
                  />
                </a>
              </Link>
            )}
            <h1 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="mb-8 text-gray-700 leading-loose">{description}</p>
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
                    aria-label={`${
                      formFields[0]?.type === "inputText"
                        ? `Input ${formFields[0]?.name}`
                        : `${formFields[0]?.type}`
                    }`}
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
                    className="w-auto py-2 px-6 rounded-t-xl rounded-l-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
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
