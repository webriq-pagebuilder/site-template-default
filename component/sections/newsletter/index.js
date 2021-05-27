import React from "react"
import dynamic from "next/dynamic"

function Newsletter({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    logo: component?.[variant]?.logo,
    title: component?.[variant]?.heading,
    description: component?.[variant]?.description,
    formFields: component?.[variant]?.form?.fields,
    formId: component?.[variant]?.form?.id,
    formName: component?.[variant]?.form?.name,
  }
  return <Variant {...props} />
}
export default React.memo(Newsletter)
