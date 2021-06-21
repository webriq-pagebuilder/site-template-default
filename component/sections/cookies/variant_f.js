import React, { useState } from "react";
import PortableText from "@sanity/block-content-to-react";

function VariantF({ title, block, button1, button2 }) {
  //to hide cookie component
  const [showCookie, setShowCookie] = useState(true);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {showCookie
        ? title && (
            <div className="max-w-md mx-4 md:mx-0 md:ml-10 mb-6 pt-8 bg-gray-800 text-white rounded-lg">
              <div className="px-8 text-center">
                <p className="font-bold font-heading">{title}</p>
                <span className="mt-3 mb-6 text-gray-400 text-sm">
                  {block && <PortableText blocks={block} />}
                </span>
              </div>
              <div className="flex border-t border-gray-700 text-center">
                {button1 &&
                  (button1.match(/Accept|Allow|Ok|Yes/gi) ? (
                    <button
                      type="button"
                      className="inline-block w-1/2 py-4 text-sm rounded-br-lg border-r text-webriq-darkblue font-bold hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button1}
                    </button>
                  ) : button1.match(/Decline|Deny|No/gi) ? (
                    <button
                      type="button"
                      className="inline-block w-1/2 py-4 text-sm rounded-bl-lg border-r border-gray-700 font-bold hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button1}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-block w-1/2 py-4 text-sm rounded-br-lg border-r text-webriq-darkblue font-bold hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button1}
                    </button>
                  ))}
                {button2 &&
                  (button2.match(/Accept|Allow|Ok|Yes/gi) ? (
                    <button
                      type="button"
                      className="inline-block w-1/2 py-4 text-sm rounded-br-lg border-r text-webriq-darkblue font-bold hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button2}
                    </button>
                  ) : button2.match(/Decline|Deny|No/gi) ? (
                    <button
                      type="button"
                      className="inline-block w-1/2 py-4 text-sm rounded-bl-lg border-r border-gray-700 font-bold hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button2}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-block w-1/2 py-4 text-sm rounded-br-lg border-r text-webriq-darkblue font-bold hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button2}
                    </button>
                  ))}
              </div>
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantF);
