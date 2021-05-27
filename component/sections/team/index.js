import React from "react"
import dynamic from "next/dynamic"
function Team({ data }) {
  const variant = data?.variants?.variant
  const Variant = dynamic(() => import(`./${variant}`))

  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    team: data?.variants?.[variant]?.teams,
  }
  return <Variant {...props} />
}

export default React.memo(Team)
