import React from "react";
import Link from "next/link";
import WebriQForm from "component/webriq-form";
import { urlFor } from "lib/sanity";

function VariantB({ logo, form, formLinks, signInLink }) {
  let logoLink;
  const { id, name, subtitle, fields, buttonLabel } = form;
  const [showPassword, setShowPassword] = React.useState(false); // show or hide password field value
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
    <section className="py-10 lg:py-20 bg-webriq-darkblue">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="mb-10">
            {logo?.image && (
              <Link href={logoLink}>
                <a
                  aria-label={`Go to ${
                    logoLink === "/" ? "home page" : logoLink
                  }`}
                  className="text-white text-3xl font-bold leading-none  flex justify-center"
                >
                  <img
                    className="h-12"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "signUp-logo"}
                  />
                </a>
              </Link>
            )}
          </div>
          <div className="mb-6 lg:mb-10 p-6 lg:p-12 bg-white shadow-md rounded">
            <div className="mb-6">
              <span className="text-gray-500">{subtitle}</span>
              <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <WebriQForm
              method="POST"
              data-form-id={id}
              name="SignUp-VariantB-Form"
              className="form-signup"
              data-thankyou-url="/thank-you"
              scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
            >
              <div className="flex flex-wrap -mx-2">
                {fields?.slice(0, 2)?.map((formFields, index) => (
                  <div className="mb-3 w-full lg:w-1/2 px-2" key={index}>
                    {formFields?.type === "textarea" ? (
                      <textarea
                        aria-label={`${formFields?.name} text area`}
                        className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                        type="text"
                        placeholder={formFields?.name}
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
                    ) : formFields?.type === "inputNumber" ? (
                      <input
                        aria-label={formFields?.name}
                        className="mb-4 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                        type="number"
                        placeholder={formFields?.name}
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
                          name={formFields?.name}
                          id={formFields?.name}
                          defaultValue={"default-value"}
                          required={formFields?.isRequired}
                        >
                          <option name="default-value" value=""></option>
                          {formFields?.items?.map((item, index) => (
                            <option key={index} name={item} value={item}>
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
                                id={item?.name}
                                className="mr-2"
                                name={item}
                                value={item}
                                type="radio"
                                onChange={handleRadioChange}
                                checked={value === item}
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
                                id={item}
                                className="mr-2"
                                name={item}
                                value={item}
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                checked={checked.some((v) => v === item)}
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
                      type="text"
                      placeholder={formFields?.name}
                      name={formFields?.name}
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
                        placeholder={formFields?.name}
                        name={formFields?.name}
                        required={formFields?.isRequired}
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
                  ) : formFields?.type === "inputNumber" ? (
                    <div className="mb-4 p-4 bg-gray-100 rounded">
                      <input
                        aria-label={formFields?.name}
                        className="w-full text-xs bg-gray-100 outline-none"
                        type="number"
                        placeholder={formFields?.name}
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
                        name={formFields?.name}
                        id={formFields?.name}
                        defaultValue={"default-value"}
                        required={formFields?.isRequired}
                      >
                        <option name="default-value" value=""></option>
                        {formFields?.items?.map((item, index) => (
                          <option key={index} name={item} value={item}>
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
                              id={item}
                              className="mr-2"
                              name={item}
                              value={item}
                              type="radio"
                              onChange={handleRadioChange}
                              checked={value === item}
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
                              id={item}
                              className="mr-2"
                              name={item}
                              value={item}
                              type="checkbox"
                              onChange={handleCheckboxChange}
                              checked={checked.some((v) => v === item)}
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
                          formFields?.type === "inputEmail" ? "email" : "text"
                        }
                        placeholder={formFields?.name}
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
                    aria-label={buttonLabel ?? "Sign Up form submit button"}
                    className="mb-2 w-full py-4 bg-webriq-darkblue hover:bg-webriq-blue rounded text-sm font-bold text-gray-50 transition duration-200"
                    type="submit"
                  >
                    {buttonLabel}
                  </button>
                )}
                {signInLink?.label && (
                  <span className="text-gray-900 text-xs">
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
                          aria-label={`${signInLink?.label ?? "Sign in"} link`}
                          className="text-webriq-darkblue hover:underline"
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
                        aria-label={`${signInLink?.label ?? "Sign in"} link`}
                        className="text-webriq-darkblue hover:underline"
                        target={signInLink?.linkTarget}
                        href={`${
                          signInLink?.externalLink === undefined
                            ? "link-not-found"
                            : signInLink?.externalLink
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
                  </span>
                )}
              </div>
            </WebriQForm>
          </div>
          {formLinks && (
            <p className="text-xs text-center text-webriq-lightblue">
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
                        aria-label={`${signInLink?.label ?? "Sign in"} link`}
                        className="underline hover:text-gray-500"
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
                      aria-label={`${signInLink?.label ?? "Sign in"} link`}
                      className="underline hover:text-gray-500"
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
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
