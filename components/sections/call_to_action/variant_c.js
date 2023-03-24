import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";


function VariantC({ title, text, features, form }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="max-w-lg text-gray-700 leading-loose">{text}</p>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            {form?.fields && (
              <WebriQForm
                method="POST"
                data-form-id={form?.id}
                name="Calltoaction-VariantC-Form"
                className="form-callToAction flex mb-4 items-center lg:justify-end"
                data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                {form?.fields?.[0] && form?.fields[0]?.type && (
                  <input
                    aria-label={`${
                      form?.fields[0]?.type === "inputText"
                        ? `Input ${form?.fields[0]?.name}`
                        : `${form?.fields[0]?.type}`
                    }`}
                    className="mr-2 py-2 px-4 bg-white rounded leading-loose"
                    type={
                      form?.fields[0]?.type === "inputEmail"
                        ? "email"
                        : form?.fields[0]?.type === "inputPassword"
                        ? "password"
                        : form?.fields[0]?.type === "inputNumber"
                        ? "number"
                        : "text"
                    }
                    placeholder={form?.fields[0]?.placeholder}
                    name={form?.fields[0]?.name}
                    required={form?.fields[0]?.isRequired}
                  />
                )}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {form?.buttonLabel && (
                  <button
                    aria-label={
                      form?.buttonLabel ?? "Call to action form submit button"
                    }
                    className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                    type="submit"
                  >
                    {form?.buttonLabel}
                  </button>
                )}
              </WebriQForm>
            )}
            <div>
              <ul className="flex items-center lg:justify-end text-gray-500">
                {features &&
                  features?.map((feature, index) => (
                    <li className="mr-4 flex items-center" key={index}>
                      <span>
                        <svg
                          className="mr-2 w-6 h-6 text-webriq-blue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
