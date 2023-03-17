import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink, ConditionalBtnOrLink } from "helper";


function VariantE({ form, formLinks, signInLink }) {
  return (
    <section className="py-20 px-5 sm:px-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="sm:max-w-md mx-auto">
          {form?.fields && (
            <div className="mb-6 py-8 px-6 bg-white shadow rounded-t-3xl rounded-bl-3xl text-center">
              <WebriQForm
                method="POST"
                data-form-id={form?.id}
                name="Calltoaction-VariantE-Form"
                className="form-callToAction"
                data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                <div className="mb-6">
                  <span className="text-sm text-gray-500">{form?.subtitle}</span>
                  <p className="text-2xl">{form?.name}</p>
                </div>
                <div className="mb-3 flex flex-wrap -mx-2">
                  {form?.fields?.slice(0, 2)?.map((formFields, index) => (
                    <div
                      className="w-full lg:w-1/2 px-2 mb-3 lg:mb-0 xl:mb-0 2xl:mb-0"
                      key={index}
                    >
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
                {form?.buttonLabel && (
                  <button
                    aria-label={
                      form?.buttonLabel ?? "Call to action form submit button"
                    }
                    className="mb-4 py-4 w-full rounded text-sm bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-normal transition duration-200"
                    type="submit"
                  >
                    {form?.buttonLabel}
                  </button>
                )}
              </WebriQForm>
              {signInLink?.label && (
                <p className="text-xs text-gray-500">
                  <span>Already have an account?</span>
                  <ConditionalBtnOrLink value={signInLink} style="text-webriq-darkblue hover:text-webriq-babyblue" />
                </p>
              )}
            </div>
          )}
          {formLinks && (
            <div className="flex flex-wrap text-sm justify-center items-center text-gray-500">
              {formLinks?.map((link, index, { length }) => (
                <div key={index}>
                  <ConditionalBtnOrLink value={link} style="text-webriq-darkblue hover:text-webriq-blue font-bold" />
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

/**
 * 
 * @param {fields} 
 * @returns input fields according to type
 */
function FormFields({ fields }) {
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
        className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
        placeholder={fields?.placeholder}
        name={fields?.name}
        required={fields?.isRequired}
      />
    )
  } else if(fields?.type === "inputFile") {
    return (
      <label className="flex px-2 bg-gray-100 rounded">
        <input
          aria-label={fields?.name}
          className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
          type="file"
          placeholder="Choose file.."
          name={fields?.name}
          required={fields?.isRequired}
        />
      </label>
    )
  } else if(fields?.type === "inputNumber") {
    return (
      <input
        aria-label={fields?.name}
        className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
        type="number"
        placeholder={fields?.placeholder}
        name={fields?.name}
        required={fields?.isRequired}
      />
    )
  } else if(fields?.type === "inputSelect") {
    return (
      <div className="mb-4 flex">
        <label
          className="text-left text-xs text-gray-500 m-auto"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <select
          className="p-3 w-full text-xs bg-gray-100 outline-none rounded"
          name={`cta-${fields?.name}`}
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
      <input
        aria-label={`${
          fields?.type === "inputText"
            ? `Input ${fields?.name}`
            : `${fields?.type}`
        }`}
        className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
        type={
          fields?.type === "inputEmail"
            ? "email"
            : fields?.type === "inputPassword"
            ? "password"
            : "text"
        }
        placeholder={fields?.placeholder}
        name={fields?.name}
        required={fields?.isRequired}
      />
    )
  }
}

export default React.memo(VariantE);
