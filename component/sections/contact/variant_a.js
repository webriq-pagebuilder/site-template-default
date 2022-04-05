import React from "react";
import WebriQForm from "component/webriq-form";
import { PortableText, urlFor } from "lib/sanity";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

function VariantA({
  contactDescription,
  officeInformation,
  contactEmail,
  contactNumber,
  socialLinks,
  form,
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

  const { id, fields, buttonLabel, thankYouPage } = form;
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
                {contactEmail || contactNumber ? (
                  <div className="mb-12 px-10 w-full md:w-1/2">
                    <h2 className="mb-5 text-3xl lg:text-4xl font-bold">
                      Contacts
                    </h2>
                    <p className="text-gray-700 mb-5">{contactEmail}</p>
                    <p className="text-gray-700">{contactNumber}</p>
                  </div>
                ) : null}
                {socialLinks && (
                  <div className="w-full md:w-1/3 lg:w-full">
                    <h2 className="mb-5 text-3xl lg:text-4xl font-bold">
                      Socials
                    </h2>
                    <div className="mb-4 lg:mb-0 order-first lg:order-last">
                      {socialLinks?.map(
                        (social) =>
                          social?.socialMediaLink && (
                            <a
                              aria-label={
                                social?.socialMedia ||
                                social?.socialMediaPlatform
                              }
                              className="inline-block mr-5 bg-gray-50 hover:bg-gray-100 rounded"
                              target="_blank"
                              rel="noopener noreferrer"
                              href={social?.socialMediaLink}
                              key={social?._key}
                            >
                              {social?.socialMedia === "facebook" ? (
                                <FaFacebookF
                                  style={{
                                    color: "#0045d8",
                                    height: "24px",
                                    width: "24px",
                                  }}
                                />
                              ) : social?.socialMedia === "twitter" ? (
                                <FaTwitter
                                  style={{
                                    color: "#0045d8",
                                    height: "24px",
                                    width: "24px",
                                  }}
                                />
                              ) : social?.socialMedia === "instagram" ? (
                                <FaInstagram
                                  style={{
                                    color: "#0045d8",
                                    height: "24px",
                                    width: "24px",
                                  }}
                                />
                              ) : social?.socialMedia === "linkedin" ? (
                                <FaLinkedinIn
                                  style={{
                                    color: "#0045d8",
                                    height: "24px",
                                    width: "24px",
                                  }}
                                />
                              ) : social?.socialMedia === "youtube" ? (
                                <FaYoutube
                                  style={{
                                    color: "#0045d8",
                                    height: "24px",
                                    width: "24px",
                                  }}
                                />
                              ) : social?.socialMedia === "tiktok" ? (
                                <FaTiktok
                                  style={{
                                    color: "#0045d8",
                                    height: "24px",
                                    width: "24px",
                                  }}
                                />
                              ) : (
                                social?.socialMediaIcon?.image && (
                                  <img
                                    className="h-6 w-auto"
                                    src={urlFor(social?.socialMediaIcon?.image)}
                                    alt={
                                      social?.socialMediaIcon?.alt ??
                                      "contact-socialMedia-icon"
                                    }
                                  />
                                )
                              )}
                            </a>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pl-10 w-full lg:w-1/2">
              {fields && (
                <div className="max-w-md lg:mx-auto">
                  <WebriQForm
                    method="POST"
                    data-form-id={id}
                    name="Contact-VariantA-Form"
                    className="form-contacts"
                    data-thankyou-url={thankYouPageLink(thankYouPage)}
                    scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                  >
                    {fields?.map((formFields, index) => (
                      <div key={index}>
                        {formFields?.type === "textarea" ? (
                          <div className="mb-4">
                            <textarea
                              aria-label={`${formFields?.name} text area`}
                              className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                              type="text"
                              placeholder={formFields?.placeholder}
                              name={formFields?.name}
                              required={formFields?.isRequired}
                            />
                          </div>
                        ) : formFields?.type === "inputFile" ? (
                          <div className="mb-4">
                            <label className="flex px-2 bg-white rounded">
                              <input
                                aria-label="Add file"
                                className="hidden"
                                type="file"
                                placeholder="Choose file.."
                                name={formFields?.name}
                                required={formFields?.isRequired}
                              />
                              <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                                Browse
                              </div>
                            </label>
                          </div>
                        ) : formFields.type === "inputNumber" ? (
                          <input
                            aria-label={formFields?.name}
                            className="mb-4 w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
                            type="number"
                            placeholder={formFields?.placeholder}
                            name={formFields?.name}
                            required={formFields?.isRequired}
                          />
                        ) : formFields.type === "inputSelect" ? (
                          <div className="mb-4 flex">
                            <label
                              className="text-left text-xs text-gray-500 font-semibold leading-none m-auto"
                              htmlFor={formFields?.name}
                            >
                              {formFields?.label}
                            </label>
                            <select
                              className="p-3 w-full text-xs text-gray-500 font-semibold bg-white rounded outline-none"
                              name={`contact-${formFields?.name}`}
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
                              className="text-left text-xs text-gray-500 font-semibold m-auto"
                              htmlFor={formFields?.name}
                            >
                              {formFields?.label}
                            </label>
                            <div>
                              {formFields?.items?.map((item, index) => (
                                <label
                                  className="text-xs text-gray-500 font-semibold mr-4"
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
                              className="text-left text-xs text-gray-500 font-semibold m-auto"
                              htmlFor={formFields?.name}
                            >
                              {formFields?.label}
                            </label>
                            <div>
                              {formFields?.items?.map((item, index) => (
                                <label
                                  className="text-xs text-gray-500 font-semibold mr-4"
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
                          <div className="mb-4">
                            <input
                              aria-label={`${
                                formFields?.type === "inputText"
                                  ? `Input ${formFields?.name}`
                                  : `${formFields?.type}`
                              }`}
                              className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
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
                    <div className="flex justify-between items-center">
                      {block && (
                        <div className="inline-flex">
                          <input
                            aria-label="Agree to terms"
                            className="mr-2 mt-1"
                            type="checkbox"
                            id="terms"
                            name="terms"
                            defaultValue={1}
                            required
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
                      {buttonLabel && (
                        <button
                          aria-label={
                            buttonLabel ?? "Contact form submit button"
                          }
                          className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-200"
                          type="submit"
                        >
                          {buttonLabel}
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
