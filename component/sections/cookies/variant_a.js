import React from "react";
import { setCookie, getCookie } from "utils/cookies"


function VariantA({ title, text, allowCookieBtn, denyCookieBtn }) {
  const [showCookie, setShowCookie] = React.useState(() => {
    const cookieExists = getCookie();
    return cookieExists;
  });

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {!showCookie ? (
        <div className="container mx-auto px-4">
          {title && (
            <div className="flex flex-wrap items-center mb-6 p-6 bg-gray-800 text-white rounded-lg">
              <div className="w-full lg:w-3/4 px-4">
                <p className="font-bold font-heading">{title}</p>
                <p className="mt-3 mb-6 text-gray-400 text-sm">{text}</p>
              </div>
              <div className="lg:w-1/4 px-4 lg:text-right">
                {allowCookieBtn &&
                  <button
                    type="button"
                    className="inline-block m-2 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-webriq-blue hover:border-webriq-darkblue bg-webriq-blue hover:bg-webriq-darkblue transition duration-500"
                    onClick={() => {
                      setCookie("allow")
                      setShowCookie(!showCookie)
                    }}
                  >
                    {allowCookieBtn}
                  </button>
                }
                {denyCookieBtn &&
                  <button
                    type="button"
                    className="inline-block m-2 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                    onClick={() => {
                      setCookie("dismiss")
                      setShowCookie(!showCookie)
                    }}
                  >
                    {denyCookieBtn}
                  </button>
                }
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default React.memo(VariantA);
