import React from "react"
import dynamic from "next/dynamic"

function Blog({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    posts: data?.variants?.[variant]?.blogs,
    primaryButton: data?.variants?.[variant]?.primaryButton,
  }
  return <Variant {...props} />
}
export default React.memo(Blog)
