import React from "react"
import dynamic from "next/dynamic"

function Navigation({ template, data }) {
  const variant = data?.variants?.variant

  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    template,
    logo: data?.variants?.[variant]?.logo?.image,
    links: data?.variants?.[variant]?.routes,
    primaryButton: data?.variants?.[variant]?.primaryButton,
    secondaryButton: data?.variants?.[variant]?.secondaryButton,
  }

  return <Variant {...props} />
}
export default React.memo(Navigation)
