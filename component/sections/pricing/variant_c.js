import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";

function VariantC({
  caption,
  title,
  description,
  plans,
  hashKey,
  apiVersion,
  stripeSecretKey,
  stripePKey,
  NEXT_PUBLIC_DXP_STUDIO_ADDRESS,
}) {
  const [plan, setPlan] = React.useState("monthly");
  const [usePlan, setUsePlan] = React.useState(plans);
  const [pKeyError, setPKError] = React.useState(false);
  const comma = Intl.NumberFormat("en-us");

  async function getPriceId(plans) {
    let i = 0;
    for (; i < plans?.length; ) {
      const productPayload = {
        credentials: {
          hashKey,
          stripeSecretKey,
          apiVersion,
        },
        id: `dxpstudio-pricing-${plans[i]?._key}-${plans[i]?.planType?.replace(
          / /g,
          "-"
        )}-recurring-monthlyPrice-${plans[i]?.monthlyPrice}-yearlyPrice-${
          plans[i]?.yearlyPrice
        }`,
      };

      const pricePayload = {
        credentials: {
          hashKey,
          stripeSecretKey,
          apiVersion,
        },
      };
      try {
        const product = await axios.post(
          `${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/api/payments/stripe?resource=products&action=retrieve`,
          productPayload
        );
        const productData = await product.data;
        // plansResponse.push(data.data);

        const prices = await axios.post(
          `${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/api/payments/stripe?resource=prices&action=list`,
          pricePayload
        );
        const pricesData = await prices.data;

        pricesData.data.map((price) => {
          if (
            price.product === productData.id &&
            productData.name === plans[i].planType
          ) {
            if (price.recurring.interval === "month") {
              plans[i]["monthlyPriceCheckoutButton"] = price.id;
            } else {
              plans[i]["yearlyPriceCheckoutButton"] = price.id;
            }
          }
        });

        setUsePlan(plans);
      } catch (error) {
        console.log(error);
      }
      i++;
    }
  }

  React.useEffect(() => {
    getPriceId(usePlan);
  }, [plans, usePlan]);

  return (
    <section>
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
                  aria-label="Monthly Plan"
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
                  aria-label="Yearly Plan"
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
          {pKeyError && (
            <div>
              <p
                style={{
                  fontSize: 9,
                  color: "red",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                Stripe Checkout won't work because of an Invalid
                <strong> Stripe Public Key</strong>, please fix it in your
                studio under webriq-payments to get rid of this error message.
              </p>
            </div>
          )}
          <div className="flex flex-wrap -mx-4">
            {usePlan &&
              usePlan?.map((planDescription) => {
                console.log(plans);
                return (
                  <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-8">
                    <div className="py-8 px-10 max-w-md mx-auto bg-white shadow rounded text-center">
                      <div className="mb-12">
                        <h3 className="mb-4 text-2xl font-bold font-heading">
                          {planDescription?.planType}
                        </h3>
                        <p className="mb-6 text-gray-500">
                          {planDescription?.description}
                        </p>
                      </div>
                      <div>
                        <span className="text-5xl lg:text-6xl font-bold">
                          {isNaN(parseInt(planDescription?.monthlyPrice))
                            ? planDescription?.monthlyPrice
                            : `$${
                                plan === "yearly"
                                  ? comma.format(planDescription?.yearlyPrice)
                                  : comma.format(planDescription?.monthlyPrice)
                              }`}
                        </span>
                        {!isNaN(parseInt(planDescription?.price)) && (
                          <span className="text-gray-500">{`/${plan}`}</span>
                        )}
                        <button
                          aria-label={`${planDescription?.checkoutButtonName} button`}
                          className={`block mt-6 w-full py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-200 ${
                            !usePlan[0] &&
                            "disabled:opacity-50 cursor-not-allowed"
                          }`}
                          disabled={!usePlan[0]}
                          onClick={() => {
                            initiateCheckout(
                              {
                                lineItems: [
                                  {
                                    price:
                                      plan === "monthly"
                                        ? usePlan?.[0]
                                            ?.monthlyPriceCheckoutButton
                                        : usePlan?.[0]
                                            ?.yearlyPriceCheckoutButton,
                                    quantity: 1,
                                  },
                                ],
                              },
                              stripePKey,
                              window.location.origin + "/success",
                              window.location.href,
                              true,
                              setPKError
                            );
                          }}
                        >
                          {!usePlan[0]
                            ? "Processing..."
                            : planDescription?.checkoutButtonName}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
