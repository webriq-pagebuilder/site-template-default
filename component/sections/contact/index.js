import React from "react"
import dynamic from "next/dynamic"

function Contact({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    contactDescription: data?.variants?.[variant]?.contactDescription,
    officeInformation: data?.variants?.[variant]?.officeInformation,
    contactEmail: data?.variants?.[variant]?.contactEmail,
    contactNumber: data?.variants?.[variant]?.contactNumber,
    socialLinks: data?.variants?.[variant]?.socialLinks,
    formFields: data?.variants?.[variant]?.form?.fields,
    formId: data?.variants?.[variant]?.form?.id,
    formName: data?.variants?.[variant]?.form?.name,
  }
  return <Variant {...props} />
}
export default React.memo(Contact)
