import { urlFor } from "lib/sanity";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import WebriQForm from "component/webriq-form";

function VariantD({
  logo,
  title,
  text,
  button,
  formFields,
  formId,
  formName,
  links,
  signInLink,
}) {
  return (
    <section className="py-20 px-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="mb-16 lg:mb-0 max-w-2xl lg:w-1/2 px-4">
            {logo?.image && (
              <Link href="/">
                <a
                  aria-label="Call to Action logo"
                  className="mb-10 inline-block text-3xl font-bold leading-none"
                >
                  <Image
                    src={urlFor(logo?.image)}
                    layout="fixed"
                    width="48px"
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
            <p className="mb-8 text-gray-700 leading-loose">{text}</p>
            {button && button?.type === "linkInternal" ? (
              <Link
                href={
                  button?.internalLink === "Home" ||
                  button?.internalLink === "home"
                    ? "/"
                    : `/${
                        button.internalLink === undefined
                          ? "page-not-found"
                          : button.internalLink
                      }`
                }
              >
                <a
                  aria-label={`Call to action ${
                    button?.label ?? "primary"
                  } button which directs to ${
                    button?.internalLink === undefined
                      ? "page-not-found"
                      : button?.internalLink
                  }`}
                  className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-250 rounded-l-xl rounded-t-xl"
                  target={button?.linkTarget}
                  rel={
                    button?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {button?.label}
                </a>
              </Link>
            ) : (
              <a
                aria-label={`Call to action ${
                  button?.label ?? "primary"
                } button which directs to ${
                  button?.externalLink === undefined
                    ? "link-not-found"
                    : button?.externalLink
                }`}
                className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-250 rounded-l-xl rounded-t-xl"
                target={button?.linkTarget}
                href={`${
                  button?.externalLink === undefined
                    ? "link-not-found"
                    : button?.externalLink
                }`}
                rel={
                  button?.linkTarget === "_blank" ? "noopener noreferrer" : null
                }
              >
                {button?.label}
              </a>
            )}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="max-w-sm mx-auto lg:mr-0 lg:ml-auto">
              {formFields && (
                <div className="mb-6 py-8 px-6 bg-white shadow rounded-t-3xl rounded-bl-3xl text-center">
                  <WebriQForm
                    method="POST"
                    data-form-id={formId}
                    name={formName}
                    className="form-callToAction"
                    data-thankyou-url="/thank-you"
                    scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                  >
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">Sign Up</span>
                      <p className="text-2xl">Create an account</p>
                    </div>
                    <div className="mb-3 flex flex-wrap -mx-2">
                      {formFields?.[0] && formFields[0]?.name && (
                        <div className="w-full lg:w-1/2 px-2">
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
                        <div className="w-full lg:w-1/2 px-2">
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
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                          aria-label={`${formFields[0]?.name} text area`}
                          className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                          type="text"
                          placeholder={formFields[4]?.name}
                          name={formFields[4]?.name}
                        />
                      ) : formFields[4].type === "inputFile" ? (
                        <div className="mb-3">
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
                    <button
                      aria-label="Call to Action Sign Up button"
                      className="mb-4 py-4 w-full rounded text-sm bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-normal transition duration-200"
                      type="submit"
                    >
                      Sign Up
                    </button>
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
              {links && (
                <div className="flex justify-center items-center text-gray-500">
                  {links?.map((link, index, { length }) => (
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
                      {index + 1 !== length ? (
                        <span>&nbsp;and&nbsp;</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
