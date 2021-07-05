import React from "react"
import dynamic from "next/dynamic"

function TextComponent({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    heading: data?.variants?.[variant]?.heading,
    content: data?.variants?.[variant]?.content,
    firstColumn: data?.variants?.[variant]?.firstContent,
    secondColumn: data?.variants?.[variant]?.secondContent,
    thirdColumn: data?.variants?.[variant]?.thirdContent
  }
  return <Variant {...props} />
}

export default React.memo(TextComponent)
