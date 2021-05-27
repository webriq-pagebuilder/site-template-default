import React from "react"
import dynamic from "next/dynamic"

function Footer({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    logo: component?.[variant]?.logo,
    text: component?.[variant]?.plainText,
    contacts: component?.[variant]?.contactDetails,
    copyright: component?.[variant]?.copyright,
    socialMedia: component?.[variant]?.socialLinks,
    menu: component?.[variant]?.menu,
  }
  return <Variant {...props} />
}
export default React.memo(Footer)
