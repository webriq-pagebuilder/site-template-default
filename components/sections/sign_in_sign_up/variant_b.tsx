import { Container, Flex } from "components/layout/index";
import {
  Button,
  Card,
  Form,
  FormField,
  Heading,
  Input,
  Text,
} from "components/ui";
import { logoLink, thankYouPageLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignUpFormProps } from ".";

function VariantB({ logo, form, formLinks, signInLink }: SignUpFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <section className="py-10 bg-primary lg:py-20">
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
                <Flex className="flex-col lg:flex-row gap-3">
                  {form?.fields?.slice(0, 2)?.map((formFields, index) => (
                    <div className="w-full" key={index}>
                      <FormField
                        noLabel
                        variant="secondary"
                        name={formFields?.name}
                        items={formFields?.items}
                        type={formFields?.type}
                        {...formFields}
                      />
                    </div>
                  ))}
                </Flex>

                {form?.fields?.slice(2)?.map((formFields, index) => (
                  <div key={index} className="my-3">
                    {formFields?.type === "inputPassword" ? (
                      <div className="flex bg-gray-100 rounded">
                        <Input
                          noLabel
                          ariaLabel={
                            formFields?.placeholder ?? formFields?.name
                          }
                          variant="secondary"
                          type={showPassword ? "text" : "password"}
                          placeholder={formFields?.placeholder}
                          name={formFields?.name}
                          required={formFields?.isRequired}
                        />
                        {/* SVG icon on the right of the password input field */}
                        <Button
                          variant="unstyled"
                          as="button"
                          ariaLabel={
                            showPassword ? "Show password" : "Hide password"
                          }
                          className="focus:outline-none mr-4"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg
                              className="w-5 h-5 my-auto text-gray-500"
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
                        </Button>
                      </div>
                    ) : (
                      <FormField
                        noLabel
                        variant="secondary"
                        name={formFields?.name}
                        items={formFields?.items}
                        type={formFields?.type}
                        {...formFields}
                      />
                    )}
                  </div>
                ))}

                <div>
                  <div className="webriq-recaptcha" />
                </div>
                <div className="text-center">
                  {form?.buttonLabel && (
                    <Button
                      as="button"
                      className="w-full py-4"
                      ariaLabel={
                        form?.buttonLabel ?? "Sign Up form submit button"
                      }
                      variant="custom"
                      type="submit"
                    >
                      {form?.buttonLabel}
                    </Button>
                  )}
                  {signInLink?.label && (
                    <span className="text-xs text-gray-900">
                      <span>Already have an account?</span>{" "}
                      <Button
                        variant="link"
                        link={signInLink}
                        className="text-xs text-primary hover:underline"
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
            <p className="text-xs text-center text-secondary-foreground">
              {formLinks?.map((link, index, { length }) => (
                <span key={index}>
                  <Button
                    variant="link"
                    link={link}
                    className="text-xs underline text-secondary-foreground hover:text-gray-50"
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

export default React.memo(VariantB);
