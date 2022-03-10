import { urlFor } from "lib/sanity";
import React from "react";
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
  formLinks,
  signInLink,
}) {
  let logoLink;
  const [showPassword, setShowPassword] = React.useState(false);

  if (logo.type === "linkInternal") {
    if (logo.internalLink === undefined) {
      logoLink = `/`;
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
    <section className="py-20 px-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="mb-16 lg:mb-0 max-w-2xl lg:w-1/2 px-4">
            {logo?.image && (
              <Link href={logoLink}>
                <a
                  aria-label={
                    logoLink === "/" ? "Go to home page" : `Go to ${logoLink}`
                  }
                  className="mb-10 inline-block text-3xl font-bold leading-none"
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
                      {formFields?.slice(0, 2)?.map((formFields, index) => (
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
                            />
                          ) : formFields.type === "inputFile" ? (
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                aria-label={formFields?.name}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder={
                                  formFields?.name ?? "Choose file.."
                                }
                                name={formFields?.name}
                              />
                            </label>
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
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    {formFields?.slice(2, 4)?.map((formFields, index) => (
                      <div key={index}>
                        {formFields?.type === "textarea" ? (
                          <textarea
                            aria-label={`${formFields?.name} text area`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            placeholder={formFields?.name}
                            name={formFields?.name}
                          />
                        ) : formFields?.type === "inputFile" ? (
                          <div className="mb-3">
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                aria-label="Add file"
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="file"
                                placeholder={
                                  formFields?.name ?? "Choose file.."
                                }
                                name={formFields?.name}
                              />
                            </label>
                          </div>
                        ) : formFields?.type === "inputPassword" ? (
                          <div className="mb-4 flex p-4 bg-gray-100 rounded">
                            <input
                              aria-label={formFields?.type}
                              className="w-full text-xs bg-gray-100 outline-none"
                              type={showPassword ? "text" : "password"}
                              placeholder={formFields?.name}
                              name={formFields?.name}
                            />
                            {/* SVG icon on the right of the password input field */}
                            <button
                              aria-label={
                                showPassword ? "Show password" : "Hide password"
                              }
                              className="focus:outline-none"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <svg
                                  className="h-5 w-5 ml-4 my-auto text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                  role="img"
                                  width="1em"
                                  height="1em"
                                  preserveAspectRatio="xMidYMid meet"
                                  viewBox="0 0 16 16"
                                >
                                  <g fill="currentColor">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z" />
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  className="h-5 w-5 ml-4 my-auto text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                  role="img"
                                  width="1em"
                                  height="1em"
                                  preserveAspectRatio="xMidYMid meet"
                                  viewBox="0 0 16 16"
                                >
                                  <g fill="currentColor">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0z" />
                                  </g>
                                </svg>
                              )}
                            </button>
                          </div>
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
                                formFields?.type === "inputEmail"
                                  ? "email"
                                  : "text"
                              }
                              placeholder={formFields?.name}
                              name={formFields?.name}
                            />
                            {/* SVG icon on the right of the email input field */}
                            {formFields?.type === "inputEmail" && (
                              <svg
                                className="h-6 w-6 ml-4 my-auto text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
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
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
