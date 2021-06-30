import React from "react"
import BlockContent from "@sanity/block-content-to-react"


function VariantB({ heading, content }) {
  const serializers = {
    marks: {
      internalLink: ({ children, mark }) => (
        <a className="hover:text-red-400 text-red-800" href={mark.slug.current}>
          {children}
        </a>
      ),
      link: ({ children, mark }) => (
        mark.blank ? (
          <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
          <a className="hover:text-blue-400 text-blue-800" href={mark.href}>{children}</a>
        )
      )
    }
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl mb-5 font-semibold font-heading text-center">{heading}</h2>
      {content && (
        <div className="flex flex-wrap -mx-10 justify-center">
          <div className="w-1/4 px-5 mb-6">
            <p className="text-gray-400 text-justify leading-relaxed">
              <BlockContent blocks={content?.[0]} serializers={serializers} />
            </p>
          </div>
          <div className="w-1/4 px-5 mb-6 md:mb-0">
            <p className="text-gray-400 text-justify leading-relaxed">
              <BlockContent blocks={content?.[1]} serializers={serializers} />
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
export default React.memo(VariantB)