import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";

function VariantB({
  caption,
  title,
  description,
  plans,
  hashKey,
  apiVersion,
  stripeSKey,
  stripePKey,
  NEXT_PUBLIC_APP_URL,
}) {
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
            stripeSKey,
            apiVersion,
          },
          stripeParams: {
            id: `webriq-studio-pricing-${plans[i]._key}-${i + 1}-${plans[
              i
            ].planType.replace(/ /g, "-")}-oneTime-Payment-${plans[i].price}`,
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
            `${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=products&action=retrieve`,
            productPayload
          );
          const productResponse = await product.data;
          // plansResponse.push(data.data);

          const { data } = await axios.post(
            `${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=prices&action=list`,
            pricePayload
          );

          if (data) {
            data?.data?.forEach((item) => {
              if (item.product === productResponse.data.id) {
                plans[i]["variant_b_checkoutButton"] = item.id;
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

    getPriceId(usePlan);
  }, [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, stripeSKey, usePlan]);

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 w-full flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              {caption && (
                <span className="text-webriq-darkblue text-sm lg:text=base xl:text-base 2xl:text-base font-bold">
                  {caption}
                </span>
              )}
              {title && (
                <h1 className="mb-2 text-2xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold font-heading">
                  {title}
                </h1>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              {!description ? null : (
                <p className="max-w-xs lg:mx-auto text-gray-500 text-sm lg:text-base xl:text-base 2xl:text-base leading-loose">
                  {description}
                </p>
              )}
            </div>
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
                {`Stripe Checkout won't work because of an Invalid`}
                <strong> Stripe Public Key</strong>, please fix it in your
                studio under webriq-payments to get rid of this error message.
              </p>
            </div>
          )}

          {usePlan &&
            usePlan.map((plan) => {
              return (
                <div
                  className="mb-8 w-full p-8 flex flex-wrap items-center bg-white rounded shadow"
                  key={plan._key}
                >
                  <div className="w-full lg:w-1/5 px-3 self-start">
                    <h3 className="mb-4 text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold font-heading">
                      {plan.planType}
                    </h3>
                  </div>
                  <div className="w-full lg:w-2/5 px-3">
                    <ul className="mb-4 text-gray-500">
                      {plan.planIncludes?.map((include) => (
                        <li className="mb-4 flex" key={include}>
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
                          <span className="text-sm lg:text-base xl:text-base 2xl:text-base">
                            {include}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-1/5 px-3 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(plan.price))
                        ? plan.price
                        : `$${comma.format(plan.price)}`}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/5 px-3">
                    {plan.checkoutButtonName && (
                      <button
                        aria-label={`${plan.checkoutButtonName} button`}
                        className={`inline-block mt-4 lg:mt-0 py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-200  ${
                          !plan ||
                          (!plan?.variant_b_checkoutButton &&
                            "disabled:opacity-50 cursor-not-allowed bg-gray-100")
                        }`}
                        disabled={!plan || !plan?.variant_b_checkoutButton}
                        onClick={() => {
                          initiateCheckout(
                            {
                              lineItems: [
                                {
                                  price: plan.variant_b_checkoutButton,
                                  quantity: 1,
                                },
                              ],
                            },
                            stripePKey,
                            window.location.origin + "/success",
                            window.location.href,
                            false,
                            setPKError
                          );
                        }}
                      >
                        {!usePlan ? "Processing..." : plan.checkoutButtonName}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
