import React from "react";
import { PortableText } from "lib/sanity";
import { textComponentBlockStyling } from "./variant_a";

function VariantC({ heading, firstColumn, secondColumn, thirdColumn }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-xl lg:text-3xl mb-5 font-semibold font-heading text-center">
          {heading}
        </h1>
        <div className="flex flex-wrap mx-auto justify-center">
          {firstColumn && (
            <div className="lg:w-1/4 px-3 mb-6 md:mb-0 text-gray-500 text-xs lg:text-base text-justify leading-relaxed">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
          {secondColumn && (
            <div className="lg:w-1/4 px-3 mb-6 md:mb-0 text-gray-500 text-xs lg:text-base text-justify leading-relaxed">
              <PortableText
                value={secondColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
          {thirdColumn && (
            <div className="lg:w-1/4 px-3 mb-6 md:mb-0 text-gray-500 text-xs lg:text-base text-justify leading-relaxed">
              <PortableText
                value={thirdColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
