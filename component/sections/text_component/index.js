import React from "react"
import dynamic from "next/dynamic"

function TextComponent({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    heading: data?.variants?.[variant]?.heading,
    content: data?.variants?.[variant]?.paragraph
  }
  return <Variant {...props} />
}

export default React.memo(TextComponent)
