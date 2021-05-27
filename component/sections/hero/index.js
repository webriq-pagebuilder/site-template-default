import React from "react"
import dynamic from "next/dynamic"

function Header({ template, data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    template,
    image: data?.variants?.[variant]?.mainImage,
    images: data?.variants?.[variant]?.arrImages,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    text: data?.variants?.[variant]?.plainText,
    primaryButton: data?.variants?.[variant]?.primaryButton,
    secondaryButton: data?.variants?.[variant]?.secondaryButton,
    videoLink: data?.variants?.[variant]?.youtubeLink,
    formFields: data?.variants?.[variant]?.form?.fields,
    formId: data?.variants?.[variant]?.form?.id,
    formName: data?.variants?.[variant]?.form?.name,
    links: data?.variants?.[variant]?.formLinks,
  }
  return <Variant {...props} />
}

export default React.memo(Header)
