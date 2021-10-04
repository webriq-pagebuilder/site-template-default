import React from "react";
import WebriQForm from "@webriq/gatsby-webriq-form";
import PortableText from "@sanity/block-content-to-react";

function VariantA({
  contactDescription,
  officeInformation,
  contactEmail,
  socialLinks,
  formFields,
  formId,
  formName,
  button,
  block,
}) {
  const serializers = {
    marks: {
      internalLink: ({ children, mark }) => (
        <a
          aria-label={children ?? "internal link"}
          style={{ color: "red" }}
          href={mark.slug.current}
        >
          {children}
        </a>
      ),
      link: ({ children, mark }) =>
        mark.blank ? (
          <a
            aria-label={children ?? "external link"}
            href={mark.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ) : (
          <a
            aria-label={children ?? "external link"}
            style={{ color: "blue" }}
            href={mark.href}
          >
            {children}
          </a>
        ),
    },
  };

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          {contactDescription && (
            <div className="mb-12 pl-10">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                Contact
              </h1>
              <p className="mt-5 text-gray-700 leading-loose">
                {contactDescription}
              </p>
            </div>
          )}
          <div className="flex flex-wrap">
            <div className="pl-10 w-full lg:w-1/2 mb-16 lg:mb-0">
              <div className="flex flex-wrap">
                {officeInformation && (
                  <div className="mb-12 pr-10 w-full md:w-1/2 lg:w-1/2">
                    <h2 className="mb-5 text-3xl lg:text-4xl font-bold">
                      Office
                    </h2>
                    <p className="text-gray-700">{officeInformation}</p>
                  </div>
                )}
                {contactEmail && (
                  <div className="mb-12 px-10 w-full md:w-1/2">
                    <h2 className="mb-5 text-3xl lg:text-4xl font-bold">
                      Contacts
                    </h2>
                    <p className="text-gray-700">{contactEmail}</p>
                  </div>
                )}
                {socialLinks && (
                  <div className="w-full md:w-1/3 lg:w-full">
                    <h2 className="mb-5 text-3xl lg:text-4xl font-bold">
                      Socials
                    </h2>
                    <div className="mb-4 lg:mb-0 order-first lg:order-last">
                      {socialLinks?.fbLink && (
                        <a
                          aria-label="Facebook link icon"
                          className="inline-block mr-5 bg-gray-50 hover:bg-gray-100 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={socialLinks?.fbLink}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0045d8"
                              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                            />
                          </svg>
                        </a>
                      )}
                      {socialLinks?.twitterLink && (
                        <a
                          aria-label="Twitter link icon"
                          className="inline-block mr-5 bg-gray-50 hover:bg-gray-100 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={socialLinks?.twitterLink}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0045d8"
                              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                            />
                          </svg>
                        </a>
                      )}
                      {socialLinks?.instagramLink && (
                        <a
                          aria-label="Instagram link icon"
                          className="inline-block mr-2 bg-gray-50 hover:bg-gray-100 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={socialLinks?.instagramLink}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0045d8"
                              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pl-10 w-full lg:w-1/2">
              {formFields && (
                <div className="max-w-md lg:mx-auto">
                  <WebriQForm
                    method="POST"
                    data-form-id={formId}
                    name={formName}
                    className="form-contacts"
                    data-thankyou-url="/thank-you"
                    scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                  >
                    {/* <div className="mb-4 text-sm">
                      <span className="mr-4 font-semibold">Department:</span>
                      <label className="mr-4">
                        <input
                          className="mr-1"
                          type="radio"
                          name="department"
                          defaultValue={1}
                          defaultChecked
                        />
                        <span>Support</span>
                      </label>
                      <label>
                        <input
                          className="mr-1"
                          type="radio"
                          name="department"
                          defaultValue={2}
                        />
                        <span>Sales</span>
                      </label>
                    </div> */}
                    {formFields?.[0] &&
                      formFields[0]?.name &&
                      (formFields[0].type === "textarea" ? (
                        <div className="mb-4">
                          <textarea
                            aria-label={`${formFields[0]?.name} text area`}
                            className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                            type="text"
                            placeholder={formFields[0]?.name}
                            name={formFields[0]?.name}
                          />
                        </div>
                      ) : formFields[0].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-white rounded">
                            <input
                              aria-label="Add file"
                              className="hidden"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[0]?.name}
                            />
                            <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                              Browse
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <input
                            aria-label={`${
                              formFields[0]?.type === "inputText"
                                ? `Input ${formFields[0]?.name}`
                                : `${formFields[0]?.type}`
                            }`}
                            className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
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
                        </div>
                      ))}
                    {formFields?.[1] &&
                      formFields[1]?.name &&
                      (formFields[1].type === "textarea" ? (
                        <div className="mb-4">
                          <textarea
                            aria-label={`${formFields[1]?.name} text area`}
                            className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                            type="text"
                            placeholder={formFields[1]?.name}
                            name={formFields[1]?.name}
                          />
                        </div>
                      ) : formFields[1].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-white rounded">
                            <input
                              aria-label="Add file"
                              className="hidden"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[1]?.name}
                            />
                            <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                              Browse
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <input
                            aria-label={`${
                              formFields[1]?.type === "inputText"
                                ? `Input ${formFields[1]?.name}`
                                : `${formFields[1]?.type}`
                            }`}
                            className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
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
                        </div>
                      ))}
                    {formFields?.[2] &&
                      formFields[2]?.name &&
                      (formFields[2].type === "textarea" ? (
                        <div className="mb-4">
                          <textarea
                            aria-label={`${formFields[2]?.name} text area`}
                            className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                            type="text"
                            placeholder={formFields[2]?.name}
                            name={formFields[2]?.name}
                          />
                        </div>
                      ) : formFields[2].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-white rounded">
                            <input
                              aria-label="Add file"
                              className="hidden"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[2]?.name}
                            />
                            <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                              Browse
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <input
                            aria-label={`${
                              formFields[2]?.type === "inputText"
                                ? `Input ${formFields[2]?.name}`
                                : `${formFields[2]?.type}`
                            }`}
                            className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
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
                        </div>
                      ))}
                    {formFields?.[3] &&
                      formFields[3]?.name &&
                      (formFields[3].type === "textarea" ? (
                        <div className="mb-4">
                          <textarea
                            aria-label={`${formFields[3]?.name} text area`}
                            className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                            type="text"
                            placeholder={formFields[3]?.name}
                            name={formFields[3]?.name}
                          />
                        </div>
                      ) : formFields[3].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-white rounded">
                            <input
                              aria-label="Add file"
                              className="hidden"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[3]?.name}
                            />
                            <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                              Browse
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <input
                            aria-label={`${
                              formFields[3]?.type === "inputText"
                                ? `Input ${formFields[3]?.name}`
                                : `${formFields[3]?.type}`
                            }`}
                            className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
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
                        </div>
                      ))}
                    {formFields?.[4] &&
                      formFields[4]?.name &&
                      (formFields[4].type === "textarea" ? (
                        <div className="mb-4">
                          <textarea
                            aria-label={`${formFields[4]?.name} text area`}
                            className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                            type="text"
                            placeholder={formFields[4]?.name}
                            name={formFields[4]?.name}
                          />
                        </div>
                      ) : formFields[4].type === "inputFile" ? (
                        <div className="mb-4">
                          <label className="flex px-2 bg-white rounded">
                            <input
                              aria-label="Add file"
                              className="hidden"
                              type="file"
                              placeholder="Choose file.."
                              name={formFields[4]?.name}
                            />
                            <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                              Browse
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <input
                            aria-label={`${
                              formFields[4]?.type === "inputText"
                                ? `Input ${formFields[4]?.name}`
                                : `${formFields[4]?.type}`
                            }`}
                            className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
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
                        </div>
                      ))}
                    <div className="flex justify-between items-center">
                      {block && (
                        <div className="inline-flex">
                          <input
                            aria-label={`Agree to ${block}?`}
                            className="mr-2 mt-1"
                            type="checkbox"
                            id="terms"
                            name="terms"
                            defaultValue={1}
                          />
                          <span className="text-sm font-semibold">
                            <PortableText
                              blocks={block}
                              serializers={serializers}
                            />
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="webriq-recaptcha" />
                      </div>
                      {button && (
                        <button
                          aria-label="Submit Contact Form button"
                          className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-200"
                          type="submit"
                        >
                          Get Started
                        </button>
                      )}
                    </div>
                  </WebriQForm>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
