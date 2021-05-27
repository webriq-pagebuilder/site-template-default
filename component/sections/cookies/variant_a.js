import React, { useState } from "react"

function VariantA({ title, text, button1, button2 }) {
  //to hide cookie component
  const [showCookie, setShowCookie] = useState(true)

  return (
    <div className="fixed bottom-0 z-50">
      {showCookie ? (
        <div className="container mx-auto px-4">
          {title && (
            <div className="flex flex-wrap items-center mb-6 p-6 bg-gray-800 text-white rounded-lg">
              <div className="w-full lg:w-3/4 px-4">
                <p className="inline-flex font-bold font-heading">{title}</p>
                <p className="mt-3 mb-6 text-gray-400 text-sm">{text}</p>
              </div>
              <div className="lg:w-1/4 px-4 lg:text-right">
                {button1 &&
                  (button1.match(/Accept|Allow|Ok|Yes/gi) ? (
                    <button
                      type="button"
                      className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-green-600 hover:border-green-700 bg-green-600 hover:bg-green-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button1}
                    </button>
                  ) : button1.match(/Decline|Deny|No/gi) ? (
                    <button
                      type="button"
                      className="inline-block py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button1}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-green-600 hover:border-green-700 bg-green-600 hover:bg-green-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button1}
                    </button>
                  ))}
                {button2 &&
                  (button2.match(/Accept|Allow/gi) ? (
                    <button
                      type="button"
                      className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-green-600 hover:border-green-700 bg-green-600 hover:bg-green-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button2}
                    </button>
                  ) : button2.match(/Decline|Deny/gi) ? (
                    <button
                      type="button"
                      className="inline-block mr-4 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button2}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-green-600 hover:border-green-700 bg-green-600 hover:bg-green-700 transition duration-500"
                      onClick={() => setShowCookie(!showCookie)}
                    >
                      {button2}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
export default React.memo(VariantA)
