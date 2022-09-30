import React from "react";
import { PortableText } from "lib/sanity";

// block styling as props to `components` of the PortableText component
export const textComponentBlockStyling = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-6 text-7xl leading-loose text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-6 text-5xl leading-loose text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className="mb-6 text-3xl leading-loose text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className="mb-6 text-xl leading-loose text-gray-900">{children}</h4>
      );
    },
    normal: ({ children }) => {
      return (
        <p className="text-gray-500 text-justify leading-relaxed mb-5">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 px-14 leading-loose italic text-gray-500">
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    <pre data-language={value.language}>
      <code>{value.code}</code>
    </pre>;
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul className="mb-6 pl-10 leading-loose text-gray-900 list-disc">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="mb-6 leading-loose text-gray-900 list-decimal">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        aria-label={children ?? "external link"}
        className="hover:text-webriq-lightblue text-webriq-blue"
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

function VariantA({ heading, firstColumn }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-xl lg:text-3xl mb-5 font-semibold font-heading text-center">
          {heading}
        </h1>
        <div className="flex flex-wrap mx-auto justify-center">
          {firstColumn && (
            <div className="md:w-1/2 mb-2 md:mb-0 text-xs lg:text-base">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
