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
  stripeSKey,
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
          stripeSKey,
          apiVersion,
        },
        stripeParams: {
          id: `webriq-studio-pricing-${plans[i]._key}-${i + 1}-${plans[
            i
          ].planType.replace(/ /g, "-")}-recurring-monthlyPrice-${
            plans[i].monthlyPrice
          }-yearlyPrice-${plans[i].yearlyPrice}`,
        },
      };

      const pricePayload = {
        credentials: {
          hashKey,
          stripeSKey,
          apiVersion,
        },
        stripeParams: {},
      };
      try {
        const product = await axios.post(
          `${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/api/payments/stripe?resource=products&action=retrieve`,
          productPayload
        );
        const productResponse = await product.data;
        // plansResponse.push(data.data);

        const { data } = await axios.post(
          `${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/api/payments/stripe?resource=prices&action=list`,
          pricePayload
        );

        if (data) {
          data?.data?.forEach((item) => {
            if (
              item.product === productResponse.data.id &&
              item.recurring.interval === "month"
            ) {
              plans[i]["variant_a_monthlyPriceCheckoutButton"] = item.id;
            } else if (
              item.product === productResponse.data.id &&
              item.recurring.interval === "year"
            ) {
              plans[i]["variant_a_yearlyPriceCheckoutButton"] = item.id;
            }
          });
        }
        setUsePlan(plans);
      } catch (error) {
        console.log(error);
      }
      i++;
    }
  }

  React.useEffect(() => {
    getPriceId(usePlan);
  }, [plans, plan, usePlan]);

  return (
    <section>
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
                  aria-label="Monthly Plan"
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
            {usePlan?.map((planDetail, index) => {
              return (
                <div
                  className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 lg:mb-5"
                  key={planDetail._key}
                >
                  <div
                    className={`p-8 ${
                      index % 2 !== 0
                        ? "bg-webriq-darkblue text-white"
                        : "bg-white"
                    } shadow rounded`}
                  >
                    <h4
                      className={`mb-2 text-2xl font-bold font-heading ${
                        index % 2 !== 0 && "text-white"
                      }`}
                    >
                      {planDetail.planType}
                    </h4>
                    <span
                      className={`text-6xl font-bold ${
                        index % 2 !== 0 && "text-white"
                      }`}
                    >
                      {isNaN(parseInt(planDetail.monthlyPrice))
                        ? planDetail.monthlyPrice
                        : `$${
                            plan === "yearly"
                              ? comma.format(planDetail.yearlyPrice)
                              : comma.format(planDetail.monthlyPrice)
                          }`}
                    </span>
                    {!isNaN(parseInt(planDetail.monthlyPrice)) && (
                      <span
                        className={` text-xs ${
                          index % 2 !== 0 ? "text-white" : "text-gray-500"
                        }`}
                      >
                        /{plan}
                      </span>
                    )}
                    <p
                      className={`mt-3 mb-6 ${
                        index % 2 !== 0 ? "text-white" : "text-gray-500"
                      } leading-loose`}
                    >
                      {planDetail.description}
                    </p>
                    <ul
                      className={`mb-6 ${
                        index % 2 !== 0 ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {planDetail.planIncludes?.map((include) => (
                        <li className="mb-2 flex" key={include}>
                          <svg
                            className={`mr-2 w-5 h-5 ${
                              index % 2 !== 0
                                ? "text-baby-darkblue"
                                : "text-webriq-darkblue"
                            }`}
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
                      aria-label={`${planDetail.checkoutButtonName} button`}
                      className={`inline-block text-center py-2 px-4 w-full rounded-l-xl rounded-t-xl ${
                        index % 2 !== 0
                          ? "bg-white text-black"
                          : "bg-webriq-darkblue hover:bg-webriq-blue  text-white"
                      } font-bold leading-loose transition duration-200 cursor-pointer ${
                        !planDetail ||
                        (!planDetail?.variant_a_monthlyPriceCheckoutButton &&
                          "disabled:opacity-50 cursor-not-allowed bg-gray-100")
                      }`}
                      disabled={
                        !planDetail ||
                        !planDetail?.variant_a_monthlyPriceCheckoutButton
                      }
                      onClick={() => {
                        initiateCheckout(
                          {
                            lineItems: [
                              {
                                price:
                                  plan === "monthly"
                                    ? planDetail.variant_a_monthlyPriceCheckoutButton
                                    : planDetail.variant_a_yearlyPriceCheckoutButton,
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
                      {!planDetail
                        ? "Processing..."
                        : planDetail.checkoutButtonName}
                    </button>
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
export default React.memo(VariantA);
