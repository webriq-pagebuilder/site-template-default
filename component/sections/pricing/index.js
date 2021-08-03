import React from "react"
import dynamic from "next/dynamic"
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

function Pricing({ data, published }) {
  const variant = data?.variants?.variant  
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    plans: data?.variants?.[variant]?.plans,
    annualBilling: data?.variants?.[variant]?.annualBilling,
    monthlyBilling: data?.variants?.[variant]?.monthlyBilling,
    banner: data?.variants?.[variant]?.banner,
    form: data?.variants?.[variant]?.form,
    published,
    stripeSKey: data?.variants?.[variant]?.stripeSKey,
    stripePKey: data?.variants?.[variant]?.stripePKey
  }

  return (
    // <Elements stripe={stripePromise}>
      <Variant {...props} />
    // </Elements>
  )
}

export default React.memo(Pricing)
