import React from "react"
import dynamic from "next/dynamic"

function Portfolio({ template, data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    template,
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    images: data?.variants?.[variant]?.arrImages,
    primaryButton: data?.variants?.[variant]?.primaryButton,
    portfolios: data?.variants?.[variant]?.portfolios,
  }
  return <Variant {...props} />
}
export default React.memo(Portfolio)
