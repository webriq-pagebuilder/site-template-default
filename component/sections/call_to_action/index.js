import React from "react"
import dynamic from "next/dynamic"

function CallToAction({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    logo: component?.[variant]?.logo,
    title: component?.[variant]?.heading,
    text: component?.[variant]?.plainText,
    button: component?.[variant]?.primaryButton,
    features: component?.[variant]?.tags,
    formFields: component?.[variant]?.form?.fields,
    formId: component?.[variant]?.form?.id,
    formName: component?.[variant]?.form?.name,
    links: component?.[variant]?.formLinks,
  }
  return <Variant {...props} />
}
export default React.memo(CallToAction)
