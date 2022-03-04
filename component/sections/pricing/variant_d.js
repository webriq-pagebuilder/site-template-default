import React from "react";
import WebriQForm from "component/webriq-form";
import Link from "next/link";
import { PortableText, urlFor } from "lib/sanity";
import Image from "next/image";
import { initiateCheckout } from "lib/checkout";
import {
  CardElement,
  Elements,
  CardCvcElement,
  CardExpiryElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import router from "next/router";

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
  block,
  signInLink,
  hashKey,
  apiVersion,
  stripeSecretKey,
  stripePKey,
  _key,
  NEXT_PUBLIC_DXP_STUDIO_ADDRESS,
}) {
  // const [pKeyError, setPKError] = React.useState(false);
  const [useCheckout, setUseCheckout] = React.useState({
    monthlyCheckout: "",
    yearlyCheckout: "",
  });
  const [banners, setBanners] = React.useState(0);
  const [billing, setBilling] = React.useState({ amount: 0, billType: "" });
  const [paymentOngoing, setPaymentOngoing] = React.useState(false)
  const stripePromise = loadStripe(stripePKey);

  const handleChange = (e) => {
    e.target.value === monthlyBilling
      ? setBilling({ amount: e.target.value, billType: "Monthly" })
      : setBilling({ amount: e.target.value, billType: "Annual" });
  };

  async function getPriceId() {
    const productPayload = {
      credentials: {
        hashKey,
        stripeSecretKey,
        apiVersion,
      },
      id: `dxpstudio-pricing-${_key}-FormPayment-recurring-monthlyPrice-${monthlyBilling}-yearlyPrice-${annualBilling}`,
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
        if (price.product === productData.id) {
          if (price.recurring.interval === "month") {
            useCheckout["monthlyCheckout"] = price.id;
            setUseCheckout((prevState) => ({ ...prevState }));
          } else {
            useCheckout["yearlyCheckout"] = price.id;
            setUseCheckout((prevState) => ({ ...prevState }));
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getPriceId();
  }, []);

  const serializers = {
    types: {
      block: (props) => <p className="text-xs">{props.children}</p>,
    },
    marks: {
      link: ({ children, mark }) => (
        <a
          aria-label={children ?? "external link"}
          className="text-webriq-darkblue font-bold hover:text-webriq-darkblue"
          href={mark.href}
        >
          {children}
        </a>
      ),
    },
  };

  const Form = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (event) => {
      event.preventDefault();
      let data = {};

      formFields.forEach((field) => {
        const formData = new FormData(
          document.querySelector(`form[name='${formName}']`)
        ).get(field.name);        
        data?.[field.name] = formData
      });
      
      setPaymentOngoing(true)
      if (elements == null) {
        return;
      }
      const { data: monthlyBilling_ClientSecret } = await axios.post(
        "/api/paymentIntent",
        {
          amount: monthlyBilling * 100,
          stripeSKey: stripeSecretKey,
          hashKey,
        }
      );

      const { data: yearlyBilling_ClientSecret } = await axios.post(
        "/api/paymentIntent",
        {
          amount: annualBilling * 100,
          stripeSKey: stripeSecretKey,
          hashKey,
        }
      );

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        billing.billType === "Monthly"
          ? monthlyBilling_ClientSecret
          : yearlyBilling_ClientSecret,
        {
          payment_method: paymentMethod?.id,
        }
      );
      if (error) {
        console.log(error);       
      }
      if(paymentIntent){
        const response = await fetch("/api/submitForm", {
          method: "POST",
          body: JSON.stringify({ data, id: formId }),
        });
        const responseData = await response.json();
        setPaymentOngoing(false)
        if(responseData.message === "OK"){
          router.push('/success')
        }
      }    
      // setPaymentOngoing(false)
    };

    return (
      <form className="w-full md:w-1/2 mb-8 md:mb-0" id="webriqForm">
        <div className="px-6 py-8 lg:px-8 text-center">
          {/* <span className="text-gray-700">{title}</span> */}
          <p className="mb-8 text-2xl font-heading">{formName}</p>          
          {formFields && (
            <div className="max-w-md lg:mx-auto">
              <WebriQForm
                stripePKey={stripePKey}
                method="POST"
                data-form-id={formId}
                name={formName}
                className="form-contacts"
                // data-thankyou-url="/thank-you"
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                {
                  formFields?.map(field => {
                    return (
                      <div>
                      {
                      field.type === "textarea" ? (
                      <div className="mb-4">
                        <textarea
                          aria-label={`${field?.name} text area`}
                          className="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-white rounded outline-none"
                          type="text"
                          placeholder={field?.name}
                          name={field?.name}
                        />
                      </div>
                    ) : field.type === "inputFile" ? (
                      <div className="mb-4">
                        <label className="flex px-2 bg-white rounded">
                          <input
                            aria-label="Add file"
                            className="hidden"
                            type="file"
                            placeholder="Choose file.."
                            name={field?.name}
                          />
                          <div className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-500 hover:bg-gray-600 rounded cursor-pointer transition duration-200">
                            Browse
                          </div>
                        </label>
                      </div>
                    ) : field.type === "inputCard" ? (
                      <div className="mb-4">
                        <CardElement />
                        {/* {paymentOngoing && <div style={{textAlign: 'left', marginTop: 12, fontSize: 12}}>Please provide a correct card details</div>} */}
                      </div>
                    ) : (
                      <div className="mb-4">
                        <input
                          aria-label={`${
                            field?.type === "inputText"
                              ? `Input ${field?.name}`
                              : `${field?.type}`
                          }`}
                          className="w-full p-4 text-xs font-semibold leading-none bg-white rounded outline-none"
                          type={
                            field.type === "inputEmail"
                              ? "email"
                              : field.type === "inputPassword"
                              ? "password"
                              : "text"
                          }
                          placeholder={
                            field.type === "inputEmail"
                              ? "name@email.com"
                              : field.type === "inputPassword"
                              ? "Enter your password"
                              : field?.name
                          }
                          name={field?.name}
                        />
                      </div>
                      )}
                  </div>
                    )
                  })
                }               
                <div className="text-left mb-5 text-sm text-gray-500">
                  <label className="inline-flex">
                    <input
                      aria-label={`Agree to ${block}?`}
                      className="mr-2"
                      type="checkbox"
                      name="terms"
                      defaultValue={1}
                    />
                    <PortableText blocks={block} serializers={serializers} />
                  </label>
                </div>
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                <button
                  id="submitBtn"
                  aria-label="Submit Pricing Form button"
                  onClick={(e) => handleSubmit(e)}
                  // type="submit"
                  // onClick={() =>
                  //   initiateCheckout(
                  //     {
                  //       lineItems: [
                  //         {
                  //           price:
                  //             billing.billType === "Monthly"
                  //               ? useCheckout.monthlyCheckout
                  //               : useCheckout.yearlyCheckout,
                  //           quantity: 1,
                  //         },
                  //       ],
                  //     },
                  //     stripePKey,
                  //     window.location.origin + "/success",
                  //     window.location.href,
                  //     true,
                  //     setPKError
                  //   )
                  // }
                  className={`block w-full p-4 text-center text-white font-bold leading-none bg-webriq-blue hover:bg-webriq-darkblue rounded-l-xl rounded-t-xl transition duration-200 ${
                    billing.billType === "" &&
                    "disabled:opacity-50 cursor-not-allowed"
                  }`}
                  disabled={billing.billType === ""}
                >
                  Buy {billing.billType} Supply
                </button>
              </WebriQForm>
            </div>
          )}
          {signInLink?.label && (
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              {signInLink?.type === "linkInternal" ? (
                <Link
                  href={
                    signInLink?.internalLink === "Home" ||
                    signInLink?.internalLink === "home"
                      ? "/"
                      : `/${
                          signInLink?.internalLink === undefined
                            ? "page-not-found"
                            : signInLink?.internalLink
                        }`
                  }
                >
                  <a
                    aria-label={`Pricing ${
                      signInLink?.label ?? "Sign In"
                    } link`}
                    className="text-webriq-darkblue hover:underline"
                    target={signInLink?.linkTarget}
                    rel={
                      signInLink?.linkTarget === "_blank"
                        ? "noopener noreferrer"
                        : null
                    }
                  >
                    &nbsp;{signInLink?.label}
                  </a>
                </Link>
              ) : (
                <a
                  aria-label={`Pricing ${signInLink?.label ?? "Sign In"} link`}
                  className="text-webriq-darkblue hover:underline"
                  target={signInLink?.linkTarget}
                  href={`${
                    signInLink.externalLink === undefined
                      ? "link-not-found"
                      : signInLink.externalLink
                  }`}
                  rel={
                    signInLink?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  &nbsp;{signInLink?.label}
                </a>
              )}
            </p>
          )}
        </div>
      </form>
    );
  };

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-2xl mx-auto text-center">
            <div className="max-w-lg mx-auto">
              <span className="text-webriq-darkblue font-bold">{caption}</span>
              <h1 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
              <p className="mb-8 text-gray-500">{description}</p>
            </div>
            <div className="flex flex-wrap justify-center">
              {monthlyBilling && (
                <label className="md:mr-4 w-full sm:w-auto flex items-center mr-8 mb-2">
                  <input
                    aria-label={`Select ${monthlyBilling}`}
                    type="radio"
                    name="billing"
                    defaultValue={monthlyBilling}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="mx-2 font-semibold">Monthly Billing</span>
                  <span className="inline-flex items-center justify-center w-16 h-10 bg-webriq-darkblue text-white font-semibold rounded-lg">
                    ${monthlyBilling}
                  </span>
                </label>
              )}
              {annualBilling && (
                <label className="flex w-full sm:w-auto items-center mb-2">
                  <input
                    aria-label={`Select ${annualBilling}`}
                    type="radio"
                    name="billing"
                    defaultValue={annualBilling}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="mx-2 font-semibold">Annual Billing</span>
                  <span className="inline-flex items-center justify-center w-16 h-10 bg-webriq-darkblue text-white font-semibold rounded-lg">
                    ${annualBilling}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="flex flex-wrap bg-white rounded shadow">           
            <Elements stripe={stripePromise}>
              <Form />
            </Elements>
            <div className="py-10 w-full md:w-1/2 bg-webriq-darkblue lg:rounded-r overflow-hidden flex flex-col">
              {banner?.[banners]?.mainImage && (
                <div className="w-full md:max-w-xs mx-auto my-auto">
                  <Image
                    src={urlFor(banner?.[banners]?.mainImage)}
                    layout="responsive"
                    width="320px"
                    height="296px"
                    objectFit="cover"
                    alt={`pricing-image-${banners}`}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
              <p className="mb-4 max-w-sm mx-auto text-center text-xl text-white">
                {banner?.[banners]?.title}
              </p>
              <div className="text-center">
                {banner?.map((item, index) => (
                  <button
                    aria-label={`Page ${index} button`}
                    key={item?._key}
                    className={` ${
                      banners === index
                        ? "focus:outline-none inline-block mr-2 w-2 h-2 bg-white rounded-full"
                        : "focus:outline-none inline-block mr-2 w-2 h-2 bg-webriq-babyblue rounded-full"
                    } `}
                    onClick={() => setBanners(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
