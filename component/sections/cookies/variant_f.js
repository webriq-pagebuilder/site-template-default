import React from "react";
import PortableText from "@sanity/block-content-to-react";
import { setCookie, getCookie } from "../../../utils/cookies";


function VariantF({ title, block, button1, button2 }) {
  let cookieExists = getCookie();
  const [showCookie, setShowCookie] = React.useState(cookieExists);

  //block element styling
  const serializers = {
    types: {
      block: (props) => (
        <p className="text-gray-400 text-sm my-7">{props.children}</p>
      )
    },
    marks: {
      internalLink: ({ children, mark }) => (
        <a className="hover:text-webriq-blue text-webriq-babyblue" href={mark.slug.current}>
          {children}
        </a>
      ),
      link: ({ children, mark }) => (
        mark.blank ? (
          <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
          <a className="hover:text-webriq-darkblue text-webriq-blue" href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
        )
      )
    }
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {!showCookie ?
        title && (
          <div className="max-w-md mx-4 md:mx-0 md:ml-10 mb-6 pt-8 bg-gray-800 text-white rounded-lg">
            <div className="px-8 text-center">
              <p className="font-bold font-heading">{title}</p>
              {block && <PortableText blocks={block} serializers={serializers} />}
            </div>
            <div className="flex border-t border-gray-700 text-center">
              {button1 && (
                <button
                  type="button"
                  className="inline-block w-1/2 py-4 text-sm rounded-bl-lg border-r border-gray-700 font-bold hover:bg-gray-700 transition duration-200"
                  onClick={() => {
                    setCookie("dismiss")
                    setShowCookie(!showCookie)
                  }}
                >
                  {button1}
                </button>
              )}
              {button2 && (
                <button
                  type="button"
                  className="inline-block w-1/2 py-4 text-sm rounded-br-lg text-webriq-blue font-bold hover:bg-webriq-darkblue transition duration-200"
                  onClick={() => {
                    setCookie("allow")
                    setShowCookie(!showCookie)
                  }}
                >
                  {button2}
                </button>
              )}
            </div>
          </div>
        )
        : null}
    </div>
  );
}
export default React.memo(VariantF);
