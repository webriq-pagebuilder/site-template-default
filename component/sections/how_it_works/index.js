import React from "react"
import dynamic from "next/dynamic"

function HowItWorks({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variants = dynamic(() => import(`./${variant}`))
  const props = {
    subtitle: component?.[variant]?.subtitle,
    title: component?.[variant]?.heading,
    text: component?.[variant]?.plainText,
    video: component?.[variant]?.url,
    steps: component?.[variant]?.arrayOfTitleAndText,
  }
  return <Variants {...props} />
}
export default React.memo(HowItWorks)
