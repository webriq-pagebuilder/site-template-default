import React from "react"
import dynamic from "next/dynamic"

function Stats({ data }) {
  const component = data?.variants
  const variant = component?.variant
  const Variant = dynamic(() => import(`./${variant}`))
  const props = {
    stats: component?.[variant]?.statItems,
  }
  return <Variant {...props} />
}
export default React.memo(Stats)
