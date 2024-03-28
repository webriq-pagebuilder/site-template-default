import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";
import { PricingProps } from ".";
import { Text, Card, Button } from "components/ui";
import { Container, Flex } from "components/layout/index";

import { Heading } from "components/ui/Heading";

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
}: PricingProps) {
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
            id: `pricing-${plans[i]._key}-${i + 1}-${plans[i].planType.replace(
              / /g,
              "-"
            )}-oneTime-Payment-${plans[i].price}`,
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

    if (apiVersion && hashKey && stripeSKey) {
      getPriceId(usePlan);
    }
  }, [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, stripeSKey, usePlan]);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap aligncenter className="w-full mb-16">
          <div className="w-full lg:w-1/2">
            {caption && (
              <Text fontSize="sm" className="text-sm lg:text-base text-primary">
                {caption}
              </Text>
            )}
            {title && <Heading className="mb-2">{title}</Heading>}
          </div>
          <div className="w-full lg:w-1/2">
            {!description ? null : (
              <Text
                muted
                className="max-w-xs text-sm leading-loose lg:mx-auto lg:text-base"
              >
                {description}
              </Text>
            )}
          </div>
        </Flex>
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
              <strong> Stripe Public Key</strong>, please fix it in your studio
              under webriq-payments to get rid of this error message.
            </p>
          </div>
        )}

        {usePlan &&
          usePlan.map((plan) => {
            return (
              <Card
                className="flex flex-wrap items-center w-full p-8 mb-8"
                key={plan._key}
              >
                <div className="self-start w-full px-3 lg:w-1/5">
                  <Heading type="h3" className="mb-4 text-xl lg:text-2xl">
                    {plan.planType}
                  </Heading>
                </div>
                <div className="w-full px-3 lg:w-2/5">
                  <ul className="mb-4 text-gray-500">
                    {plan.planIncludes?.map((include) => (
                      <li className="flex mb-4" key={include}>
                        <ListIcon />
                        <span className="text-sm lg:text-base">{include}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full px-3 lg:w-1/5 lg:text-center">
                  <span className="text-4xl font-bold">
                    {isNaN(parseInt(plan.price))
                      ? plan.price
                      : `$${comma.format(+plan.price)}`}
                  </span>
                </div>
                <div className="w-full px-3 lg:w-1/5">
                  {plan.checkoutButtonName && (
                    <Button
                      as="button"
                      ariaLabel={plan.checkoutButtonName}
                      className={`mt-4 lg:mt-0  ${
                        !plan ||
                        (!plan?.variant_b_checkoutButton &&
                          "cursor-not-allowed  disabled:opacity-50")
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
                          false
                          // setPKError
                        );
                      }}
                    >
                      {!usePlan ? "Processing..." : plan.checkoutButtonName}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
      </Container>
    </section>
  );
}
function ListIcon() {
  return (
    <svg
      className="w-5 h-5 mr-2 text-primary"
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
  );
}
export default React.memo(VariantB);
