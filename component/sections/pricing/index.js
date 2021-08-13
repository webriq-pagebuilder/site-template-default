import React from "react"
import dynamic from "next/dynamic"
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

const {
  NEXT_PUBLIC_DXP_STUDIO_ADDRESS 
} = process.env

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
    stripePKey: data?.variants?.[variant]?.stripeAccount?.stripePKey,
    accountId: data?.variants?.[variant]?.stripeAccount?.accountId,
    projectId: data?.variants?.[variant]?.stripeAccount?.projectId,
    documentId: data?.variants?.[variant]?.stripeAccount?.documentId,
    published,
    NEXT_PUBLIC_DXP_STUDIO_ADDRESS: NEXT_PUBLIC_DXP_STUDIO_ADDRESS || 'dxpstudio.webriq.com'
  }

  return (
    // <Elements stripe={stripePromise}>
      <Variant {...props} />
    // </Elements>
  )
}

export default React.memo(Pricing)
