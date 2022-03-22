import React from "react";
import Link from "next/link";
import WebriQForm from "component/webriq-form";

function VariantE({ form, formLinks, signInLink }) {
  const { id, name, subtitle, fields, buttonLabel } = form;

  return (
    <section className="py-20 px-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {fields && (
            <div className="mb-6 py-8 px-6 bg-white shadow rounded-t-3xl rounded-bl-3xl text-center">
              <WebriQForm
                method="POST"
                data-form-id={id}
                name="Calltoaction-VariantD-Form"
                className="form-callToAction"
                data-thankyou-url="/thank-you"
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                <div className="mb-6">
                  <span className="text-sm text-gray-500">{subtitle}</span>
                  <p className="text-2xl">{name}</p>
                </div>
                <div className="mb-3 flex flex-wrap -mx-2">
                  {fields?.slice(0, 2)?.map((formFields, index) => (
                    <div
                      className="w-full lg:w-1/2 px-2 mb-3 lg:mb-0 xl:mb-0 2xl:mb-0"
                      key={index}
                    >
                      {formFields.type === "textarea" ? (
                        <textarea
                          aria-label={`${formFields?.name} text area`}
                          className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          placeholder={formFields?.name}
                          name={formFields?.name}
                          required={formFields?.isRequired}
                        />
                      ) : formFields.type === "inputFile" ? (
                        <label className="flex px-2 bg-gray-100 rounded">
                          <input
                            aria-label={formFields?.name}
                            className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type="file"
                            placeholder={formFields?.name ?? "Choose file.."}
                            name={formFields?.name}
                            required={formFields?.isRequired}
                          />
                        </label>
                      ) : formFields.type === "inputNumber" ? (
                        <input
                          aria-label={formFields?.name}
                          className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          type="number"
                          placeholder={formFields?.name}
                          name={formFields?.name}
                          required={formFields?.isRequired}
                        />
                      ) : (
                        <input
                          aria-label={`${
                            formFields?.type === "inputText"
                              ? `Input ${formFields?.name}`
                              : `${formFields?.type}`
                          }`}
                          className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          type={
                            formFields?.type === "inputEmail"
                              ? "email"
                              : formFields?.type === "inputPassword"
                              ? "password"
                              : "text"
                          }
                          placeholder={formFields?.name}
                          name={formFields?.name}
                          required={formFields?.isRequired}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {fields?.slice(2)?.map((formFields, index) => (
                  <div key={index}>
                    {formFields?.type === "textarea" ? (
                      <textarea
                        aria-label={`${formFields?.name} text area`}
                        className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                        placeholder={formFields?.name}
                        name={formFields?.name}
                        required={formFields?.isRequired}
                      />
                    ) : formFields?.type === "inputFile" ? (
                      <div className="mb-3">
                        <label className="flex px-2 bg-gray-100 rounded">
                          <input
                            aria-label="Add file"
                            className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type="file"
                            placeholder={formFields?.name ?? "Choose file.."}
                            name={formFields?.name}
                            required={formFields?.isRequired}
                          />
                        </label>
                      </div>
                    ) : formFields?.type === "inputPassword" ? (
                      <div className="mb-4 p-4 bg-gray-100 rounded">
                        <input
                          aria-label={formFields?.type}
                          className="w-full text-xs bg-gray-100 outline-none"
                          type="password"
                          placeholder={formFields?.name}
                          name={formFields?.name}
                          required={formFields?.isRequired}
                        />
                      </div>
                    ) : formFields.type === "inputNumber" ? (
                      <input
                        aria-label={formFields?.name}
                        className="mb-4 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                        type="number"
                        placeholder={formFields?.name}
                        name={formFields?.name}
                        required={formFields?.isRequired}
                      />
                    ) : (
                      <div className="mb-4 flex p-4 bg-gray-100 rounded">
                        <input
                          aria-label={`${
                            formFields?.type === "inputText"
                              ? `Input ${formFields?.name}`
                              : `${formFields?.type}`
                          }`}
                          className="w-full text-xs bg-gray-100 outline-none"
                          type={
                            formFields?.type === "inputEmail" ? "email" : "text"
                          }
                          placeholder={formFields?.name}
                          name={formFields?.name}
                          required={formFields?.isRequired}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {buttonLabel && (
                  <button
                    aria-label={
                      buttonLabel ?? "Call to action form submit button"
                    }
                    className="mb-4 py-4 w-full rounded text-sm bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-normal transition duration-200"
                    type="submit"
                  >
                    {buttonLabel}
                  </button>
                )}
              </WebriQForm>
              {signInLink?.label && (
                <p className="text-xs text-gray-500">
                  <span>Already have an account?</span>
                  {signInLink?.type === "linkInternal" ? (
                    <Link
                      href={
                        signInLink?.internalLink === "Home" ||
                        signInLink?.internalLink === "home"
                          ? "/"
                          : `/${
                              signInLink?.internalLink === undefined
                                ? "page-not-found"
                                : signInLink?.internalLink
                            }`
                      }
                    >
                      <a
                        aria-label={`Call to action ${
                          signInLink?.label ?? "Sign In"
                        } link`}
                        className="text-webriq-darkblue hover:text-webriq-babyblue"
                        target={signInLink?.linkTarget}
                        rel={
                          signInLink?.linkTarget === "_blank"
                            ? "noopener noreferrer"
                            : null
                        }
                      >
                        &nbsp;{signInLink?.label}
                      </a>
                    </Link>
                  ) : (
                    <a
                      aria-label={`Call to action ${
                        signInLink?.label ?? "Sign In"
                      } link`}
                      className="text-webriq-darkblue hover:text-webriq-babyblue"
                      target={signInLink?.linkTarget}
                      href={`${
                        signInLink.externalLink === undefined
                          ? "link-not-found"
                          : signInLink.externalLink
                      }`}
                      rel={
                        signInLink?.linkTarget === "_blank"
                          ? "noopener noreferrer"
                          : null
                      }
                    >
                      &nbsp;{signInLink?.label}
                    </a>
                  )}
                </p>
              )}
            </div>
          )}
          {formLinks && (
            <div className="flex flex-wrap text-sm justify-center items-center text-gray-500">
              {formLinks?.map((link, index, { length }) => (
                <div key={index}>
                  {link?.type === "linkInternal" ? (
                    <Link
                      href={
                        link?.internalLink === "Home" ||
                        link?.internalLink === "home"
                          ? "/"
                          : `/${
                              link.internalLink === undefined
                                ? "page-not-found"
                                : link.internalLink
                            }`
                      }
                    >
                      <a
                        aria-label={`Call to action ${
                          link?.label ?? "Terms and Policies"
                        } links which directs to ${
                          link?.internalLink === undefined
                            ? "page-not-found"
                            : link?.internalLink
                        }`}
                        className="text-webriq-darkblue hover:text-webriq-blue font-bold"
                        target={link?.linkTarget}
                        rel={
                          link?.linkTarget === "_blank"
                            ? "noopener noreferrer"
                            : null
                        }
                      >
                        {link?.label}
                      </a>
                    </Link>
                  ) : (
                    <a
                      aria-label={`Call to action ${
                        link?.label ?? "Terms and Policies"
                      } links which directs to ${
                        link?.externalLink === undefined
                          ? "link-not-found"
                          : link?.externalLink
                      }`}
                      className="text-webriq-darkblue hover:text-webriq-blue font-bold"
                      target={link?.linkTarget}
                      href={`${
                        link.externalLink === undefined
                          ? "link-not-found"
                          : link.externalLink
                      }`}
                      rel={
                        link?.linkTarget === "_blank"
                          ? "noopener noreferrer"
                          : null
                      }
                      key={index}
                    >
                      {link?.label}
                    </a>
                  )}
                  {index === length - 1 ? null : index === length - 2 ? (
                    <span>&nbsp;and&nbsp;</span>
                  ) : (
                    <span>&nbsp;,&nbsp;</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantE);
