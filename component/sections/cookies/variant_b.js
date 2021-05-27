import React, { useState } from "react"

function VariantB({ title, text, button1, button2 }) {
  //to hide cookie component
  const [showCookie, setShowCookie] = useState(true)

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {showCookie
        ? title && (
            <div className="py-6 bg-gray-800 text-white">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4 items-center">
                  <div className="w-full lg:w-3/4 px-4">
                    <p className="font-bold font-heading">{title}</p>
                    <p className="mt-3 mb-6 text-gray-400 text-sm">{text}</p>
                  </div>
                  <div className="w-full lg:w-1/4 px-4 lg:text-right">
                    {button1 &&
                      (button1.match(/Accept|Allow|Ok|Yes/gi) ? (
                        <button
                          type="button"
                          className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-purple-600 hover:border-purple-700 bg-purple-600 hover:bg-purple-700 transition duration-500"
                          onClick={() => setShowCookie(!showCookie)}
                        >
                          {button1}
                        </button>
                      ) : button1.match(/Decline|Deny|No/gi) ? (
                        <button
                          type="button"
                          className="inline-block mr-4 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                          onClick={() => setShowCookie(!showCookie)}
                        >
                          {button1}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-purple-600 hover:border-purple-700 bg-purple-600 hover:bg-purple-700 transition duration-500"
                          onClick={() => setShowCookie(!showCookie)}
                        >
                          {button1}
                        </button>
                      ))}
                    {button2 &&
                      (button2.match(/Accept|Allow|Ok|Yes/gi) ? (
                        <button
                          type="button"
                          className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-purple-600 hover:border-purple-700 bg-purple-600 hover:bg-purple-700 transition duration-500"
                          onClick={() => setShowCookie(!showCookie)}
                        >
                          {button2}
                        </button>
                      ) : button2.match(/Decline|Deny|No/gi) ? (
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
                          className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-purple-600 hover:border-purple-700 bg-purple-600 hover:bg-purple-700 transition duration-500"
                          onClick={() => setShowCookie(!showCookie)}
                        >
                          {button2}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )
        : null}
    </div>
  )
}
export default React.memo(VariantB)
