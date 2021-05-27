import React from "react"
import dynamic from "next/dynamic"

function Pricing({ data }) {
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
  }

  return <Variant {...props} />
}

export default React.memo(Pricing)
