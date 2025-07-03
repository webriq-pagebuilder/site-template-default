import { NEXT_PUBLIC_APP_URL } from "../../config";

const retrieveProducts = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=products&action=retrieve`;

const createProducts = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=products&action=create`;

const createPriceForProduct = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=prices&action=create`;

// const updateProducts = `${
//   NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
// }/api/payments/stripe?resource=products&action=update`;

const updatePriceForProduct = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=prices&action=update`;

const listOfPrices = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=prices&action=list`;

export const processData = async (payload) => {
  const { data, variant, type } = payload;

  const logError = (context, error) => {
    console.error(`[${context}] Error Details:`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context: {
        type,
        variant,
        hasData: !!data,
        hasStripeAcc: !!data?.selectStripeAccount,
      },
    });
  };

  if (type === "pricing") {
    try {
      let stripeAcc;
      if (data?.selectStripeAccount) {
        try {
          stripeAcc = JSON.parse(data.selectStripeAccount);
        } catch (error) {
          logError("Stripe Account Parsing", error);
          return {
            status: 500,
            statusText: "Invalid stripe account data format",
          };
        }
      }

      if (!stripeAcc && data) {
        console.warn("[Validation] Missing stripe account");
        return {
          status: 500,
          statusText: `Select a stripe account. If you haven't had any, please create under payments`,
        };
      }

      if (variant !== "variant_d" && !data?.plans && data) {
        console.warn("[Validation] Missing plans data");
        return {
          status: 500,
          statusText: `You should add at least one plan for your pricing.`,
        };
      }

      if (
        variant === "variant_d" &&
        (!data?.monthlyBilling || !data?.annualBilling) &&
        data
      ) {
        console.warn("[Validation] Missing billing data for variant_d");
        return {
          status: 500,
          statusText: `"Monthly Billing" and "Annual Billing" should not be blank.`,
        };
      }

      // If variant is equal to a or c, then will create the annual and monthly billing. Otherwise if variant is b, then it will create the plans under pricing
      if (
        variant === "variant_a" ||
        (variant === "variant_c" && stripeAcc && data?.plans && data)
      ) {
        // iterate all over the plan to create the product that is ready for checkout
        let i = 0;
        const { plans } = data;
        for (; i < plans.length; ) {
          try {
            console.log(
              `[Processing] Starting to process plan ${i + 1} of ${
                plans.length
              }`
            );

            if (!plans[i].planType) {
              console.warn(`[Validation] Missing plan type for plan ${i + 1}`);
              return {
                status: 500,
                statusText: `Plan Type should not be blank on plan ${i + 1}`,
              };
            } else if (!plans[i].monthlyPrice || !plans[i].yearlyPrice) {
              console.warn(
                `[Validation] Missing price data for plan "${plans[i].planType}"`
              );
              return {
                status: 500,
                statusText: `Monthly Price and Yearly Price should not be blank on plan "${plans[i].planType}"`,
              };
            }

            const credentials = {
              stripeSKey: stripeAcc.stripeSKey,
              hashKey: stripeAcc.hashKey,
              apiVersion: stripeAcc.apiVersion,
            };

            const productId = `pricing-${plans[i]._key}-${i + 1}-${plans[
              i
            ].planType.replace(/ /g, "-")}-recurring-monthlyPrice-${
              plans[i].monthlyPrice
            }-yearlyPrice-${plans[i].yearlyPrice}`;

            console.log(
              `[Processing] Attempting to retrieve product: ${productId}`
            );

            const productPayload = {
              credentials,
              stripeParams: {
                id: productId,
              },
            };

            const response = await fetch(retrieveProducts, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(productPayload),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { meta } = await response.json();

            if (meta.status === 404) {
              // If Product not found it will create it
              const createProductPayload = {
                credentials,
                stripeParams: {
                  id: productId,
                  metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,
                  name: plans[i].planType,
                  description: plans[i].description,
                },
              };

              const createProduct = await fetch(createProducts, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(createProductPayload),
              });

              if (!createProduct.ok) {
                throw new Error(`HTTP error! status: ${createProduct.status}`);
              }

              const { id } = await createProduct.json();

              // Create price if successfully created a product
              if (id) {
                // Yearly Price
                const yearlyPricePayload = {
                  credentials,
                  stripeParams: {
                    product: id,
                    currency: "usd",
                    metadata: !plans[i].planIncludes
                      ? {}
                      : plans[i].planIncludes,
                    unit_amount: isNaN(parseInt(plans[i].yearlyPrice))
                      ? 0
                      : plans[i].yearlyPrice * 100,
                    recurring: {
                      interval: "year",
                    },
                  },
                };

                const createYearlyPrice = await fetch(createPriceForProduct, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(yearlyPricePayload),
                });

                if (!createYearlyPrice.ok) {
                  throw new Error(
                    `HTTP error! status: ${createYearlyPrice.status}`
                  );
                }

                await createYearlyPrice.json();

                // Monthly Price
                const monthlyPricePayload = {
                  credentials,
                  stripeParams: {
                    product: id,
                    currency: "usd",
                    metadata: !plans[i].planIncludes
                      ? {}
                      : plans[i].planIncludes,
                    unit_amount: isNaN(parseInt(plans[i].monthlyPrice))
                      ? 0
                      : plans[i].monthlyPrice * 100,
                    recurring: {
                      interval: "month",
                    },
                  },
                };

                const createMonthlyPrice = await fetch(createPriceForProduct, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(monthlyPricePayload),
                });

                if (!createMonthlyPrice.ok) {
                  throw new Error(
                    `HTTP error! status: ${createMonthlyPrice.status}`
                  );
                }

                await createMonthlyPrice.json();
              }
            } else {
              const payload = {
                credentials,
                stripeParams: {},
              };

              const getPrices = await fetch(listOfPrices, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(payload),
              });

              if (!getPrices.ok) {
                throw new Error(`HTTP error! status: ${getPrices.status}`);
              }

              const { data } = await getPrices.json();

              const prices = data.filter((item) => item.product === productId);

              if (prices.length >= 2) {
                for (const price of prices) {
                  if (price.recurring.interval === "month") {
                    const monthlyPricePayload = {
                      credentials,
                      stripeParams: {
                        id: price.id,
                        currency: "usd",
                        metadata: !plans[i].planIncludes
                          ? {}
                          : plans[i].planIncludes,
                        unit_amount: isNaN(parseInt(plans[i].monthlyPrice))
                          ? 0
                          : plans[i].monthlyPrice * 100,
                        recurring: {
                          interval: "month",
                        },
                      },
                    };

                    const updateMonthlyPrice = await fetch(
                      updatePriceForProduct,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(monthlyPricePayload),
                      }
                    );

                    if (!updateMonthlyPrice.ok) {
                      throw new Error(
                        `HTTP error! status: ${updateMonthlyPrice.status}`
                      );
                    }

                    await updateMonthlyPrice.json();
                  } else {
                    const yearlyPricePayload = {
                      credentials,
                      stripeParams: {
                        id: price.id,
                        currency: "usd",
                        metadata: !plans[i].planIncludes
                          ? {}
                          : plans[i].planIncludes,
                        unit_amount: isNaN(parseInt(plans[i].yearlyPrice))
                          ? 0
                          : plans[i].yearlyPrice * 100,
                        recurring: {
                          interval: "year",
                        },
                      },
                    };

                    const updateYearlyPrice = await fetch(
                      updatePriceForProduct,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(yearlyPricePayload),
                      }
                    );

                    if (!updateYearlyPrice.ok) {
                      throw new Error(
                        `HTTP error! status: ${updateYearlyPrice.status}`
                      );
                    }

                    await updateYearlyPrice.json();
                  }
                }
              }
            }
          } catch (error) {
            logError(`Plan Processing - Plan ${i + 1}`, error);
            return {
              status: 500,
              statusText: `Failed to process plan ${i + 1}: ${error.message}`,
            };
          }
          console.log(`[Success] Completed processing plan ${i + 1}`);
          i++;
        }
      } else if (variant === "variant_b" && stripeAcc && data?.plans && data) {
        // iterate all over the plan to create the product that is ready for checkout
        let i = 0;
        const { plans } = data;
        for (; i < plans.length; ) {
          try {
            console.log(
              `[Processing] Starting to process one-time plan ${i + 1} of ${
                plans.length
              }`
            );

            if (!plans[i].planType) {
              console.warn(`[Validation] Missing plan type for plan ${i + 1}`);
              return {
                status: 500,
                statusText: `Plan Type should not be blank on plan ${i + 1}`,
              };
            } else if (!plans[i].price) {
              console.warn(
                `[Validation] Missing price for plan "${plans[i].planType}"`
              );
              return {
                status: 500,
                statusText: `Price should not be blank on plan "${plans[i].planType}"`,
              };
            }

            const credentials = {
              stripeSKey: stripeAcc.stripeSKey,
              hashKey: stripeAcc.hashKey,
              apiVersion: stripeAcc.apiVersion,
            };

            const productId = `pricing-${plans[i]._key}-${i + 1}-${plans[
              i
            ].planType.replace(/ /g, "-")}-oneTime-Payment-${plans[i].price}`;

            const productPayload = {
              credentials,
              stripeParams: {
                id: productId,
              },
            };

            const response = await fetch(retrieveProducts, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(productPayload),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { meta } = await response.json();

            if (meta.status === 404) {
              const createProductPayload = {
                credentials,
                stripeParams: {
                  id: productId,
                  metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,
                  name: plans[i].planType,
                  description: plans[i].description,
                },
              };

              const createProduct = await fetch(createProducts, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(createProductPayload),
              });

              if (!createProduct.ok) {
                throw new Error(`HTTP error! status: ${createProduct.status}`);
              }

              const { id } = await createProduct.json();

              if (id) {
                const oneTimePaymentPayload = {
                  credentials,
                  stripeParams: {
                    product: id,
                    currency: "usd",
                    metadata: !plans[i].planIncludes
                      ? {}
                      : plans[i].planIncludes,
                    unit_amount: isNaN(parseInt(plans[i].price))
                      ? 0
                      : plans[i].price * 100,
                  },
                };

                const createPrice = await fetch(createPriceForProduct, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(oneTimePaymentPayload),
                });

                if (!createPrice.ok) {
                  throw new Error(`HTTP error! status: ${createPrice.status}`);
                }

                await createPrice.json();
              }
            } else {
              const payload = {
                credentials,
                stripeParams: {},
              };

              const getPrices = await fetch(listOfPrices, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(payload),
              });

              if (!getPrices.ok) {
                throw new Error(`HTTP error! status: ${getPrices.status}`);
              }

              const { data } = await getPrices.json();

              const price = data.find((item) => item.product === productId);

              if (price) {
                const updateOneTimePaymentPayload = {
                  credentials,
                  stripeParams: {
                    id: price.id,
                    currency: "usd",
                    metadata: !plans[i].planIncludes
                      ? {}
                      : plans[i].planIncludes,
                    unit_amount: isNaN(parseInt(plans[i].price))
                      ? 0
                      : plans[i].price * 100,
                  },
                };

                const updatePrice = await fetch(updatePriceForProduct, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(updateOneTimePaymentPayload),
                });

                if (!updatePrice.ok) {
                  throw new Error(`HTTP error! status: ${updatePrice.status}`);
                }

                await updatePrice.json();
              }
            }
          } catch (error) {
            logError(`One-Time Plan Processing - Plan ${i + 1}`, error);
            return {
              status: 500,
              statusText: `Failed to process plan ${i + 1}: ${error.message}`,
            };
          }
          console.log(`[Success] Completed processing one-time plan ${i + 1}`);
          i++;
        }
      } else if (
        variant === "variant_d" &&
        stripeAcc &&
        data?.monthlyBilling &&
        data?.annualBilling &&
        data?.form
      ) {
        try {
          console.log("[Processing] Starting to process form payment setup");

          if (!data.form.id) {
            console.warn("[Validation] Missing form ID");
            return {
              status: 500,
              statusText: `Form ID should not be blank`,
            };
          } else if (!data.monthlyBilling || !data.annualBilling) {
            console.warn("[Validation] Missing billing information");
            return {
              status: 500,
              statusText: `Monthly Billing and Annual Billing should not be blank`,
            };
          }

          const credentials = {
            stripeSKey: stripeAcc.stripeSKey,
            hashKey: stripeAcc.hashKey,
            apiVersion: stripeAcc.apiVersion,
          };

          const productId = `pricing-formPayment-${data.form.id}-recurring-monthlyPrice-${data.monthlyBilling}-yearlyPrice-${data.annualBilling}`;

          const createProductPayload = {
            credentials,
            stripeParams: {
              id: productId,
              name: "Form Payment",
              description: data?.form?.name || "",
            },
          };

          const createProduct = await fetch(createProducts, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(createProductPayload),
          });

          if (!createProduct.ok) {
            throw new Error(`HTTP error! status: ${createProduct.status}`);
          }

          const { id } = await createProduct.json();

          if (id) {
            // Yearly Price
            const yearlyPricePayload = {
              credentials,
              stripeParams: {
                product: id,
                currency: "usd",
                unit_amount: isNaN(parseInt(data.annualBilling))
                  ? 0
                  : data.annualBilling * 100,
                recurring: {
                  interval: "year",
                },
              },
            };

            const createYearlyPrice = await fetch(createPriceForProduct, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(yearlyPricePayload),
            });

            if (!createYearlyPrice.ok) {
              throw new Error(
                `HTTP error! status: ${createYearlyPrice.status}`
              );
            }

            await createYearlyPrice.json();

            // Monthly Price
            const monthlyPricePayload = {
              credentials,
              stripeParams: {
                product: id,
                currency: "usd",
                unit_amount: isNaN(parseInt(data.monthlyBilling))
                  ? 0
                  : data.monthlyBilling * 100,
                recurring: {
                  interval: "month",
                },
              },
            };

            const createMonthlyPrice = await fetch(createPriceForProduct, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(monthlyPricePayload),
            });

            if (!createMonthlyPrice.ok) {
              throw new Error(
                `HTTP error! status: ${createMonthlyPrice.status}`
              );
            }

            await createMonthlyPrice.json();
          }
        } catch (error) {
          logError("Form Payment Processing", error);
          return {
            status: 500,
            statusText: `Failed to process form payment: ${error.message}`,
          };
        }
        console.log("[Success] Completed processing form payment setup");
      }

      console.log("[Success] All processing completed successfully");
      return { status: 200, statusText: "Success" };
    } catch (error) {
      logError("Process Data", error);
      return {
        status: 500,
        statusText: `An unexpected error occurred: ${error.message}`,
      };
    }
  }
};
