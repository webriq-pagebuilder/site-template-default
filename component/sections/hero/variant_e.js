import React from "react";
import Link from "next/link";
import WebriQForm from "component/webriq-form";

function VariantE({
  template,
  title,
  description,
  primaryButton,
  secondaryButton,
  formLinks,
  form,
}) {
  const { id, name, subtitle, fields, buttonLabel, thankYouPage } = form;
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState(null); // setting selected value for input field radio type
  const [checked, setChecked] = React.useState([]); // setting selected value for input field checkbox type

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;

    setChecked((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const thankYouPageLink = (link) => {
    if (link === undefined) {
      return "/thank-you";
    } else {
      if (link?.linkType === "linkInternal") {
        return `/${link.internalLink}`;
      } else {
        return link.externalLink;
      }
    }
  };

  return (
    <section className="relative bg-gray-100 px-10">
      <div className="relative py-20">
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
                  <p className="mb-6 text-gray-500 leading-loose">
                    {description}
                  </p>
                  <div>
                    {primaryButton?.label &&
                      (primaryButton?.type === "linkInternal" ? (
                        <Link
                          href={
                            primaryButton?.internalLink === "Home" ||
                            primaryButton?.internalLink === "home"
                              ? "/"
                              : `/${
                                  primaryButton?.internalLink === undefined
                                    ? "page-not-found"
                                    : primaryButton?.internalLink
                                }`
                          }
                        >
                          <a
                            aria-label={`Header ${
                              primaryButton?.label ?? "Primary"
                            } button which directs to ${
                              primaryButton?.internalLink === undefined
                                ? "page-not-found"
                                : primaryButton?.internalLink
                            }`}
                            className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                            target={primaryButton?.linkTarget}
                            rel={
                              primaryButton?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {primaryButton?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Header ${
                            primaryButton?.label ?? "Primary"
                          } button which directs to ${
                            primaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : primaryButton?.externalLink
                          }`}
                          className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                          target={primaryButton?.linkTarget}
                          href={`${
                            primaryButton.externalLink === undefined
                              ? "link-not-found"
                              : primaryButton.externalLink
                          }`}
                          rel={
                            primaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                        >
                          {primaryButton?.label}
                        </a>
                      ))}
                    {secondaryButton?.label &&
                      (secondaryButton?.type === "linkInternal" ? (
                        <Link
                          href={
                            secondaryButton?.internalLink === "Home" ||
                            secondaryButton?.internalLink === "home"
                              ? "/"
                              : `/${
                                  secondaryButton?.internalLink === undefined
                                    ? "page-not-found"
                                    : secondaryButton?.internalLink
                                }`
                          }
                        >
                          <a
                            aria-label={`Header ${
                              secondaryButton?.label ?? "Secondary"
                            } button which directs to ${
                              secondaryButton?.internalLink === undefined
                                ? "page-not-found"
                                : secondaryButton?.internalLink
                            }`}
                            className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                            target={secondaryButton?.linkTarget}
                            rel={
                              secondaryButton?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {secondaryButton?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Header ${
                            secondaryButton?.label ?? "Secondary"
                          } button which directs to ${
                            secondaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : secondaryButton?.externalLink
                          }`}
                          className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                          target={secondaryButton?.linkTarget}
                          href={`${
                            secondaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : secondaryButton?.externalLink
                          }`}
                          rel={
                            secondaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                        >
                          {secondaryButton?.label}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="max-w-sm text-center mx-auto">
                {fields && (
                  <div className="mb-4 px-6 py-8 bg-white rounded-xl shadow-md">
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">{subtitle}</span>
                      <p className="text-2xl font-bold">{name}</p>
                    </div>
                    <WebriQForm
                      method="POST"
                      data-form-id={id}
                      name="Header-VariantE-Form"
                      className="form-header"
                      data-thankyou-url={thankYouPageLink(thankYouPage)}
                      scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                    >
                      <div className="flex flex-wrap -mx-2">
                        {fields?.slice(0, 2)?.map((formFields, index) => (
                          <div
                            className="mb-3 w-full lg:w-1/2 px-2"
                            key={index}
                          >
                            {formFields.type === "textarea" ? (
                              <textarea
                                aria-label={`${formFields?.name} text area`}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="text"
                                placeholder={formFields?.placeholder}
                                name={formFields?.name}
                                required={formFields?.isRequired}
                              />
                            ) : formFields?.type === "inputFile" ? (
                              <label className="flex px-2 bg-gray-100 rounded">
                                <input
                                  aria-label="Add file"
                                  className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                  type="file"
                                  placeholder="Choose file.."
                                  name={formFields?.name}
                                  required={formFields?.isRequired}
                                />
                              </label>
                            ) : formFields.type === "inputNumber" ? (
                              <input
                                aria-label={formFields?.name}
                                className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                type="number"
                                placeholder={formFields?.placeholder}
                                name={formFields?.name}
                                required={formFields?.isRequired}
                              />
                            ) : formFields.type === "inputSelect" ? (
                              <div className="mb-4 flex">
                                <label
                                  className="text-left text-xs text-gray-500 m-auto"
                                  htmlFor={formFields?.name}
                                >
                                  {formFields?.label}
                                </label>
                                <select
                                  className="p-3 w-full text-xs bg-gray-100 outline-none rounded"
                                  name={`header-${formFields?.name}`}
                                  defaultValue={"default-value"}
                                  required={formFields?.isRequired}
                                >
                                  <option
                                    name="default-value"
                                    value=""
                                  ></option>
                                  {formFields?.items?.map((item, index) => (
                                    <option
                                      key={index}
                                      name={formFields?.name}
                                      value={item}
                                    >
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : formFields?.type === "inputRadio" ? (
                              <div className="mb-4 text-left">
                                <label
                                  className="text-left text-xs text-gray-500 m-auto"
                                  htmlFor={formFields?.name}
                                >
                                  {formFields?.label}
                                </label>
                                <div>
                                  {formFields?.items?.map((item, index) => (
                                    <label
                                      className="text-xs text-gray-500 mr-4"
                                      key={index}
                                    >
                                      <input
                                        className="mr-2"
                                        name={formFields?.name}
                                        value={item}
                                        type="radio"
                                        onChange={handleRadioChange}
                                        checked={value === item}
                                        required={formFields?.isRequired}
                                      />
                                      {item}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ) : formFields?.type === "inputCheckbox" ? (
                              <div className="mb-4 text-left">
                                <label
                                  className="text-left text-xs text-gray-500 m-auto"
                                  htmlFor={formFields?.name}
                                >
                                  {formFields?.label}
                                </label>
                                <div>
                                  {formFields?.items?.map((item, index) => (
                                    <label
                                      className="text-xs text-gray-500 mr-4"
                                      key={index}
                                    >
                                      <input
                                        className="mr-2"
                                        name={formFields?.name}
                                        value={item}
                                        type="checkbox"
                                        onChange={handleCheckboxChange}
                                        checked={checked.some(
                                          (v) => v === item
                                        )}
                                        required={
                                          formFields?.isRequired &&
                                          checked.length === 0
                                            ? true
                                            : false
                                        }
                                      />
                                      {item}
                                    </label>
                                  ))}
                                </div>
                              </div>
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
                                placeholder={formFields?.placeholder}
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
                              aria-label={`${formFields[2]?.name} text area`}
                              className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              type="text"
                              placeholder={formFields[2]?.name}
                              name={formFields[2]?.name}
                              required={formFields?.isRequired}
                            />
                          ) : formFields?.type === "inputFile" ? (
                            <div className="mb-4">
                              <label className="flex px-2 bg-gray-100 rounded">
                                <input
                                  aria-label="Add file"
                                  className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                                  type="file"
                                  placeholder="Choose file.."
                                  name={formFields?.name}
                                  required={formFields?.isRequired}
                                />
                              </label>
                            </div>
                          ) : formFields?.type === "inputPassword" ? (
                            <div className="mb-4 flex p-4 bg-gray-100 rounded">
                              <input
                                aria-label={formFields?.type}
                                className="w-full text-xs bg-gray-100 outline-none"
                                type={showPassword ? "text" : "password"}
                                placeholder={formFields?.placeholder}
                                name={formFields?.name}
                                required={formFields?.isRequired}
                              />
                              {/* SVG icon on the right of the password input field */}
                              <button
                                aria-label={
                                  showPassword
                                    ? "Show password"
                                    : "Hide password"
                                }
                                className="focus:outline-none"
                                type="button"
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
                          ) : formFields.type === "inputNumber" ? (
                            <div className="mb-4 flex p-4 bg-gray-100 rounded">
                              <input
                                aria-label={formFields?.name}
                                className="w-full text-xs bg-gray-100 outline-none"
                                type="number"
                                placeholder={formFields?.placeholder}
                                name={formFields?.name}
                                required={formFields?.isRequired}
                              />
                            </div>
                          ) : formFields.type === "inputSelect" ? (
                            <div className="mb-4 flex">
                              <label
                                className="text-left text-xs text-gray-500 m-auto"
                                htmlFor={formFields?.name}
                              >
                                {formFields?.label}
                              </label>
                              <select
                                className="p-3 w-full text-xs bg-gray-100 outline-none rounded"
                                name={`header-${formFields?.name}`}
                                defaultValue={"default-value"}
                                required={formFields?.isRequired}
                              >
                                <option name="default-value" value=""></option>
                                {formFields?.items?.map((item, index) => (
                                  <option
                                    key={index}
                                    name={formFields?.name}
                                    value={item}
                                  >
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : formFields?.type === "inputRadio" ? (
                            <div className="mb-4 text-left">
                              <label
                                className="text-left text-xs text-gray-500 m-auto"
                                htmlFor={formFields?.name}
                              >
                                {formFields?.label}
                              </label>
                              <div>
                                {formFields?.items?.map((item, index) => (
                                  <label
                                    className="text-xs text-gray-500 mr-4"
                                    key={index}
                                  >
                                    <input
                                      className="mr-2"
                                      name={formFields?.name}
                                      value={item}
                                      type="radio"
                                      onChange={handleRadioChange}
                                      checked={value === item}
                                      required={formFields?.isRequired}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>
                            </div>
                          ) : formFields?.type === "inputCheckbox" ? (
                            <div className="mb-4 text-left">
                              <label
                                className="text-left text-xs text-gray-500 m-auto"
                                htmlFor={formFields?.name}
                              >
                                {formFields?.label}
                              </label>
                              <div>
                                {formFields?.items?.map((item, index) => (
                                  <label
                                    className="text-xs text-gray-500 mr-4"
                                    key={index}
                                  >
                                    <input
                                      className="mr-2"
                                      name={formFields?.name}
                                      value={item}
                                      type="checkbox"
                                      onChange={handleCheckboxChange}
                                      checked={checked.some((v) => v === item)}
                                      required={
                                        formFields?.isRequired &&
                                        checked.length === 0
                                          ? true
                                          : false
                                      }
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>
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
                                placeholder={formFields?.placeholder}
                                name={formFields?.name}
                                required={formFields?.isRequired}
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
                      <div className="text-center">
                        {buttonLabel && (
                          <button
                            aria-label={
                              buttonLabel ?? "Header form submit button"
                            }
                            className="mb-2 w-full py-4 bg-webriq-darkblue hover:bg-webriq-blue rounded text-sm font-bold text-gray-50 transition duration-200"
                            type="submit"
                          >
                            {buttonLabel}
                          </button>
                        )}
                      </div>
                    </WebriQForm>
                  </div>
                )}
                {formLinks && (
                  <div className="text-xs text-gray-500">
                    {formLinks?.map((link, index, { length }) => (
                      <span key={index}>
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
                              aria-label={`Header ${
                                link?.label ?? "Terms and Policies"
                              } links which directs to ${
                                link?.internalLink === undefined
                                  ? "page-not-found"
                                  : link?.internalLink
                              }`}
                              className="underline text-webriq-darkblue hover:text-webriq-blue"
                              target={
                                link?.linkTarget === "_blank" ? "_blank" : null
                              }
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
                            aria-label={`Header ${
                              link?.label ?? "Terms and Policies"
                            } links which directs to ${
                              link?.externalLink === undefined
                                ? "link-not-found"
                                : link?.externalLink
                            }`}
                            className="underline text-webriq-darkblue hover:text-webriq-blue"
                            target={
                              link?.linkTarget === "_blank" ? "_blank" : null
                            }
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
                      </span>
                    ))}
                  </div>
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
