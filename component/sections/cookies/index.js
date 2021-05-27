import React from "react"
import dynamic from "next/dynamic"

function Cookies({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    title: component?.[variant]?.heading,
    text: component?.[variant]?.plainText,
    button1: component?.[variant]?.firstButton,
    button2: component?.[variant]?.secondButton,
    block: component?.[variant]?.block,
  }
  return <Variant {...props} />
}
export default React.memo(Cookies)
