import { urlFor } from "lib/sanity";
import React from "react";
import WebriQForm from "@webriq/gatsby-webriq-form";

function VariantD({
  logo,
  title,
  text,
  button,
  formFields,
  formId,
  formName,
  links,
}) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="mb-16 lg:mb-0 max-w-2xl lg:w-1/2 px-4">
            {logo && (
              <a
                className="mb-6 inline-block text-3xl font-bold leading-none"
                href="#"
              >
                <img
                  className="h-12"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt}
                  width="auto"
                />
              </a>
            )}
            <h2 className="mb-4 text-4xl md:text-5xl font-bold font-heading">
              {title}
            </h2>
            <p className="mb-8 text-gray-500 leading-loose">{text}</p>
            {button && (
              <a
                className="inline-block py-2 px-6 bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-250 rounded-l-xl rounded-t-xl"
                href={
                  button.type === "linkExternal"
                    ? button?.externalLink
                    : button.type === "linkInternal"
                    ? button.internalLink === "Home" ||
                      button.internalLink === "home"
                      ? "/"
                      : button?.internalLink
                    : "page-not-found"
                }
              >
                {button?.label}
              </a>
            )}
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="max-w-sm mx-auto lg:mr-0 lg:ml-auto">
              {formFields && (
                <div className="mb-6 py-8 px-6 bg-white shadow rounded-t-3xl rounded-bl-3xl text-center">
                  <WebriQForm
                    method="POST"
                    data-form-id={formId}
                    name={formName}
                    className="form-callToAction"
                    data-thankyou-url="/thank-you"
                    scriptSrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                  >
                    <div className="mb-6">
                      <span className="text-sm text-gray-400">Sign Up</span>
                      <h4 className="text-2xl">Create an account</h4>
                    </div>
                    <div className="mb-4 flex flex-wrap -mx-2">
                      {formFields?.[0] && formFields[0]?.name && (
                        <div className="mb-3 w-full lg:w-1/2 px-2">
                          {formFields[0].type === "textarea" ? (
                            <textarea
                              className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              type="text"
                              placeholder={formFields[0]?.name}
                              name={formFields[0]?.name}
                            />
                          ) : formFields[0].type === "inputFile" ? (
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder="Choose file.."
                                name={formFields[0]?.name}
                              />
                            </label>
                          ) : (
                            <input
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
                              className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              type="text"
                              placeholder={formFields[1]?.name}
                              name={formFields[1]?.name}
                            />
                          ) : formFields[1].type === "inputFile" ? (
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder="Choose file.."
                                name={formFields[1]?.name}
                              />
                            </label>
                          ) : (
                            <input
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
                          className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          type="text"
                          placeholder={formFields[2]?.name}
                          name={formFields[2]?.name}
                        />
                      ) : formFields[2].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-gray-100 rounded">
                            <input
                              className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[2]?.name}
                            />
                          </label>
                        </div>
                      ) : (
                        <input
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
                          className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          type="text"
                          placeholder={formFields[3]?.name}
                          name={formFields[3]?.name}
                        />
                      ) : formFields[3].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-gray-100 rounded">
                            <input
                              className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[3]?.name}
                            />
                          </label>
                        </div>
                      ) : (
                        <input
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
                          className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          type="text"
                          placeholder={formFields[4]?.name}
                          name={formFields[4]?.name}
                        />
                      ) : formFields[4].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-gray-100 rounded">
                            <input
                              className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[4]?.name}
                            />
                          </label>
                        </div>
                      ) : (
                        <input
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
                    <button
                      className="mb-4 py-4 w-full rounded text-sm bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-normal transition duration-200"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </WebriQForm>
                  <p className="text-xs text-gray-400">
                    <span>Already have an account?</span>
                    <a className="text-webriq-blue" href="#">
                      &nbsp;Sign In
                    </a>
                  </p>
                </div>
              )}
              {links &&
                (links.length > 1 ? (
                  <p className="text-center text-gray-400">
                    {links?.[0](
                      <a
                        className="text-webriq-darkblue hover:text-webriq-darkblue"
                        href={
                          links[0].type === "linkExternal"
                            ? links[0]?.externalLink
                            : links[0].type === "linkInternal"
                            ? links[0].internalLink === "Home" ||
                              links[0].internalLink === "home"
                              ? "/"
                              : links[0]?.internalLink
                            : "page-not-found"
                        }
                      >
                        {links[0]?.label}
                      </a>
                    )}
                    <span>&nbsp;and&nbsp;</span>
                    {links?.[1](
                      <a
                        className="text-webriq-darkblue hover:text-webriq-darkblue"
                        href={
                          links[1].type === "linkExternal"
                            ? links[1]?.externalLink
                            : links[1].type === "linkInternal"
                            ? links[1].internalLink === "Home" ||
                              links[1].internalLink === "home"
                              ? "/"
                              : links[1]?.internalLink
                            : "page-not-found"
                        }
                      >
                        {links[1]?.label}
                      </a>
                    )}
                  </p>
                ) : (
                  <p className="text-center text-gray-400">
                    {links?.[0] && (
                      <a
                        className="text-webriq-darkblue hover:text-webriq-darkblue"
                        href={
                          links[0].type === "linkExternal"
                            ? links[0]?.externalLink
                            : links[0].type === "linkInternal"
                            ? links[0].internalLink === "Home" ||
                              links[0].internalLink === "home"
                              ? "/"
                              : links[0]?.internalLink
                            : "page-not-found"
                        }
                      >
                        {links[0]?.label}
                      </a>
                    )}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
