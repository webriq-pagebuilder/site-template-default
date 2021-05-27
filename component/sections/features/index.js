import React from "react"
import dynamic from "next/dynamic"

function Features({ /* template*/ data }) {
  const variant = data?.variants?.variant

  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    features: data?.variants?.[variant]?.arrayOfTitleAndDescription,
    featureItems: data?.variants?.[variant]?.tags,
    featuredItems: data?.variants?.[variant]?.featuredItems,
    image: data?.variants?.[variant]?.images?.[0],
    images: data?.variants?.[variant]?.images,
    primaryButton: data?.variants?.[variant]?.primaryButton,
  }
  return <Variant {...props} />
}

export default React.memo(Features)
