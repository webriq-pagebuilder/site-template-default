import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { urlFor } from "lib/sanity";
import { logoLink, thankYouPageLink, ConditionalLink } from "helper";
import { SignUpFormProps } from ".";
import { FormFields as TFormFields } from "types";
import { Card } from "components/ui/Card";
import { Form } from "components/ui/Form/Form";
import { Button } from "components/ui/Button";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { Flex } from "components/layout/Flex/Flex";

function VariantB({ logo, form, formLinks, signInLink }: SignUpFormProps) {
  return (
    <section className="py-10 bg-brand-primary lg:py-20">
      <Container>
        <Container maxWidth={576}>
          <div className="mb-10">
            {logo?.image && (
              <Link
                aria-label={`Go to ${
                  logoLink(logo) === "/" ? "home page" : logoLink(logo)
                }`}
                className="flex justify-center text-3xl font-bold leading-none text-white"
                href={logoLink(logo)}
              >
                <Image
                  src={urlFor(logo?.image)}
                  width={50}
                  height={50}
                  quality={100}
                  alt={logo?.alt ?? "signUp-logo"}
                />
              </Link>
            )}
          </div>
          <Card className="p-6 mb-6 bg-white lg:mb-10 lg:p-12">
            <div className="mb-6">
              <Text muted>{form?.subtitle}</Text>
              <Heading className="text-2xl lg:text-2xl">{form?.name}</Heading>
            </div>
            {form?.fields && (
              <Form
                id={form?.id}
                name="SignUp-VariantB-Form"
                className="form-signup"
                thankyouPage={thankYouPageLink(form?.thankYouPage)}
              >
                <Flex wrap>
                  {form?.fields?.slice(0, 2)?.map((formFields, index) => (
                    <div className="w-full px-2 mb-3 lg:w-1/2" key={index}>
                      <FormFields fields={formFields} />
                    </div>
                  ))}
                </Flex>
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
                    <Button
                      className="w-full py-4"
                      ariaLabel={
                        form?.buttonLabel ?? "Sign Up form submit button"
                      }
                      variant="tertiary"
                      type="submit"
                    >
                      {form?.buttonLabel}
                    </Button>
                  )}
                  {signInLink?.label && (
                    <span className="text-xs text-gray-900">
                      <span>Already have an account?</span>{" "}
                      <Button
                        asLink
                        variant="link"
                        link={signInLink}
                        className="text-brand-primary hover:underline"
                        ariaLabel={signInLink?.label}
                      >
                        {signInLink?.label}
                      </Button>
                    </span>
                  )}
                </div>
              </Form>
            )}
          </Card>
          {formLinks && (
            <p className="text-xs text-center text-brand-secondary-foreground">
              {formLinks?.map((link, index, { length }) => (
                <span key={index}>
                  <Button
                    asLink
                    variant="link"
                    link={link}
                    className="text-xs underline text-brand-secondary-foreground hover:text-gray-50"
                    ariaLabel={link?.label}
                  >
                    {link?.label}
                  </Button>
                  {index === length - 1 ? null : index === length - 2 ? (
                    <span>&nbsp;and&nbsp;</span>
                  ) : (
                    <span>&nbsp;,&nbsp;</span>
                  )}
                </span>
              ))}
            </p>
          )}
        </Container>
      </Container>
    </section>
  );
}

/**
 *
 * @param {fields}
 * @returns input fields according to type
 */
function FormFields({ fields }: { fields: TFormFields }) {
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

  if (fields?.type === "textarea") {
    return (
      <textarea
        aria-label={fields?.placeholder ?? fields?.name}
        className="w-full p-4 text-xs bg-gray-100 rounded outline-none"
        placeholder={fields?.name}
        name={fields?.name}
        required={fields?.isRequired}
      />
    );
  } else if (fields?.type === "inputFile") {
    return (
      <label className="flex px-2 bg-gray-100 rounded">
        <input
          aria-label={fields?.placeholder ?? "Choose file.."}
          className="w-full p-4 text-xs bg-gray-100 rounded outline-none"
          type="file"
          placeholder={fields?.placeholder ?? "Choose file.."}
          name={fields?.name}
          required={fields?.isRequired}
        />
      </label>
    );
  } else if (fields?.type === "inputPassword") {
    return (
      <div className="flex p-4 mb-4 bg-gray-100 rounded">
        <input
          aria-label={fields?.placeholder ?? fields?.name}
          className="w-full text-xs bg-gray-100 outline-none"
          type={showPassword ? "text" : "password"}
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
        {/* SVG icon on the right of the password input field */}
        <button
          aria-label={showPassword ? "Show password" : "Hide password"}
          className="focus:outline-none"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg
              className="w-5 h-5 my-auto ml-4 text-gray-500"
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
              className="w-5 h-5 my-auto ml-4 text-gray-500"
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
    );
  } else if (fields?.type === "inputNumber") {
    return (
      <div className="flex p-4 mb-4 bg-gray-100 rounded">
        <input
          aria-label={fields?.placeholder ?? fields?.name}
          className="w-full text-xs bg-gray-100 outline-none"
          type="number"
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
      </div>
    );
  } else if (fields?.type === "inputSelect") {
    return (
      <div className="flex mb-4">
        <label
          className="m-auto text-xs text-left text-gray-500"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <select
          className="w-full p-3 text-xs bg-gray-100 rounded outline-none"
          name={`header-${fields?.name}`}
          defaultValue={"default-value"}
          required={fields?.isRequired}
        >
          <option value=""></option>
          {fields?.items?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (fields?.type === "inputRadio") {
    return (
      <div className="mb-4 text-left">
        <label
          className="m-auto text-xs text-left text-gray-500"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <div>
          {fields?.items?.map((item, index) => (
            <label className="mr-4 text-xs text-gray-500" key={index}>
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
    );
  } else if (fields?.type === "inputCheckbox") {
    return (
      <div className="mb-4 text-left">
        <label
          className="m-auto text-xs text-left text-gray-500"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <div>
          {fields?.items?.map((item, index) => (
            <label className="mr-4 text-xs text-gray-500" key={index}>
              <input
                className="mr-2"
                name={fields?.name}
                value={item}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={checked.some((v) => v === item)}
                required={
                  fields?.isRequired && checked.length === 0 ? true : false
                }
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex p-4 mb-4 bg-gray-100 rounded">
        <input
          aria-label={fields?.placeholder ?? fields?.name}
          className="w-full text-xs bg-gray-100 outline-none"
          type={fields?.type === "inputEmail" ? "email" : "text"}
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
        {/* SVG icon on the right of the email input field */}
        {fields?.type === "inputEmail" && (
          <svg
            className="w-6 h-6 my-auto ml-4 text-gray-500"
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
    );
  }
}

export default React.memo(VariantB);
