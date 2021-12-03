import React from "react";
import WebriQForm from "component/webriq-form";
import Image from "next/image";
import { PortableText, urlFor } from "lib/sanity";

function VariantD({
  caption,
  title,
  description,
  annualBilling,
  monthlyBilling,
  banner,
  form,
  formId,
  formName,
  block,
  signInLink,
}) {
  const [banners, setBanners] = React.useState(0);
  const [billing, setBilling] = React.useState({ amount: 0, billType: "" });

  const handleChange = (e) => {
    e.target.value === monthlyBilling
      ? setBilling({ amount: e.target.value, billType: "Monthly" })
      : setBilling({ amount: e.target.value, billType: "Annual" });
  };

  const serializers = {
    types: {
      block: (props) => <p className="text-xs">{props.children}</p>,
    },
    marks: {
      link: ({ children, mark }) => (
        <a
          aria-label={children ?? "external link"}
          className="text-webriq-darkblue font-bold hover:text-webriq-darkblue"
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
          <div className="mb-16 max-w-2xl mx-auto text-center">
            <div className="max-w-lg mx-auto">
              <span className="text-webriq-darkblue font-bold">{caption}</span>
              <h1 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
              <p className="mb-8 text-gray-500">{description}</p>
            </div>
            <div className="flex flex-wrap justify-center">
              <label className="md:mr-4 w-full sm:w-auto flex items-center mr-8 mb-2">
                <input
                  aria-label={`Select ${monthlyBilling}`}
                  type="radio"
                  name="billing"
                  defaultValue={monthlyBilling}
                  onChange={(e) => handleChange(e)}
                />
                <span className="mx-2 font-semibold">Monthly Billing</span>
                <span className="inline-flex items-center justify-center w-16 h-10 bg-webriq-darkblue text-white font-semibold rounded-lg">
                  ${monthlyBilling}
                </span>
              </label>
              <label className="flex w-full sm:w-auto items-center mb-2">
                <input
                  aria-label={`Select ${annualBilling}`}
                  type="radio"
                  name="billing"
                  defaultValue={annualBilling}
                  onChange={(e) => handleChange(e)}
                />
                <span className="mx-2 font-semibold">Annual Billing</span>
                <span className="inline-flex items-center justify-center w-16 h-10 bg-webriq-darkblue text-white font-semibold rounded-lg">
                  ${annualBilling}
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap bg-white rounded shadow">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="px-6 py-8 lg:px-8 text-center">
                <span className="text-gray-700">Sign In</span>
                <p className="mb-8 text-2xl font-heading">
                  Finish your payment
                </p>

                {form?.fields && (
                  <WebriQForm
                    method="POST"
                    data-form-id={formId}
                    name={formName}
                    className="mb-4 form-pricing"
                    data-thankyou-url={"/"}
                    scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                  >
                    {form?.fields?.map((field) => (
                      <div
                        className="flex mb-4 px-4 bg-gray-50 rounded"
                        key={field?._key}
                      >
                        <input
                          aria-label={field?.type}
                          className="w-full py-4 text-xs placeholder-gray-400 font-semibold leading-none bg-gray-50 focus:outline-none"
                          type={field?.type}
                          placeholder={field.name}
                        />
                        {field?.type === "inputEmail" && (
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
                        {field?.type === "inputPassword" && (
                          <button
                            aria-label="Show Password button"
                            className="ml-4"
                          >
                            <svg
                              className="h-6 w-6 my-auto text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="text-left mb-5 text-sm text-gray-500">
                      <label className="inline-flex">
                        <input
                          aria-label={`Agree to ${block}?`}
                          className="mr-2"
                          type="checkbox"
                          name="terms"
                          defaultValue={1}
                        />
                        <PortableText
                          blocks={block}
                          serializers={serializers}
                        />
                      </label>
                    </div>
                    <button
                      aria-label="Submit Pricing Form button"
                      type="submit"
                      className={`block w-full p-4 text-center text-white font-bold leading-none bg-webriq-darkblue hover:bg-webriq-blue rounded-l-xl rounded-t-xl transition duration-200 ${
                        billing.billType === "" &&
                        "disabled:opacity-50 cursor-not-allowed"
                      }`}
                      disabled={billing.billType === ""}
                    >
                      Buy {billing.billType} Supply
                    </button>
                  </WebriQForm>
                )}
                {signInLink?.label && (
                  <p className="text-xs text-gray-500">
                    Already have an account?{" "}
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
                          aria-label={`Pricing ${
                            signInLink?.label ?? "Sign In"
                          } link`}
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
                        aria-label={`Pricing ${
                          signInLink?.label ?? "Sign In"
                        } link`}
                        className="text-webriq-darkblue hover:underline"
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
            </div>
            <div className="py-10 w-full md:w-1/2 bg-webriq-darkblue lg:rounded-r overflow-hidden flex flex-col">
              {banner?.[banners]?.mainImage && (
                <div className="w-full md:max-w-xs mx-auto my-auto">
                  <Image
                    src={urlFor(banner?.[banners]?.mainImage)}
                    layout="responsive"
                    width="320px"
                    height="296px"
                    objectFit="contain"
                    alt={`pricing-image-${banners}`}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
              <p className="mb-4 max-w-sm mx-auto text-center text-xl text-white">
                {banner?.[banners]?.heading}
              </p>
              <div className="text-center">
                {banner?.map((item, index) => (
                  <button
                    aria-label={`Page ${index} button`}
                    key={item?._key}
                    className={` ${
                      banners === index
                        ? "focus:outline-none inline-block mr-2 w-2 h-2 bg-white rounded-full"
                        : "focus:outline-none inline-block mr-2 w-2 h-2 bg-webriq-babyblue rounded-full"
                    } `}
                    onClick={() => setBanners(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
