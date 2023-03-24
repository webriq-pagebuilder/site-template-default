import React from "react";
import Link from "next/link";
import WebriQForm from "components/webriq-form";
import { urlFor } from "lib/sanity";
import { logoLink, thankYouPageLink, ConditionalBtnOrLink } from "helper";

function VariantA({ logo, form, formLinks, signInLink }) {
  return (
    <section className="py-10 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-10">
            {logo?.image && (
              <Link
                aria-label={`Go to ${
                  logoLink() === "/" ? "home page" : logoLink()
                }`}
                className="text-3xl mx-auto font-bold leading-none flex justify-center" 
                href={logoLink()}
              >
                <img
                  className="h-12"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "signUp-logo"}
                />
              </Link>
            )}
          </div>
          <div className="mb-6 lg:mb-10 text-center">
            <div className="mb-6">
              <span className="text-gray-500">{form?.subtitle}</span>
              <h1 className="text-2xl font-bold">{form?.name}</h1>
            </div>
            {form?.fields && (
              <WebriQForm
                method="POST"
                data-form-id={form?.id}
                name="SignUp-VariantA-Form"
                className="form-signup"
                data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                <div className="flex flex-wrap -mx-2">
                  {form?.fields?.slice(0, 2)?.map((formFields, index) => (
                    <div className="mb-3 w-full lg:w-1/2 px-2" key={index}>
                      <FormFields fields={formFields} />
                    </div>
                  ))}
                </div>
                {form?.fields?.slice(2)?.map((formFields, index) => (
                  <div key={index}>
                    <FormFields fields={formFields} />
                  </div>
                ))}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                <div className="text-center">
                  {form?.buttonLabel && (
                    <button
                      aria-label={form?.buttonLabel ?? "Sign Up form submit button"}
                      className="mb-2 w-full py-4 bg-webriq-darkblue hover:bg-webriq-blue rounded text-sm font-bold text-gray-50 transition duration-200"
                      type="submit"
                    >
                      {form?.buttonLabel}
                    </button>
                  )}
                  {signInLink?.label && (
                    <span className="text-gray-500 text-xs">
                      <span>Already have an account?</span>{" "}
                      <ConditionalBtnOrLink value={signInLink} style="text-webriq-darkblue hover:underline" />
                    </span>
                  )}
                </div>
              </WebriQForm>
            )}
          </div>
          {formLinks && (
            <p className="mt-16 text-xs text-center text-gray-700">
              {formLinks?.map((link, index, { length }) => (
                <span key={index}>
                  <ConditionalBtnOrLink value={link} style={link?.type === "linkInternal" ? "underline hover:text-gray-500" : "text-webriq-darkblue hover:underline"}/>
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

/**
 * 
 * @param {fields} 
 * @returns input fields according to type
 */
function FormFields({ fields }) {
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
  
  if(fields?.type === "textarea") {
    return (
      <textarea
        aria-label={`${fields?.name} text area`}
        className="w-full p-4 text-xs bg-white outline-none rounded"
        type="text"
        placeholder={fields?.name}
        name={fields?.name}
        required={fields?.isRequired}
      />
    )
  } else if(fields?.type === "inputFile") {
    return (
      <label className="flex px-2 bg-white rounded">
        <input
          aria-label="Add file"
          className="w-full p-4 text-xs bg-white outline-none rounded"
          type="file"
          placeholder={fields?.placeholder ?? "Choose file.."}
          name={fields?.name}
          required={fields?.isRequired}
        />
      </label>
    )
  } else if(fields?.type === "inputPassword") {
    return (
      <div className="mb-4 flex p-4 bg-white rounded">
        <input
          aria-label={fields?.type}
          className="w-full text-xs bg-white outline-none"
          type={showPassword ? "text" : "password"}
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
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
    )
  } else if(fields?.type === "inputNumber") {
    return (
      <div className="mb-4 flex p-4 bg-white rounded">
        <input
          aria-label={fields?.name}
          className="w-full text-xs bg-white outline-none"
          type="number"
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
      </div>
    )
  } else if(fields?.type === "inputSelect") {
    return (
      <div className="mb-4 flex">
        <label
          className="text-left text-xs bg-white m-auto"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <select
          className="p-3 w-full text-xs bg-white outline-none rounded"
          name={`header-${fields?.name}`}
          defaultValue={"default-value"}
          required={fields?.isRequired}
        >
          <option name="default-value" value=""></option>
          {fields?.items?.map((item, index) => (
            <option
              key={index}
              name={fields?.name}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    )
  } else if(fields?.type === "inputRadio") {
    return (
      <div className="mb-4 text-left">
        <label
          className="text-left text-xs text-gray-500 m-auto"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <div>
          {fields?.items?.map((item, index) => (
            <label
              className="text-xs text-gray-500 mr-4"
              key={index}
            >
              <input
                className="mr-2"
                name={fields?.name}
                value={item}
                type="radio"
                onChange={handleRadioChange}
                checked={value === item}
                required={fields?.isRequired}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    )
  } else if(fields?.type === "inputCheckbox") {
    return (
      <div className="mb-4 text-left">
        <label
          className="text-left text-xs text-gray-500 m-auto"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <div>
          {fields?.items?.map((item, index) => (
            <label
              className="text-xs text-gray-500 mr-4"
              key={index}
            >
              <input
                className="mr-2"
                name={fields?.name}
                value={item}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={checked.some((v) => v === item)}
                required={
                  fields?.isRequired &&
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
    )
  } else {
    return (
      <div className="mb-4 flex p-4 bg-white rounded">
        <input
          aria-label={`${
            fields?.type === "inputText"
              ? `Input ${fields?.name}`
              : `${fields?.type}`
          }`}
          className="w-full text-xs bg-white outline-none"
          type={
            fields?.type === "inputEmail"
              ? "email"
              : "text"
          }
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
        {/* SVG icon on the right of the email input field */}
        {fields?.type === "inputEmail" && (
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
    )
  }
};

export default React.memo(VariantA);
