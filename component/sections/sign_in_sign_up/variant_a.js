import React from "react";
import WebriQForm from "@webriq/gatsby-webriq-form";
import { urlFor } from "lib/sanity";

function VariantA({
  logo,
  title,
  subtitle,
  formFields,
  formId,
  formName,
  links,
  signInLink,
}) {
  return (
    <section className="py-10 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-10">
            {logo && (
              <a className="text-3xl font-bold leading-none" href="#">
                <img
                  className="h-12 mx-auto"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "signUp-variantA-logo"}
                  width="auto"
                />
              </a>
            )}
          </div>
          <div className="mb-6 lg:mb-10 text-center">
            <div className="mb-6">
              <span className="text-gray-500">{subtitle}</span>
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <WebriQForm
              method="POST"
              data-form-id={formId}
              name={formName}
              className="form-signup"
              data-thankyou-url="/thank-you"
              scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
            >
              <div className="flex flex-wrap -mx-2">
                {formFields?.[0] && formFields[0]?.name && (
                  <div className="mb-3 w-full lg:w-1/2 px-2">
                    {formFields[0].type === "textarea" ? (
                      <textarea
                        className="w-full p-4 text-xs bg-white outline-none rounded"
                        type="text"
                        placeholder={formFields[0]?.name}
                        name={formFields[0]?.name}
                      />
                    ) : formFields[0].type === "inputFile" ? (
                      <label className="flex px-2 bg-white rounded">
                        <input
                          className="w-full p-4 text-xs bg-white outline-none rounded"
                          type="file"
                          placeholder="Choose file.."
                          name={formFields[0]?.name}
                        />
                      </label>
                    ) : (
                      <input
                        className="w-full p-4 text-xs bg-white outline-none rounded"
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
                        className="w-full p-4 text-xs bg-white outline-none rounded"
                        type="text"
                        placeholder={formFields[1]?.name}
                        name={formFields[1]?.name}
                      />
                    ) : formFields[1].type === "inputFile" ? (
                      <label className="flex px-2 bg-white rounded">
                        <input
                          className="w-full p-4 text-xs bg-white outline-none rounded"
                          type="file"
                          placeholder="Choose file.."
                          name={formFields[1]?.name}
                        />
                      </label>
                    ) : (
                      <input
                        className="w-full p-4 text-xs bg-white outline-none rounded"
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
                    className="mb-3 w-full p-4 text-xs bg-white outline-none rounded"
                    type="text"
                    placeholder={formFields[2]?.name}
                    name={formFields[2]?.name}
                  />
                ) : formFields[2].type === "inputFile" ? (
                  <div className="mb-4">
                    <label className="flex px-2 bg-white rounded">
                      <input
                        className="w-full p-4 text-xs bg-white outline-none rounded"
                        type="file"
                        placeholder="Choose file.."
                        name={formFields[2]?.name}
                      />
                    </label>
                  </div>
                ) : (
                  <input
                    className="mb-3 w-full p-4 text-xs bg-white outline-none rounded"
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
                    className="mb-3 w-full p-4 text-xs bg-white outline-none rounded"
                    type="text"
                    placeholder={formFields[3]?.name}
                    name={formFields[3]?.name}
                  />
                ) : formFields[3].type === "inputFile" ? (
                  <div className="mb-4">
                    <label className="flex px-2 bg-white rounded">
                      <input
                        className="w-full p-4 text-xs bg-white outline-none rounded"
                        type="file"
                        placeholder="Choose file.."
                        name={formFields[3]?.name}
                      />
                    </label>
                  </div>
                ) : (
                  <input
                    className="mb-3 w-full p-4 text-xs bg-white outline-none rounded"
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
                    className="mb-3 w-full p-4 text-xs bg-white outline-none rounded"
                    type="text"
                    placeholder={formFields[4]?.name}
                    name={formFields[4]?.name}
                  />
                ) : formFields[4].type === "inputFile" ? (
                  <div className="mb-4">
                    <label className="flex px-2 bg-white rounded">
                      <input
                        className="w-full p-4 text-xs bg-white outline-none rounded"
                        type="file"
                        placeholder="Choose file.."
                        name={formFields[4]?.name}
                      />
                    </label>
                  </div>
                ) : (
                  <input
                    className="mb-3 w-full p-4 text-xs bg-white outline-none rounded"
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
              {formFields && (
                <div className="text-center">
                  <button
                    aria-label="Sign Up button"
                    className="mb-2 w-full py-4 bg-webriq-blue hover:bg-webriq-darkblue rounded text-sm font-bold text-gray-50 transition duration-200"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <span className="text-gray-400 text-xs">
                    <span>Already have an account?</span>
                    <a
                      className="text-webriq-darkblue hover:underline"
                      target={signInLink?.linkTarget}
                      rel={
                        signInLink?.linkTarget === "_blank"
                          ? "noopener noreferrer"
                          : null
                      }
                      href={
                        signInLink?.type === "linkExternal"
                          ? signInLink?.externalLink
                          : signInLink?.type === "linkInternal"
                          ? signInLink?.internalLink === "Home" ||
                            signInLink?.internalLink === "home"
                            ? "/"
                            : signInLink?.internalLink
                          : "page-not-found"
                      }
                    >
                      &nbsp;{signInLink?.label}
                    </a>
                  </span>
                </div>
              )}
            </WebriQForm>
          </div>
          {links &&
            (links.length > 1 ? (
              <p className="mt-16 text-xs text-center text-gray-400">
                {links?.[0] && (
                  <a
                    className="underline hover:text-gray-500"
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
                &nbsp;and&nbsp;
                {links?.[1] && (
                  <a
                    className="underline hover:text-gray-500"
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
              <p className="mt-16 text-xs text-center text-gray-400">
                {links?.[0] && (
                  <a
                    className="underline hover:text-gray-500"
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
    </section>
  );
}
export default React.memo(VariantA);
