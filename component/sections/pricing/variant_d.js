import { urlFor } from "lib/sanity";
import React from "react";
import WebriQForm from "@webriq/gatsby-webriq-form";
import PortableText from "@sanity/block-content-to-react";


function VariantD({
  caption,
  title,
  description,
  annualBilling,
  monthlyBilling,
  banner,
  form,
  block,
  signInLink
}) {
  const [banners, setBanners] = React.useState(0);
  const [billing, setBilling] = React.useState({amount: 0, billType: ''})

  const handleChange = (e) => {
    e.target.value === monthlyBilling ? setBilling({amount: e.target.value, billType: "Monthly"}) : setBilling({amount: e.target.value, billType: "Annual"})
  };

  const serializers = {
    types: {
      block: (props) => (
        <p className="text-xs">{props.children}</p>
      )
    },
    marks: {
      internalLink: ({ children, mark }) => (
        <a className="hover:text-red-400 text-red-800" href={mark.slug.current}>
          {children}
        </a>
      ),
      link: ({ children, mark }) => (
        mark.blank ? (
          <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
          <a className="text-webriq-darkblue font-bold hover:text-webriq-darkblue" href={mark.href}>{children}</a>
        )
      )
    }
  };

  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-2xl mx-auto text-center">
            <div className="max-w-lg mx-auto">
              <span className="text-webriq-darkblue font-bold">{caption}</span>
              <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
              <p className="mb-8 text-gray-500">{description}</p>
            </div>
            <div className="flex flex-wrap justify-center">
              <label className="md:mr-4 w-full sm:w-auto flex items-center mr-8 mb-2">
                <input type="radio" name="billing" defaultValue={monthlyBilling} onChange={(e) => handleChange(e)}/>
                <span className="mx-2 font-semibold">Monthly Billing</span>
                <span className="inline-flex items-center justify-center w-16 h-10 bg-webriq-darkblue text-white font-semibold rounded-lg">
                  ${monthlyBilling}
                </span>
              </label>
              <label className="flex w-full sm:w-auto items-center mb-2">
                <input type="radio" name="billing" defaultValue={annualBilling} onChange={(e) => handleChange(e)}/>
                <span className="mx-2 font-semibold">Annual Billing</span>
                <span className="inline-flex items-center justify-center w-16 h-10 bg-webriq-darkblue text-white font-semibold rounded-lg">
                  ${annualBilling}
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap bg-white rounded shadow">
            <form className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="px-6 py-8 lg:px-8 text-center">
                <span className="text-gray-400">Sign In</span>
                <h4 className="mb-8 text-2xl font-heading">
                  Finish your payment
                </h4>

                <WebriQForm
                  className="mb-4"
                  method="POST"
                  data-form-id={form?.id}
                  data-thankyou-url={"/"}
                  scriptSrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                >
                  {form?.fields?.map((field) => (
                    <>
                      {field.type === "inputText" &&
                      String(field?.name).split(" ")[0].toLowerCase() ===
                        "email" ? (
                        <div className="flex mb-4 px-4 bg-gray-50 rounded" key={field?._key}>
                          <input
                            className="w-full py-4 text-xs placeholder-gray-400 font-semibold leading-none bg-gray-50 focus:outline-none"
                            type="email"
                            placeholder={field.name}
                          />
                          <svg
                            className="h-6 w-6 ml-4 my-auto text-gray-300"
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
                        </div>
                      ) : field.type === "inputText" &&
                        String(field?.name).toLowerCase() === "password" ? (
                        <div className="flex mb-6 px-4 bg-gray-50 rounded">
                          <input
                            className="w-full py-4 text-xs placeholder-gray-400 font-semibold leading-none bg-gray-50 focus:outline-none"
                            type="password"
                            placeholder={field.name}
                          />
                          <button className="ml-4">
                            <svg
                              className="h-6 w-6 my-auto text-gray-300"
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
                        </div>
                      ) : 
                      // field.type === "card" ? <div className="p-3 mb-4">
                      //   <CardElement options={cardElementOptions}/>
                      // </div> : 
                      null}
                    </>
                  ))}

                  <div className="text-left mb-5 text-sm text-gray-400">
                    <label className="inline-flex">
                      <input className="mr-2" type="checkbox" name="terms" defaultValue={1} />
                      <PortableText blocks={block} serializers={serializers} />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`block w-full p-4 text-center text-white font-bold leading-none bg-webriq-blue hover:bg-webriq-darkblue rounded-l-xl rounded-t-xl transition duration-200 ${billing.billType === '' && 'disabled:opacity-50 cursor-not-allowed'}`}
                    disabled={billing.billType === ''}
                    onClick={handleSubmit}
                  >
                    Buy {billing.billType} Supply
                  </button>
                </WebriQForm>
                <p className="text-xs text-gray-400">
                  Already have an account?{" "}
                  <a
                    className="text-webriq-darkblue hover:underline"
                    target={signInLink?.linkTarget}
                    rel={signInLink?.linkTarget === "_blank" ? "noopener noreferrer" : null}
                    href={signInLink?.type === "linkExternal"
                      ? signInLink?.externalLink
                      : signInLink?.type === "linkInternal"
                        ? signInLink?.internalLink === "Home" ||
                          signInLink?.internalLink === "home"
                          ? "/"
                          : signInLink?.internalLink
                        : "page-not-found"
                    }
                  >
                    &nbsp;{signInLink?.label}
                  </a>
                </p>
              </div>
            </form>
            <div className="py-10 w-full md:w-1/2 bg-webriq-darkblue lg:rounded-r overflow-hidden flex flex-col">
              <img
                className="w-full md:max-w-xs mx-auto my-auto"
                src={urlFor(banner?.[banners]?.mainImage)}
                alt=""
              />
              <h3 className="mb-4 max-w-sm mx-auto text-center text-xl text-white">
                {banner?.[banners]?.heading}
              </h3>
              <div className="text-center">
                {banner?.map((item, index) => (
                  <button
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
      <div className="skew skew-bottom mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
