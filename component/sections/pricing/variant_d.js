import React from "react";
import WebriQForm from "component/webriq-form";
import Image from "next/image";
import Link from "next/link";
import { PortableText, urlFor } from "lib/sanity";

function VariantD({
  caption,
  title,
  description,
  annualBilling,
  monthlyBilling,
  banner,
  form,
  block,
  signInLink,
}) {
  const [banners, setBanners] = React.useState(0);
  const [billing, setBilling] = React.useState({ amount: 0, billType: "" });
  const [showPassword, setShowPassword] = React.useState(false);

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

  const togglePassword = () => {
    const input = document.getElementById("inputPassword");
    input.type === "password"
      ? (input.type = "text") && setShowPassword(true)
      : (input.type = "password") && setShowPassword(false);
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
                    data-form-id={form?.name}
                    name={form?.name}
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
                          type={
                            field?.type === "inputEmail"
                              ? "email"
                              : field?.type === "inputPassword"
                              ? "password"
                              : "text"
                          }
                          placeholder={field.name}
                          name={field?.name}
                          id={field?.type}
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
                            onClick={togglePassword}
                          >
                            {showPassword ? (
                              <svg
                                className="h-5 w-5 my-auto text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5 my-auto text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z" />
                              </svg>
                            )}
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
              {banner?.[banners]?.mainImage?.image && (
                <div className="w-full md:max-w-xs mx-auto my-auto">
                  <Image
                    src={urlFor(banner?.[banners]?.mainImage?.image)}
                    layout="responsive"
                    width="320px"
                    height="296px"
                    objectFit="contain"
                    alt={
                      banner?.[banners]?.mainImage?.alt ??
                      `pricing-image-${banners}`
                    }
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
              <p className="mb-4 max-w-sm mx-auto text-center text-xl text-white">
                {banner?.[banners]?.title}
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
