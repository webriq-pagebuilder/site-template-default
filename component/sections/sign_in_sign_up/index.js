import React from "react"
import dynamic from "next/dynamic"

function SignUpForm({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    logo: component?.[variant]?.logo,
    title: component?.[variant]?.heading,
    subtitle: component?.[variant]?.subtitle,
    text: component?.[variant]?.plainText,
    firstButton: component?.[variant]?.primaryButton,
    secondButton: component?.[variant]?.secondaryButton,
    formFields: component?.[variant]?.form?.fields,
    formId: component?.[variant]?.form?.id,
    formName: component?.[variant]?.form?.name,
    links: component?.[variant]?.formLinks,
  }
  return <Variant {...props} />
}
export default React.memo(SignUpForm)
