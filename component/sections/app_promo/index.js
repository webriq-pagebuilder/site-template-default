import React from "react"
import dynamic from "next/dynamic"

function AppPromo({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    logo: component?.[variant]?.logo,
    subtitle: component?.[variant]?.subtitle,
    title: component?.[variant]?.heading,
    description: component?.[variant]?.description,
    statistics: component?.[variant]?.statItems,
    features: component?.[variant]?.tags,
    images: component?.[variant]?.arrImages,
  }
  return <Variant {...props} />
}
export default React.memo(AppPromo)
