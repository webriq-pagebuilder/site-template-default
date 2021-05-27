import React from "react"
import dynamic from "next/dynamic"

function LogoCloud({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    title: component?.[variant]?.heading,
    images: component?.[variant]?.arrImages,
    text: component?.[variant]?.plainText,
    button: component?.[variant]?.primaryButton,
  }
  return <Variant {...props} />
}
export default React.memo(LogoCloud)
