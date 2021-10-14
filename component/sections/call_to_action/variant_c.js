import React from "react";
import WebriQForm from "component/webriq-form";

function VariantC({ title, text, features, formFields, formId, formName }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h2>
            <p className="max-w-lg text-gray-500 leading-loose">{text}</p>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            {formFields && (
              <div className="mb-4 flex items-center lg:justify-end">
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
                      className="mr-2 py-2 px-4 bg-white rounded leading-loose"
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
                  <div>
                    <div className="webriq-recaptcha" />
                  </div>
                  <button
                    className="inline-block py-2 px-6 bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                    type="submit"
                  >
                    Get Started
                  </button>
                </WebriQForm>
              </div>
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
