import React from "react";
import PortableText from "@sanity/block-content-to-react";
import { setCookie, getCookie } from "../../../utils/cookies";


function VariantE({ title, block, button1, button2 }) {
  let cookieExists = getCookie();
  const [showCookie, setShowCookie] = React.useState(cookieExists);

  //block element styling
  const serializers = {
    types: {
      block: (props) => (
        <p className="text-gray-400 text-sm my-5">{props.children}</p>
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
          <div className="max-w-md mx-4 md:mx-0 md:ml-10 mb-6 p-8 bg-gray-800 text-white rounded-lg">
            <div className="text-center">
              <p className="font-bold font-heading">{title}</p>
              {block && <PortableText blocks={block} serializers={serializers} />}
              {button1 && (
                <button
                  type="button"
                  className="inline-block mr-3 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-webriq-blue hover:border-webriq-darkblue bg-webriq-blue hover:bg-webriq-darkblue transition duration-500"
                  onClick={() => {
                    setCookie("allow")
                    setShowCookie(!showCookie)
                  }}
                >
                  {button1}
                </button>
              )}
              {button2 && (
                <button
                  type="button"
                  className="inline-block mr-4 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                  onClick={() => {
                    setCookie("dismiss")
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
export default React.memo(VariantE);
