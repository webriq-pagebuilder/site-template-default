import React from "react"
import BlockContent from "@sanity/block-content-to-react"


function VariantD({ heading, content }) {
  return (
    <section className="py-8">
      <h2 className="text-3xl mb-5 font-semibold font-heading text-center">{heading}</h2>
      {content && (
        <div className="grid grid-cols-3 px-20 gap-10">
          {content.map(block => {
              if (block._type !== 'block' || !block.children) {
                return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
              }
              return block.children.map((child, index) => (
                <div className="text-gray-400 text-justify leading-relaxed" key={index}>
                  {child?.text}
                </div>
              ))
            })
          }
        </div>
      )}
    </section>
  )
}

export default React.memo(VariantD)