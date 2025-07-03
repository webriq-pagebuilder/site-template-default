import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { WebriQForm } from "@stackshift-ui/webriq-form";
import { thankYouPageLink } from "helper";
import { PortableText, urlFor } from "lib/sanity";
import { MyPortableTextComponents } from "types";
import { PricingProps } from ".";
import { Text } from "@stackshift-ui/text";
import { Button } from "@stackshift-ui/button";
import { Heading } from "@stackshift-ui/heading";
import { SwiperPagination } from "@stackshift-ui/swiper-pagination";
import { Input } from "@stackshift-ui/input";
import { FormField } from "@stackshift-ui/form-field";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";

// for Stripe
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function VariantD({
  caption,
  title,
  description,
  annualBilling,
  monthlyBilling,
  banner,
  formFields,
  formId,
  formName,
  formThankYouPage,
  block,
  signInLink,
  hashKey,
  apiVersion,
  stripeSKey,
  stripePKey,
  NEXT_PUBLIC_APP_URL,
}: PricingProps) {
  // const [pKeyError, setPKError] = React.useState(false);
  const [useCheckout, setUseCheckout] = React.useState({
    monthlyCheckout: "",
    yearlyCheckout: "",
  });
  const [banners, setBanners] = React.useState(0);
  const [billing, setBilling] = React.useState({ amount: 0, billType: "" });

  useEffect(() => {
    async function getPriceId() {
      const productPayload = {
        credentials: {
          hashKey,
          stripeSKey,
          apiVersion,
        },
        stripeParams: {
          id: `pricing-formPayment-${formId}-recurring-monthlyPrice-${monthlyBilling}-yearlyPrice-${annualBilling}`,
        },
      };

      const pricePayload = {
        credentials: {
          hashKey,
          stripeSKey,
          apiVersion,
        },
      };

      try {
        const product = await axios.post(
          `${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=products&action=retrieve`,
          productPayload
        );
        const { data } = await product.data;

        const prices = await axios.post(
          `${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=prices&action=list`,
          pricePayload
        );
        const pricesData = await prices.data;

        pricesData.data.map((price) => {
          if (
            price.product === data.id &&
            price.recurring.interval === "month"
          ) {
            useCheckout["monthlyCheckout"] = price.id;
          } else if (
            price.product === data.id &&
            price.recurring.interval === "year"
          ) {
            useCheckout["yearlyCheckout"] = price.id;
            setUseCheckout((prevState) => ({ ...prevState }));
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (apiVersion && hashKey && stripeSKey) {
      getPriceId();
    }
  }, []);

  const handleChange = (e) => {
    e.target.value === monthlyBilling
      ? setBilling({ amount: e.target.value, billType: "Monthly" })
      : setBilling({ amount: e.target.value, billType: "Annual" });
  };

  // block styling as props to `components` of the PortableText component
  const blockCustomization: MyPortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <Text className="text-xs">{children}</Text>;
      },
    },
    marks: {
      link: ({ children, value }) => (
        <a
          aria-label={value.href ?? "external link"}
          className="font-bold text-primary hover:text-primary"
          href={value.href}
        >
          {children}
        </a>
      ),
    },
  };

  const Form = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [showPassword, setShowPassword] = React.useState(false); // show or hide password field value
    const [checkedValue, setCheckedValue] = React.useState(1); // form default checkbox
    const [checked, setChecked] = React.useState([]); // setting selected value for input field checkbox type
    const [processing, setIsProcessing] = React.useState(false);
    const [paymentStatus, setPaymentStatus] = React.useState("idle");
    const [cardValidate, setCardValidate] = React.useState<any | undefined>({
      brand: "unknown",
      complete: false,
      error: "",
    });

    const handleCheckboxChange = (e) => {
      const { checked, value } = e.target;

      setCheckedValue(value);
      setChecked((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsProcessing(true);

      let data = {};

      formFields?.forEach((field) => {
        const formData = new FormData(
          document.querySelector(`form[name='${formName}']`)
        ).get(field.name);

        if (field.pricingType === "inputCard") {
          data[field.name] = "************************";
        } else {
          data[field.name] = formData;
        }
      });

      if (elements == null) {
        return;
      }

      const { data: monthlyBilling_ClientSecret } = await axios.post(
        "/api/paymentIntent",
        {
          amount: +monthlyBilling * 100,
          stripeSKey: stripeSKey,
          hashKey,
        }
      );

      const { data: yearlyBilling_ClientSecret } = await axios.post(
        "/api/paymentIntent",
        {
          amount: +annualBilling * 100,
          stripeSKey: stripeSKey,
          hashKey,
        }
      );

      const payload = await stripe?.confirmCardPayment(
        billing.billType === "Monthly"
          ? monthlyBilling_ClientSecret
          : yearlyBilling_ClientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (payload?.error) {
        setIsProcessing(false);
        setPaymentStatus("failed");
        setCardValidate({ ...cardValidate, error: "error" });
        return;
      } else {
        setPaymentStatus("success");
        
        const response = await fetch("/api/submitForm", {
          method: "POST",
          body: JSON.stringify({ data, id: formId }),
        });

        if (response.ok) {
          setPaymentStatus("success");
          setIsProcessing(false);
        } else {
          setPaymentStatus("failed");
          setIsProcessing(false);
        }
      }
    };

    return (
      <div className="w-full mb-8 md:mb-0 md:w-1/2">
        <div className="px-6 py-8 text-center lg:px-8">
          <Text className="mb-8 text-2xl">{formName}</Text>
          {formFields && (
            <WebriQForm
              stripepkey={stripePKey}
              method="POST"
              data-form-id={
                cardValidate?.error === undefined &&
                cardValidate?.brand !== "unknown" &&
                cardValidate?.complete
                  ? formId
                  : undefined
              }
              name={formName}
              className="form-pricing space-y-2"
              data-thankyou-url={thankYouPageLink(formThankYouPage)}
              scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              onSubmit={handleSubmit}
            >
              {formFields?.map((field, index) => {
                return (
                  <React.Fragment key={index}>
                    {field?.pricingType === "inputCard" ? (
                      <div className="mb-4">
                        <CardElement
                          onChange={(e) => setCardValidate(e)}
                          className="w-full p-4 text-xs leading-none rounded-global outline-none bg-gray-50"
                        />
                        {paymentStatus === "success" ? (
                          <div className="text-xs font-semibold leading-none py-4 text-left mt-3 text-green-600">
                            Payment Success!
                          </div>
                        ) : paymentStatus === "failed" ? (
                          <div className="text-xs font-semibold leading-none py-4 text-left mt-3 text-red-600">
                            {`Something went wrong! Payment can't be processed.`}
                          </div>
                        ) : null}
                      </div>
                    ) : field?.pricingType === "inputPassword" ? (
                      <div className="flex my-4 rounded-global bg-gray-100">
                        <Input
                          noLabel
                          autoComplete="new-password"
                          ariaLabel={field?.placeholder ?? field?.name}
                          className="w-full px-4 py-2 leading-none rounded-global text-xs outline-none bg-gray-100"
                          type={showPassword ? "text" : "password"}
                          placeholder={field?.placeholder}
                          name={field?.name}
                          required={field?.isRequired}
                          readOnly={!billing.billType}
                        />
                        {/* SVG icon on the right of the password input field */}
                        <Button
                          variant="unstyled"
                          as="button"
                          ariaLabel={
                            showPassword ? "Show password" : "Hide password"
                          }
                          className="pr-4 focus:outline-none bg-gray-100 rounded-global"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                          disabled={!billing.billType}
                        >
                          {showPassword ? (
                            <svg
                              className="w-5 h-5 my-auto ml-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="img"
                              width="1em"
                              height="1em"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 16 16"
                            >
                              <g fill="currentColor">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z" />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 my-auto ml-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="img"
                              width="1em"
                              height="1em"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 16 16"
                            >
                              <g fill="currentColor">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0z" />
                              </g>
                            </svg>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <FormField
                        type={field?.pricingType || field?.type}
                        name={field?.name}
                        required={field?.isRequired}
                        readOnly={!billing.billType}
                        noLabel
                        variant="secondary"
                        {...field}
                      />
                    )}
                  </React.Fragment>
                );
              })}
              <div className="mb-5 text-sm text-left text-gray-500">
                <label className="inline-flex mt-5">
                  <input
                    aria-label="Agree to terms"
                    className="mx-2 items-center"
                    type="checkbox"
                    name="terms"
                    value={checkedValue}
                    onChange={handleCheckboxChange}
                    checked={checked.some((v) => v === checkedValue)}
                  />
                  <PortableText
                    value={block}
                    components={blockCustomization}
                    onMissingComponent={false} // Disabling warnings / handling unknown types
                  />
                </label>
              </div>
              <div>
                <div className="webriq-recaptcha" />
              </div>
              <Button
                as="button"
                id="submitBtn"
                ariaLabel="Submit Pricing Form button"
                type="submit"
                className={`w-full ${
                  (!formId || billing.billType === "" || processing || !cardValidate?.complete || cardValidate?.empty) &&
                  "cursor-not-allowed disabled:opacity-50"
                }`}
                disabled={!formId || billing.billType === "" || processing || !cardValidate?.complete || cardValidate?.empty}
              >
                {processing
                  ? "Processing Payment...."
                  : `Buy ${billing.billType} Supply`}
              </Button>
            </WebriQForm>
          )}
          {signInLink?.label && (
            <Text muted className="text-xs mt-3">
              Already have an account?{" "}
              <Button
                as="link"
                variant="link"
                link={signInLink}
                className="text-xs hover:underline"
                ariaLabel={signInLink?.label}
              >
                {signInLink?.label}
              </Button>
            </Text>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="p-5 sm:p-20 bg-background">
      <Container>
        <Container maxWidth={672} className="mb-16 text-center">
          <Container maxWidth={512}>
            <Text weight="bold" className="text-primary">
              {caption}
            </Text>
            {title && <Heading>{title}</Heading>}
            <Text muted className="mb-8 ">
              {description}
            </Text>
          </Container>
          <Flex wrap justify="center">
            {monthlyBilling && (
              <label className="flex items-center w-full mb-2 mr-8 sm:w-auto md:mr-4">
                <input
                  aria-label={`Select ${monthlyBilling}`}
                  type="radio"
                  name="billing"
                  defaultValue={monthlyBilling}
                  onChange={(e) => handleChange(e)}
                />
                <span className="mx-2 font-semibold">Monthly Billing</span>
                <span className="inline-flex items-center justify-center w-16 h-10 font-semibold text-white rounded-lg bg-primary">
                  ${monthlyBilling}
                </span>
              </label>
            )}
            {annualBilling && (
              <label className="flex items-center w-full mb-2 sm:w-auto">
                <input
                  aria-label={`Select ${annualBilling}`}
                  type="radio"
                  name="billing"
                  defaultValue={annualBilling}
                  onChange={(e) => handleChange(e)}
                />
                <span className="mx-2 font-semibold">Annual Billing</span>
                <span className="inline-flex items-center justify-center w-16 h-10 font-semibold text-white rounded-lg bg-primary">
                  ${annualBilling}
                </span>
              </label>
            )}
          </Flex>
        </Container>
        <Flex wrap className="bg-white rounded shadow">
          <Form />
          <div className="flex flex-col w-full [@media(min-width:768px)]:h-[424.8px] [@media(min-width:978px)]:h-[406.8px] py-10 overflow-hidden bg-primary md:w-1/2 lg:rounded-tr">
            {banner?.[banners]?.mainImage?.image?.asset?._ref && (
              <div className="w-full mx-auto my-auto md:max-w-xs">
                <Image
                  className="object-cover"
                  src={urlFor(banner?.[banners]?.mainImage.image)}
                  sizes="100vw"
                  width={320}
                  height={296}
                  alt={`pricing-image-${banners}`}
                />
              </div>
            )}
            <Text className="max-w-sm mx-auto mb-4 sm:text-xl text-center text-white">
              {banner?.[banners]?.title}
            </Text>
            <div className="text-center">
              {banner?.map((item, index) => (
                <SwiperPagination
                  colorScheme="white"
                  isActive={banners === index}
                  ariaLabel={`Page ${index} button`}
                  key={item?._key}
                  onClick={() => setBanners(index)}
                />
              ))}
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantD);
