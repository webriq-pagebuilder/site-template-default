import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";
import { PricingProps } from ".";
import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";

function VariantC({
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
              if (
                item.product === productResponse.data.id &&
                item.recurring.interval === "month"
              ) {
                plans[i]["variant_c_monthlyPriceCheckoutButton"] = item.id;
              } else if (
                item.product === productResponse.data.id &&
                item.recurring.interval === "year"
              ) {
                plans[i]["variant_c_yearlyPriceCheckoutButton"] = item.id;
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
  }, [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, plans, stripeSKey, usePlan]);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={512} className="mb-16 text-center ">
          {caption && <span className="font-bold text-primary">{caption}</span>}
          {title && <Heading className="mb-4">{title}</Heading>}
          {description && (
            <Text muted className="mb-6 ">
              {description}
            </Text>
          )}
          {usePlan && (
            <div className="inline-block px-1 py-1 bg-white rounded-lg">
              <Button
                variant="tab"
                as="button"
                ariaLabel="Monthly Plan"
                isActive={plan === "monthly"}
                onClick={() => setPlan("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant="tab"
                as="button"
                isActive={plan === "yearly"}
                ariaLabel="Yearly Plan"
                onClick={() => setPlan("yearly")}
              >
                Yearly
              </Button>
            </div>
          )}
        </Container>
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
        <div className="flex flex-wrap -mx-4">
          {usePlan &&
            usePlan?.map((planDescription, index) => {
              return (
                <div className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3" key={index}>
                  <Card className="max-w-md px-10 py-8 mx-auto text-center ">
                    <div className="mb-12">
                      <Heading type="h3" className="mb-4 text-2xl">
                        {planDescription?.planType}
                      </Heading>
                      <Text muted className="mb-6 ">
                        {planDescription?.description}
                      </Text>
                    </div>
                    <div>
                      <span className="text-5xl font-bold lg:text-6xl">
                        {isNaN(parseInt(planDescription?.monthlyPrice))
                          ? planDescription?.monthlyPrice
                          : `$${
                              plan === "yearly"
                                ? comma.format(+planDescription?.yearlyPrice)
                                : comma.format(+planDescription?.monthlyPrice)
                            }`}
                      </span>
                      {!isNaN(parseInt(planDescription?.price)) && (
                        <span className="text-gray-500">{`/${plan}`}</span>
                      )}
                      <Button
                        as="button"
                        ariaLabel={planDescription?.checkoutButtonName}
                        className={`mt-6 block w-full ${
                          !planDescription ||
                          (!planDescription?.variant_c_monthlyPriceCheckoutButton &&
                            "cursor-not-allowed disabled:opacity-50")
                        }`}
                        disabled={
                          !planDescription ||
                          !planDescription?.variant_c_monthlyPriceCheckoutButton
                        }
                        onClick={() => {
                          initiateCheckout(
                            {
                              lineItems: [
                                {
                                  price:
                                    plan === "monthly"
                                      ? planDescription?.variant_c_monthlyPriceCheckoutButton
                                      : planDescription?.variant_c_yearlyPriceCheckoutButton,
                                  quantity: 1,
                                },
                              ],
                            },
                            stripePKey,
                            window.location.origin + "/success",
                            window.location.href,
                            true
                            // setPKError
                          );
                        }}
                      >
                        {!usePlan[0]
                          ? "Processing..."
                          : planDescription?.checkoutButtonName}
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </Container>
    </section>
  );
}
export default React.memo(VariantC);
