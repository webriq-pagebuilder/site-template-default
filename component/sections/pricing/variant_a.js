import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";

function VariantA({
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

  React.useEffect(() => {
    async function getPriceId(plans) {
      let i = 0;
      for (; i < plans?.length; ) {
        const productPayload = {
          credentials: {
            hashKey,
            stripeSecretKey,
            apiVersion,
          },
          StripeParams: {
            id: `dxpstudio-pricing-${plans[i]?._key}-${plans[
              i
            ]?.planType?.replace(/ /g, "-")}-recurring-monthlyPrice-${
              plans[i]?.monthlyPrice
            }-yearlyPrice-${plans[i]?.yearlyPrice}`,
          },
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
    getPriceId(usePlan);
  }, [plans]);

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
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-webriq-darkblue font-bold">
              {caption && caption}
            </span>
            <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
              {title && title}
            </h2>
            <p className="mb-6 text-gray-500">{description && description}</p>
            {plans?.[0]?.monthlyPrice && (
              <div className="inline-block py-1 px-1 bg-white rounded-lg">
                <button
                  className={`mr-1 text-sm py-2 px-4 ${
                    plan === "monthly"
                      ? "text-gray-900 bg-gray-50 rounded-lg shadow"
                      : "text-gray-500"
                  } hover:text-gray-900 font-bold focus:outline-none`}
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
            {usePlan?.[0]?.monthlyPrice && (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="p-8 bg-white shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    {usePlan?.[0]?.planType}
                  </h4>
                  <span className="text-6xl font-bold">
                    {isNaN(parseInt(usePlan?.[0]?.monthlyPrice))
                      ? usePlan?.[0]?.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? comma.format(usePlan?.[0]?.yearlyPrice)
                            : comma.format(usePlan?.[0]?.monthlyPrice)
                        }`}
                  </span>
                  {!isNaN(parseInt(usePlan?.[0]?.monthlyPrice)) && (
                    <span className="text-gray-400 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 text-gray-500 leading-loose">
                    {usePlan?.[0]?.description}
                  </p>
                  <ul className="mb-6 text-gray-500">
                    {usePlan?.[0]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-darkblue"
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
                  <button
                    className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 cursor-pointer ${
                      !usePlan?.[0]?.monthlyPriceCheckoutButton &&
                      "disabled:opacity-50 cursor-not-allowed bg-webriq-darkblue"
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
                        true,
                        setPKError
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
            )}
            {usePlan?.[1] && (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="p-8 bg-webriq-darkblue shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold text-white">
                    {usePlan?.[1]?.planType}
                  </h4>
                  <span className="text-6xl font-bold text-white">
                    {isNaN(parseInt(usePlan?.[1]?.monthlyPrice))
                      ? usePlan?.[1]?.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? comma.format(usePlan?.[1]?.yearlyPrice)
                            : comma.format(usePlan?.[1]?.monthlyPrice)
                        }`}
                  </span>
                  {!isNaN(parseInt(usePlan?.[1]?.monthlyPrice)) && (
                    <span className="text-gray-50 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 leading-loose text-gray-50">
                    {usePlan?.[1]?.description}
                  </p>
                  <ul className="mb-6 text-gray-50">
                    {usePlan?.[1]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-babyblue"
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
                  <button
                    className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-white hover:bg-gray-50 font-bold leading-loose transition duration-200 cursor-pointer ${
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
                        true,
                        setPKError
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
            )}
            {usePlan?.[2] && (
              <div className="w-full lg:w-1/3 px-4">
                <div className="p-8 bg-white shadow rounded">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    {usePlan?.[2]?.planType}
                  </h4>
                  <span className="text-6xl font-bold">
                    {isNaN(parseInt(usePlan?.[2]?.monthlyPrice))
                      ? usePlan?.[2]?.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? comma.format(usePlan?.[2]?.yearlyPrice)
                            : comma.format(usePlan?.[2]?.monthlyPrice)
                        }`}
                  </span>
                  {!isNaN(parseInt(usePlan?.[2]?.monthlyPrice)) && (
                    <span className="text-gray-400 text-xs">/{plan}</span>
                  )}
                  <p className="mt-3 mb-6 text-gray-500 leading-loose">
                    {usePlan?.[2]?.description}
                  </p>
                  <ul className="mb-6 text-gray-500">
                    {usePlan?.[2]?.planIncludes?.map((include) => (
                      <li className="mb-2 flex" key={include}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-darkblue"
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
                  <button
                    className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-white font-bold leading-loose transition duration-200 cursor-pointer ${
                      !usePlan[2]?.monthlyPriceCheckoutButton &&
                      "disabled:opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!usePlan[2]?.monthlyPriceCheckoutButton}
                    onClick={() => {
                      initiateCheckout(
                        {
                          lineItems: [
                            {
                              price:
                                plan === "monthly"
                                  ? usePlan[2]?.monthlyPriceCheckoutButton
                                  : usePlan[2]?.yearlyPriceCheckoutButton,
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
                    {!usePlan[2]?.monthlyPriceCheckoutButton ||
                    !usePlan[2]?.yearlyPriceCheckoutButton
                      ? "Processing..."
                      : usePlan?.[2]?.checkoutButtonName}
                  </button>
                </div>
              </div>
            )}
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
export default React.memo(VariantA);
