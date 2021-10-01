import React from "react"
import BlockContent from "@sanity/block-content-to-react"


function VariantC({ heading, firstColumn, secondColumn, thirdColumn }) {
  // block styling as props to `serializers` of the BlockContent component
  const serializers = {
    types: {
      block: (props) => {
        const style = props.node.style || "normal";
        switch (style) {
          case "h1":
            return <h1 className="mb-6 leading-loose text-gray-900"></h1>;
          case "h2":
            return <h2 className="mb-6 leading-loose text-gray-900"></h2>;
          case "h3":
            return <h3 className="mb-6 leading-loose text-gray-900"></h3>;
          case "h4":
            return <h4 className="mb-6 leading-loose text-gray-900"></h4>;
          case "normal":
            return (
              <p className="text-gray-500 text-justify leading-relaxed mb-5">
                {props.children}
              </p>
            );
          case "blockquote":
            return (
              <blockquote className="mb-6 px-14 leading-loose italic text-gray-500">
                - {props.children}
              </blockquote>
            );
        }

        if (/^h\d/.test(style)) {
          const level = style.replace(/[^\d]/g, "");
          return React.createElement(
            style,
            { className: `heading-${level}` },
            props.children
          );
        }
      },
      code: (props) => {
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>;
      },
    },
    list: (props) =>
      props.type === "bullet" ? (
        <ul className="mb-6 pl-10 leading-loose text-gray-900 list-disc">
          {props.children}
        </ul>
      ) : (
        <ol className="mb-6 leading-loose text-gray-900 list-decimal">
          {props.children}
        </ol>
      ),
    listItem: (props) =>
      props.type === "bullet" ? (
        <li className="mb-6 leading-loose text-gray-900">{props.children}</li>
      ) : (
        <li className="mb-6 leading-loose text-gray-900">{props.children}</li>
      ),
    marks: {
      strong: (props) => <strong>{props.children}</strong>,
      em: (props) => <em>{props.children}</em>,
      code: (props) => <code>{props.children}</code>,
      link: ({ children, mark }) => (
        <a
          className="hover:text-webriq-darkorange text-webriq-lightorange"
          href={mark.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <section className="py-20 px-4">
      <h2 className="text-3xl mb-5 font-semibold font-heading text-center">
        {heading}
      </h2>
      <div className="flex flex-wrap -mx-3 justify-center">
        {firstColumn && (
          <div className="md:w-1/4 px-3 mb-6 md:mb-0 text-gray-500 text-justify leading-relaxed">
            <BlockContent blocks={firstColumn} serializers={serializers} />
          </div>
        )}
        {secondColumn && (
          <div className="md:w-1/4 px-3 mb-6 md:mb-0 text-gray-500 text-justify leading-relaxed">
            <BlockContent blocks={secondColumn} serializers={serializers} />
          </div>
        )}
        {thirdColumn && (
          <div className="md:w-1/4 px-3 mb-6 md:mb-0 text-gray-500 text-justify leading-relaxed">
            <BlockContent blocks={thirdColumn} serializers={serializers} />
          </div>
        )}
      </div>
    </section>
  );

}
export default React.memo(VariantC)