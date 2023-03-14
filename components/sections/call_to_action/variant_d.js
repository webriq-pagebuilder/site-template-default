import { urlFor } from "lib/sanity";
import React from "react";
import Link from "next/link";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink, ConditionalBtnOrLink } from "helper";

function VariantD({ logo, title, text, button, form, formLinks, signInLink }) {
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

  return (
    <section className="py-20 px-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="mb-16 lg:mb-0 max-w-2xl lg:w-1/2 px-4">
            {logo?.image && (
              <Link 
                aria-label={
                  logoLink() === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink()}`
                }
                className="mb-10 inline-block text-3xl font-bold leading-none"
                href={logoLink()}
              >
                <img
                  className="h-14"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </Link>
            )}
            <h1 className="mb-4 text-4xl md:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="mb-8 text-gray-700 leading-loose">{text}</p>
            {button?.label && (
              <ConditionalBtnOrLink value={button} style="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-250 rounded-l-xl rounded-t-xl" />
            )}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="max-w-sm mx-auto lg:mr-0 lg:ml-auto">
              {form?.fields && (
                <div className="mb-6 py-8 px-6 bg-white shadow rounded-t-3xl rounded-bl-3xl text-center">
                  <WebriQForm
                    method="POST"
                    data-form-id={form?.id}
                    name="Calltoaction-VariantD-Form"
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
                          {formFields.type === "textarea" ? (
                            <textarea
                              aria-label={`${formFields?.name} text area`}
                              className="w-full p-4 text-xs bg-gray-100 outline-none rounded"
                              placeholder={formFields?.placeholder}
                              name={formFields?.name}
                              required={formFields?.isRequired}
                            />
                          ) : formFields.type === "inputFile" ? (
                            <label className="flex px-2 bg-gray-100 rounded">
                              <input
                                aria-label={formFields?.name}
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
                                name={`cta-${formFields?.name}`}
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
                    {form?.fields?.slice(2)?.map((formFields, index) => (
                      <div key={index}>
                        {formFields?.type === "textarea" ? (
                          <textarea
                            aria-label={`${formFields?.name} text area`}
                            className="mb-3 w-full p-4 text-xs bg-gray-100 outline-none rounded"
                            placeholder={formFields?.placeholder}
                            name={formFields?.name}
                            required={formFields?.isRequired}
                          />
                        ) : formFields?.type === "inputFile" ? (
                          <div className="mb-3">
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
                        ) : formFields.type === "inputNumber" ? (
                          <input
                            aria-label={formFields?.name}
                            className="mb-4 w-full p-4 text-xs bg-gray-100 outline-none rounded"
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
                              name={`cta-${formFields?.name}`}
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
                                  : formFields?.type === "inputPassword"
                                  ? "password"
                                  : "text"
                              }
                              placeholder={formFields?.placeholder}
                              name={formFields?.name}
                              required={formFields?.isRequired}
                            />
                          </div>
                        )}
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
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
