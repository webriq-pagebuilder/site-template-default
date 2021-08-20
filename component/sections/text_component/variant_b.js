import React from "react";
import BlockContent from "@sanity/block-content-to-react";

function VariantB({ heading, firstColumn, secondColumn }) {
  const serializers = {
    types: {
      block: (props) => (
        <p className="text-gray-500 text-justify leading-relaxed mb-5">
          {props.children}
        </p>
      ),
    },
    marks: {
      internalLink: ({ children, mark }) => (
        <a className="hover:text-red-400 text-red-800" href={mark.slug.current}>
          {children}
        </a>
      ),
      link: ({ children, mark }) =>
        mark.blank ? (
          <a href={mark.href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a className="hover:text-blue-400 text-blue-800" href={mark.href}>
            {children}
          </a>
        ),
    },
  };

  return (
    <section className="py-20">
      <h2 className="text-3xl mb-5 font-semibold font-heading text-center">
        {heading}
      </h2>
      <div className="flex flex-wrap -mx-10 justify-center">
        {firstColumn && (
          <div className="w-1/4 px-5 mb-6 text-gray-500 text-justify leading-relaxed">
            <BlockContent blocks={firstColumn} serializers={serializers} />
          </div>
        )}
        {secondColumn && (
          <div className="w-1/4 px-5 mb-6 md:mb-0 text-gray-500 text-justify leading-relaxed">
            <BlockContent blocks={secondColumn} serializers={serializers} />
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantB);
