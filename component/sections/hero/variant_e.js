import React from "react";
import WebriQForm from "@webriq/gatsby-webriq-form";

function VariantE({
  template,
  title,
  text,
  primaryButton,
  secondaryButton,
  formFields,
  formId,
  formName,
  links,
}) {
  return (
    <section className="relative bg-gray-100 px-10">
      <div className="relative pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
              <div className="w-full text-center lg:text-left">
                <div className="max-w-md mx-auto lg:mx-0">
                  {title && (
                    <h1 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                      <span>{String(title).split("*")[0]}</span>
                      <span className={`text-${template.color}-900`}>
                        {String(title).split("*")[1]}
                      </span>
                    </h1>
                  )}
                </div>
                <div className="max-w-sm mx-auto lg:mx-0">
                  <p className="mb-6 text-gray-500 leading-loose">{text}</p>
                  <div>
                    {primaryButton && (
                      <a
                        aria-label={`Header ${
                          primaryButton?.label ?? "Primary"
                        } button which directs to ${
                          primaryButton?.type === "linkExternal"
                            ? primaryButton?.externalLink
                            : primaryButton?.type === "linkInternal"
                            ? primaryButton?.internalLink
                            : "not found"
                        } page`}
                        className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-semibold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                        target={primaryButton?.linkTarget}
                        rel={
                          primaryButton?.linkTarget === "_blank"
                            ? "noopener noreferrer"
                            : null
                        }
                        href={
                          primaryButton.type === "linkExternal"
                            ? primaryButton?.externalLink
                            : primaryButton.type === "linkInternal"
                            ? primaryButton.internalLink === "Home" ||
                              primaryButton.internalLink === "home"
                              ? "/"
                              : primaryButton?.internalLink
                            : "page-not-found"
                        }
                      >
                        {primaryButton?.label}
                      </a>
                    )}
                    {secondaryButton && (
                      <a
                        aria-label={`Header ${
                          secondaryButton?.label ?? "Secondary"
                        } button which directs to ${
                          secondaryButton?.type === "linkExternal"
                            ? secondaryButton?.externalLink
                            : secondaryButton?.type === "linkInternal"
                            ? secondaryButton?.internalLink
                            : "not found"
                        } page`}
                        className="inline-block w-full lg:w-auto py-2 px-6 font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                        target={secondaryButton?.linkTarget}
                        rel={
                          secondaryButton?.linkTarget === "_blank"
                            ? "noopener noreferrer"
                            : null
                        }
                        href={
                          secondaryButton.type === "linkExternal"
                            ? secondaryButton?.externalLink
                            : secondaryButton.type === "linkInternal"
                            ? secondaryButton.internalLink === "Home" ||
                              secondaryButton.internalLink === "home"
                              ? "/"
                              : secondaryButton?.internalLink
                            : "page-not-found"
                        }
                      >
                        {secondaryButton?.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="max-w-sm text-center mx-auto">
                {formFields && (
                  <div className="mb-4 px-6 py-8 bg-white rounded-xl shadow-md">
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">Sign Up</span>
                      <p className="text-2xl font-bold">Create an account</p>
                    </div>
                    <WebriQForm
                      method="POST"
                      data-form-id={formId}
                      name={formName}
                      className="form-header"
                      data-thankyou-url="/thank-you"
                      scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                    >
                      <div className="flex flex-wrap -mx-2">
                        {formFields?.[0] && formFields[0]?.name && (
                          <div className="mb-3 w-full lg:w-1/2 px-2">
                            {formFields[0].type === "textarea" ? (
                              <textarea
                                aria-label={`${formFields[0]?.name} text area`}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="text"
                                placeholder={formFields[0]?.name}
                                name={formFields[0]?.name}
                              />
                            ) : formFields[0].type === "inputFile" ? (
                              <label className="flex px-2 bg-gray-100 rounded">
                                <input
                                  aria-label="Add file"
                                  className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                  type="file"
                                  placeholder="Choose file.."
                                  name={formFields[0]?.name}
                                />
                              </label>
                            ) : (
                              <input
                                aria-label={`${
                                  formFields[0]?.type === "inputText"
                                    ? `Input ${formFields[0]?.name}`
                                    : `${formFields[0]?.type}`
                                }`}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type={
                                  formFields[0].type === "inputEmail"
                                    ? "email"
                                    : formFields[0].type === "inputPassword"
                                    ? "password"
                                    : "text"
                                }
                                placeholder={
                                  formFields[0].type === "inputEmail"
                                    ? "name@email.com"
                                    : formFields[0].type === "inputPassword"
                                    ? "Enter your password"
                                    : formFields[0]?.name
                                }
                                name={formFields[0]?.name}
                              />
                            )}
                          </div>
                        )}
                        {formFields?.[1] && formFields[1]?.name && (
                          <div className="mb-3 w-full lg:w-1/2 px-2">
                            {formFields[1].type === "textarea" ? (
                              <textarea
                                aria-label={`${formFields[1]?.name} text area`}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="text"
                                placeholder={formFields[1]?.name}
                                name={formFields[1]?.name}
                              />
                            ) : formFields[1].type === "inputFile" ? (
                              <label className="flex px-2 bg-gray-100 rounded">
                                <input
                                  aria-label="Add file"
                                  className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                  type="file"
                                  placeholder="Choose file.."
                                  name={formFields[1]?.name}
                                />
                              </label>
                            ) : (
                              <input
                                aria-label={`${
                                  formFields[1]?.type === "inputText"
                                    ? `Input ${formFields[1]?.name}`
                                    : `${formFields[1]?.type}`
                                }`}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type={
                                  formFields[1].type === "inputEmail"
                                    ? "email"
                                    : formFields[1].type === "inputPassword"
                                    ? "password"
                                    : "text"
                                }
                                placeholder={
                                  formFields[1].type === "inputEmail"
                                    ? "name@email.com"
                                    : formFields[1].type === "inputPassword"
                                    ? "Enter your password"
                                    : formFields[1]?.name
                                }
                                name={formFields[1]?.name}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {formFields?.[2] &&
                        formFields[2]?.name &&
                        (formFields[2].type === "textarea" ? (
                          <textarea
                            aria-label={`${formFields[2]?.name} text area`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type="text"
                            placeholder={formFields[2]?.name}
                            name={formFields[2]?.name}
                          />
                        ) : formFields[2].type === "inputFile" ? (
                          <div className="mb-4">
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                aria-label="Add file"
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder="Choose file.."
                                name={formFields[2]?.name}
                              />
                            </label>
                          </div>
                        ) : (
                          <input
                            aria-label={`${
                              formFields[2]?.type === "inputText"
                                ? `Input ${formFields[2]?.name}`
                                : `${formFields[2]?.type}`
                            }`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type={
                              formFields[2].type === "inputEmail"
                                ? "email"
                                : formFields[2].type === "inputPassword"
                                ? "password"
                                : "text"
                            }
                            placeholder={
                              formFields[2].type === "inputEmail"
                                ? "name@email.com"
                                : formFields[2].type === "inputPassword"
                                ? "Enter your password"
                                : formFields[2]?.name
                            }
                            name={formFields[2]?.name}
                          />
                        ))}
                      {formFields?.[3] &&
                        formFields[3]?.name &&
                        (formFields[3].type === "textarea" ? (
                          <textarea
                            aria-label={`${formFields[3]?.name} text area`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type="text"
                            placeholder={formFields[3]?.name}
                            name={formFields[3]?.name}
                          />
                        ) : formFields[3].type === "inputFile" ? (
                          <div className="mb-4">
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                aria-label="Add file"
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder="Choose file.."
                                name={formFields[3]?.name}
                              />
                            </label>
                          </div>
                        ) : (
                          <input
                            aria-label={`${
                              formFields[3]?.type === "inputText"
                                ? `Input ${formFields[3]?.name}`
                                : `${formFields[3]?.type}`
                            }`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type={
                              formFields[3].type === "inputEmail"
                                ? "email"
                                : formFields[3].type === "inputPassword"
                                ? "password"
                                : "text"
                            }
                            placeholder={
                              formFields[3].type === "inputEmail"
                                ? "name@email.com"
                                : formFields[3].type === "inputPassword"
                                ? "Enter your password"
                                : formFields[3]?.name
                            }
                            name={formFields[3]?.name}
                          />
                        ))}
                      {formFields?.[4] &&
                        formFields[4]?.name &&
                        (formFields[4].type === "textarea" ? (
                          <textarea
                            aria-label={`${formFields[4]?.name} text area`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type="text"
                            placeholder={formFields[4]?.name}
                            name={formFields[4]?.name}
                          />
                        ) : formFields[4].type === "inputFile" ? (
                          <div className="mb-4">
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                aria-label="Add file"
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder="Choose file.."
                                name={formFields[4]?.name}
                              />
                            </label>
                          </div>
                        ) : (
                          <input
                            aria-label={`${
                              formFields[4]?.type === "inputText"
                                ? `Input ${formFields[4]?.name}`
                                : `${formFields[4]?.type}`
                            }`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            type={
                              formFields[4].type === "inputEmail"
                                ? "email"
                                : formFields[4].type === "inputPassword"
                                ? "password"
                                : "text"
                            }
                            placeholder={
                              formFields[4].type === "inputEmail"
                                ? "name@email.com"
                                : formFields[4].type === "inputPassword"
                                ? "Enter your password"
                                : formFields[4]?.name
                            }
                            name={formFields[4]?.name}
                          />
                        ))}
                      <div>
                        <div className="webriq-recaptcha" />
                      </div>
                      <div className="text-center">
                        <button
                          aria-label="Header Sign Up button"
                          className="mb-2 w-full py-4 bg-webriq-darkblue hover:bg-webriq-blue rounded text-sm font-bold text-gray-50 transition duration-200"
                          type="submit"
                        >
                          Sign Up
                        </button>
                        <span className="text-gray-400 text-xs">
                          Already have an account?{" "}
                          <a
                            aria-label="Header Sign in link"
                            className="text-webriq-darkblue hover:underline"
                            href="#"
                          >
                            Sign In
                          </a>
                        </span>
                      </div>
                    </WebriQForm>
                  </div>
                )}
                {links && (
                  <p className="text-xs text-gray-500">
                    {links?.map((link, index, { length }) => (
                      <>
                        <a
                          aria-label={`Header ${
                            link?.label ?? "Terms and Policies"
                          } links which directs to ${
                            link?.type === "linkExternal"
                              ? link?.externalLink
                              : link?.type === "linkInternal"
                              ? link?.internalLink
                              : "not found"
                          } page`}
                          className="underline text-webriq-darkblue hover:text-webriq-blue"
                          target={
                            link?.linkTarget === "_blank" ? "_blank" : null
                          }
                          rel={
                            link?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                          key={index}
                          href={
                            link?.type === "linkExternal"
                              ? link?.externalLink
                              : link?.type === "linkInternal"
                              ? link?.internalLink === "Home" ||
                                link?.internalLink === "home"
                                ? "/"
                                : link?.internalLink
                              : "page-not-found"
                          }
                        >
                          {link?.label}
                        </a>
                        {index + 1 !== length ? (
                          <span>&nbsp;and&nbsp;</span>
                        ) : null}
                      </>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantE);
