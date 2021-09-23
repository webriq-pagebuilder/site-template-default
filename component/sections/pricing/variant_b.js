import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";

function VariantB({
  caption,
  title,
  description,
  plans,
  sanityToken,
  hashKey,
  apiVersion,
  stripeSecretKey,
  stripePKey,
  NEXT_PUBLIC_DXP_STUDIO_ADDRESS,
}) {
  const [subscriptionProducts, setSubscriptionProducts] = React.useState([]);
  const [usePlan, setUsePlan] = React.useState(plans);

  async function getPriceId(plans) {
    let plansResponse = [];
    let i = 0;

    for (; i < plans?.length; ) {
      const payload = {
        id: `dxpstudio-pricing-${plans[i]?._key}-${plans[i]?.planType?.replace(
          / /g,
          "-"
        )}-oneTimePrice-${plans[i]?.price}`,
        sanityToken,
        hashKey,
        stripeSecretKey,
        apiVersion,
      };
      try {
        const response = await axios.post(
          `${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/api/stripe-account/get-product-by-id`,
          payload
        );
        const data = await response.data;
        plansResponse.push(data.data);
      } catch (error) {
        console.log(error);
      }
      i++;
    }
    setSubscriptionProducts(plansResponse);
    return plansResponse;
  }

  React.useEffect(() => {
    getPriceId(plans);
  }, [plans]);

  React.useEffect(() => {
    if (subscriptionProducts?.length === plans?.length) {
      plans.forEach((plan) => {
        subscriptionProducts.forEach((subs) => {
          if (plan.planType === subs.product.name) {
            subs.price.map((price) => {
              plan["checkoutButton"] = price.id;
            });
          }
        });
      });
    }
    setUsePlan(plans);
  }, [subscriptionProducts, plans]);

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
          <div className="mb-16 w-full flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              {caption && (
                <span className="text-webriq-darkblue font-bold">
                  {caption}
                </span>
              )}
              {title && (
                <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              {!description ? null : (
                <p className="max-w-xs lg:mx-auto text-gray-500 leading-loose">
                  {description}
                </p>
              )}
            </div>
          </div>
          {!usePlan ? null : (
            <div className="flex flex-wrap">
              {usePlan?.[0] && (
                <div className="mb-8 w-full p-8 flex flex-wrap items-center bg-white rounded shadow">
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-2xl font-bold font-heading">
                      {usePlan?.[0]?.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {usePlan?.[0]?.planIncludes?.map((include) => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 w-5 h-5 text-webriq-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(usePlan?.[0]?.price))
                        ? usePlan?.[0]?.price
                        : `$${usePlan?.[0]?.price}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    <button
                      className={`inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200  ${
                        !subscriptionProducts &&
                        "disabled:opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!subscriptionProducts}
                      onClick={() => {
                        initiateCheckout(
                          {
                            lineItems: [
                              {
                                price: usePlan[0].checkoutButton,
                                quantity: 1,
                              },
                            ],
                          },
                          stripePKey,
                          window.location.origin + "/success",
                          window.location.href,
                          false
                        );
                      }}
                    >
                      {!usePlan[0].checkoutButton
                        ? "Processing..."
                        : usePlan?.[0]?.checkoutButtonName}
                    </button>
                  </div>
                </div>
              )}
              {usePlan?.[1] && (
                <div className="mb-8 w-full p-8 flex flex-wrap items-center bg-white rounded shadow">
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-2xl font-bold font-heading">
                      {usePlan?.[1]?.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {usePlan?.[1].planIncludes?.map((include) => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 w-5 h-5 text-webriq-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(usePlan?.[1]?.price))
                        ? usePlan?.[1]?.price
                        : `$${usePlan?.[1]?.price}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    <button
                      className={`inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 ${
                        !subscriptionProducts &&
                        "disabled:opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!subscriptionProducts}
                      onClick={() => {
                        initiateCheckout(
                          {
                            lineItems: [
                              {
                                price: usePlan[1].checkoutButton,
                                quantity: 1,
                              },
                            ],
                          },
                          stripePKey,
                          window.location.origin + "/success",
                          window.location.href,
                          false
                        );
                      }}
                    >
                      {!usePlan[1].checkoutButton
                        ? "Processing..."
                        : usePlan?.[1]?.checkoutButtonName}
                    </button>
                  </div>
                </div>
              )}
              {usePlan?.[2] && (
                <div className="w-full p-8 flex flex-wrap items-center bg-white rounded shadow">
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-2xl font-bold font-heading">
                      {usePlan?.[2]?.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {usePlan?.[2]?.planIncludes?.map((include) => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 w-5 h-5 text-webriq-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(usePlan?.[2]?.price))
                        ? usePlan?.[2]?.price
                        : `$${usePlan?.[2]?.price}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    {usePlan?.[2]?.primaryButton === undefined ||
                    usePlan?.[2]?.checkoutButtonName === undefined ? null : (
                      <button
                        className={`inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200   ${
                          !subscriptionProducts &&
                          "disabled:opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!subscriptionProducts}
                        onClick={() => {
                          initiateCheckout(
                            {
                              lineItems: [
                                {
                                  price: usePlan[2].checkout,
                                  quantity: 1,
                                },
                              ],
                            },
                            stripePKey,
                            window.location.origin + "/success",
                            window.location.href,
                            false
                          );
                        }}
                      >
                        {usePlan?.[2]?.checkoutButtonName}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
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
export default React.memo(VariantB);
