import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";

function VariantC({
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
  const [plan, setPlan] = React.useState("monthly");
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
        )}-recurring-monthlyPrice-${plans[i]?.monthlyPrice}-yearlyPrice-${
          plans[i]?.yearlyPrice
        }`,
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
              if (price.recurring == "month") {
                plan["monthlyPriceCheckoutButton"] = price.id;
              } else {
                plan["yearlyPriceCheckoutButton"] = price.id;
              }
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
          <div className="mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
            {description && <p className="mb-6 text-gray-500">{description}</p>}
            {usePlan && (
              <div className="inline-block py-1 px-1 bg-white rounded-lg">
                <button
                  className={`mr-1 text-sm py-2 px-4 ${
                    plan === "monthly"
                      ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                      : "text-gray-500"
                  } font-bold focus:outline-none`}
                  onClick={() => setPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`text-sm py-2 px-4 ${
                    plan === "yearly"
                      ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                      : "text-gray-500"
                  } font-bold focus:outline-none`}
                  onClick={() => setPlan("yearly")}
                >
                  Yearly
                </button>
              </div>
            )}
          </div>
          {usePlan && (
            <div className="flex flex-wrap max-w-4xl mx-auto">
              {usePlan?.[0] && (
                <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                  <div className="py-8 px-10 max-w-md mx-auto bg-white shadow rounded text-center">
                    <div className="mb-12">
                      <h3 className="mb-4 text-2xl font-bold font-heading">
                        {usePlan?.[0]?.planType}
                      </h3>
                      <p className="mb-6 text-gray-500">
                        {usePlan?.[0]?.description}
                      </p>
                    </div>
                    <div>
                      <span className="text-5xl lg:text-6xl font-bold">
                        {isNaN(parseInt(usePlan?.[0]?.monthlyPrice))
                          ? usePlan?.[0]?.monthlyPrice
                          : `$${
                              plan === "yearly"
                                ? usePlan?.[0]?.yearlyPrice
                                : usePlan?.[0]?.monthlyPrice
                            }`}
                      </span>
                      {!isNaN(parseInt(usePlan?.[0]?.price)) && (
                        <span className="text-gray-500">{`/${plan}`}</span>
                      )}
                      <button
                        className={`block mt-6 w-full py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 ${
                          !usePlan?.[0]?.monthlyPriceCheckoutButton &&
                          "disabled:opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!usePlan?.[0]?.monthlyPriceCheckoutButton}
                        onClick={() => {
                          initiateCheckout(
                            {
                              lineItems: [
                                {
                                  price:
                                    plan === "monthly"
                                      ? usePlan?.[0]?.monthlyPriceCheckoutButton
                                      : usePlan?.[0]?.yearlyPriceCheckoutButton,
                                  quantity: 1,
                                },
                              ],
                            },
                            stripePKey,
                            window.location.origin + "/success",
                            window.location.href,
                            true
                          );
                        }}
                      >
                        {!usePlan?.[0]?.monthlyPriceCheckoutButton ||
                        !usePlan?.[0]?.yearlyPriceCheckoutButton
                          ? "Processing..."
                          : usePlan?.[0]?.checkoutButtonName}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {usePlan?.[1] && (
                <div className="w-full lg:w-1/2 px-4">
                  <div className="py-8 px-10 max-w-md mx-auto bg-white shadow rounded text-center">
                    <div className="mb-12">
                      <h3 className="mb-4 text-2xl font-bold font-heading">
                        {usePlan?.[1].planType}
                      </h3>
                      <p className="mb-6 text-gray-500">
                        {usePlan?.[1].description}
                      </p>
                    </div>
                    <div>
                      <span className="text-5xl lg:text-6xl font-bold">
                        {isNaN(parseInt(usePlan?.[1]?.monthlyPrice))
                          ? usePlan?.[1]?.monthlyPrice
                          : `$${
                              plan === "yearly"
                                ? usePlan?.[1]?.yearlyPrice
                                : usePlan?.[1]?.monthlyPrice
                            }`}
                      </span>
                      {!isNaN(parseInt(usePlan?.[1]?.price)) && (
                        <span className="text-gray-500">{`/${plan}`}</span>
                      )}
                      <button
                        className={`block mt-6 w-full py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 ${
                          !usePlan?.[1]?.monthlyPriceCheckoutButton &&
                          "disabled:opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!usePlan?.[1]?.monthlyPriceCheckoutButton}
                        onClick={() => {
                          initiateCheckout(
                            {
                              lineItems: [
                                {
                                  price:
                                    plan === "monthly"
                                      ? usePlan?.[1]?.monthlyPriceCheckoutButton
                                      : usePlan?.[1]?.yearlyPriceCheckoutButton,
                                  quantity: 1,
                                },
                              ],
                            },
                            stripePKey,
                            window.location.origin + "/success",
                            window.location.href,
                            true
                          );
                        }}
                      >
                        {!usePlan?.[1]?.monthlyPriceCheckoutButton ||
                        !usePlan?.[1]?.yearlyPriceCheckoutButton
                          ? "Processing..."
                          : usePlan?.[1]?.checkoutButtonName}
                      </button>
                    </div>
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
export default React.memo(VariantC);
