import React from "react"
import dynamic from "next/dynamic"

const {
  NEXT_PUBLIC_APP_URL 
} = process.env

function Pricing({ data, published}) {
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
    NEXT_PUBLIC_DXP_STUDIO_ADDRESS: NEXT_PUBLIC_APP_URL || 'https://dxpstudio.webriq.com'
  }

  return (
      <Variant {...props} />
  )
}

export default React.memo(Pricing)
