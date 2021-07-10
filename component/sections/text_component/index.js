import React from "react"
import dynamic from "next/dynamic"

function TextComponent({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    heading: data?.variants?.[variant]?.heading,
    singleColumn: data?.variants?.[variant]?.singleColumn,
    firstColumn: data?.variants?.[variant]?.firstColumn,
    secondColumn: data?.variants?.[variant]?.secondColumn,
    thirdColumn: data?.variants?.[variant]?.thirdColumn
  }
  return <Variant {...props} />
}

export default React.memo(TextComponent)
