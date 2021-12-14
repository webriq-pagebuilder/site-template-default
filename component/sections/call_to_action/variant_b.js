import { urlFor } from "lib/sanity";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import WebriQForm from "component/webriq-form";

function VariantB({ logo, title, text, formFields, formId, formName }) {
  return (
    <section>
      <div>
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
        </svg>
      </div>
      <div className="py-20 bg-gray-50 rounded-tl-3xl rounded-br-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <Link prefetch={false} href="/">
                <a
                  aria-label="Call to Action logo"
                  className="mb-6 inline-block p-3 rounded"
                >
                  <Image
                    src={urlFor(logo?.image)}
                    layout="fixed"
                    width="132px"
                    height="48px"
                    objectFit="contain"
                    alt={logo?.alt ?? "callToAction-logo"}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </a>
              </Link>
            )}
            <h1 className="mb-4 text-4xl md:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="mb-6 text-gray-700">{text}</p>
            {formFields && (
              <WebriQForm
                method="POST"
                data-form-id={formId}
                name={formName}
                className="form-callToAction flex flex-wrap justify-center items-center"
                data-thankyou-url="/thank-you"
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                {formFields.slice(0, 2).map((field) => (
                  <input
                    key={field?._key}
                    aria-label={`Input ${field?.type}`}
                    className="w-full md:w-auto mb-3 md:mb-0 md:mr-4 py-2 px-4 bg-white rounded leading-loose"
                    type={
                      field?.type === "inputEmail"
                        ? "email"
                        : field?.type === "inputPassword"
                        ? "password"
                        : "text"
                    }
                    placeholder={field?.name}
                    name={field?.name}
                  />
                ))}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                <button
                  aria-label="Submit Call to Action Form button"
                  className="w-full md:w-auto py-2 px-4 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                  type="submit"
                >
                  Get&nbsp;Started
                </button>
              </WebriQForm>
            )}
          </div>
        </div>
      </div>
      <div>
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
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
