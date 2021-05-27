import React from "react"
import dynamic from "next/dynamic"

function FAQs({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    subtitle: component?.[variant]?.subtitle,
    title: component?.[variant]?.heading,
    faqs: component?.[variant]?.askedQuestions,
    faqsWithCategories: component?.[variant]?.faqsWithCategory,
  }
  return <Variant {...props} />
}
export default React.memo(FAQs)
