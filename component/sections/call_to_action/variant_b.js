import { urlFor } from "lib/sanity";
import React from "react";
import Link from "next/link";
import WebriQForm from "component/webriq-form";

function VariantB({ logo, title, text, form }) {
  let logoLink;
  const { id, fields, buttonLabel } = form;

  if (logo.type === "linkInternal") {
    if (logo.internalLink === undefined) {
      logoLink = `/`; // default to root page when not defined
    } else {
      if (logo.internalLink === "Home" || logo.internalLink === "home") {
        logoLink = `/`;
      } else {
        logoLink = `/${logo.internalLink}`;
      }
    }
  } else {
    if (logo.externalLink === undefined) {
      logoLink = `/`;
    } else {
      logoLink = logo.externalLink;
    }
  }

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
              <Link href={logoLink}>
                <a
                  aria-label={
                    logoLink === "/" ? "Go to home page" : `Go to ${logoLink}`
                  }
                  className="mb-6 inline-block p-3 rounded"
                >
                  <img
                    className="h-14"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "callToAction-logo"}
                  />
                </a>
              </Link>
            )}
            <h1 className="mb-4 text-4xl md:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="mb-6 text-gray-700">{text}</p>
            {fields && (
              <WebriQForm
                method="POST"
                data-form-id={id}
                name="Calltoaction-VariantB-Form"
                className="form-callToAction flex flex-wrap justify-center items-center"
                data-thankyou-url="/thank-you"
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                {fields.slice(0, 2).map((field) => (
                  <input
                    key={field?._key}
                    aria-label={`Input ${field?.type}`}
                    className="w-full md:w-auto mb-3 md:mb-0 md:mr-4 py-2 px-4 bg-white rounded leading-loose"
                    type={
                      field?.type === "inputEmail"
                        ? "email"
                        : field?.type === "inputPassword"
                        ? "password"
                        : field?.type === "inputNumber"
                        ? "number"
                        : "text"
                    }
                    placeholder={field?.name}
                    name={field?.name}
                    required={field?.isRequired}
                  />
                ))}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {buttonLabel && (
                  <button
                    aria-label={
                      buttonLabel ?? "Call to action form submit button"
                    }
                    className="w-full md:w-auto py-2 px-4 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                    type="submit"
                  >
                    {buttonLabel}
                  </button>
                )}
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
