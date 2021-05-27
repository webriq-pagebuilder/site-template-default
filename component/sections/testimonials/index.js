import React from "react"
import dynamic from "next/dynamic"

function Testimonial({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    testimonials: data?.variants?.[variant]?.testimonials,
  }
  return <Variant {...props} />
}

export default React.memo(Testimonial)
