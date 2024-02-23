import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";
import { PricingProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Heading, Text, Button, Card } from "components/ui";

function VariantA({
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
    async function getPriceId(plans: PricingProps["plans"]) {
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

    if (apiVersion && hashKey && stripeSKey) {
      getPriceId(usePlan);
    }
  }, [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, stripeSKey, usePlan]);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={672} className="mb-16 text-center">
          {caption && (
            <Text weight="bold" className="text-primary">
              {caption}
            </Text>
          )}

          {title && <Heading className="mb-2">{title}</Heading>}
          {description && (
            <Text muted className="mb-6">
              {description}
            </Text>
          )}
          {plans?.[0]?.monthlyPrice && (
            <div className="inline-block px-1 py-1 bg-white rounded-lg">
              <Button
                as="button"
                variant="custom"
                ariaLabel="Monthly Plan"
                className={`mr-1 px-4 py-2 text-sm bg-white hover:bg-white ${
                  plan === "monthly"
                    ? "rounded-lg bg-gray-50 text-gray-900 shadow"
                    : "text-gray-500"
                } font-bold hover:text-gray-900 focus:outline-none`}
                onClick={() => setPlan("monthly")}
              >
                Monthly
              </Button>
              <Button
                as="button"
                variant="custom"
                ariaLabel="Yearly Plan"
                className={`px-4 py-2 text-sm bg-white hover:bg-white ${
                  plan === "yearly"
                    ? "rounded-lg bg-gray-50 text-gray-900 shadow"
                    : "text-gray-500"
                } font-bold focus:outline-none`}
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
        <Flex wrap>
          {usePlan?.map((planDetail, index) => {
            return (
              <div
                className="w-full px-4 mb-8 md:w-1/2 lg:mb-5 lg:w-1/3"
                key={planDetail._key}
              >
                <Card
                  className={`p-8 ${
                    index % 2 !== 0 ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  <Heading
                    type="h4"
                    className={`mb-2 text-2xl ${
                      index % 2 !== 0 && "text-white"
                    }`}
                  >
                    {planDetail.planType}
                  </Heading>
                  <span
                    className={`text-6xl font-bold ${
                      index % 2 !== 0 && "text-white"
                    }`}
                  >
                    {isNaN(parseInt(planDetail.monthlyPrice))
                      ? planDetail.monthlyPrice
                      : `$${
                          plan === "yearly"
                            ? comma.format(+planDetail.yearlyPrice)
                            : comma.format(+planDetail.monthlyPrice)
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
                  <Text
                    className={`mb-6 mt-3 ${
                      index % 2 !== 0 ? "text-white" : "text-gray-500"
                    } leading-loose`}
                  >
                    {planDetail.description}
                  </Text>
                  <ul
                    className={`mb-6 ${
                      index % 2 !== 0 ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {planDetail.planIncludes?.map((include) => (
                      <li className="flex mb-2" key={include}>
                        <svg
                          className={`mr-2 h-5 w-5 ${
                            index % 2 !== 0
                              ? "text-baby-darkblue"
                              : "text-primary"
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
                  <Button
                    as="button"
                    ariaLabel={planDetail.checkoutButtonName}
                    className={`inline-block w-full rounded-l-xl rounded-t-xl px-4 py-2 text-center ${
                      index % 2 !== 0
                        ? "bg-white text-black hover:bg-white"
                        : "bg-primary text-white  hover:bg-primary-foreground"
                    } cursor-pointer font-bold leading-loose transition duration-200 ${
                      !planDetail ||
                      ("variant_a_monthlyPriceCheckoutButton" in planDetail &&
                        !planDetail?.variant_a_monthlyPriceCheckoutButton &&
                        "cursor-not-allowed bg-gray-100 disabled:opacity-50")
                    }`}
                    disabled={
                      !planDetail ||
                      ("variant_a_monthlyPriceCheckoutButton" in planDetail &&
                        !planDetail?.variant_a_monthlyPriceCheckoutButton)
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
                        true
                        // setPKError
                      );
                    }}
                  >
                    {!planDetail
                      ? "Processing..."
                      : planDetail.checkoutButtonName}
                  </Button>
                </Card>
              </div>
            );
          })}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
