import React from "react";
import { setCookie, getCookie } from "utils/cookies";


function VariantC({ title, text, allowCookieBtn, denyCookieBtn }) {
  const cookieExists = () => getCookie();
  const [showCookie, setShowCookie] = React.useState(cookieExists);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {!showCookie ?
        title && (
          <div className="max-w-md p-6 px-10 mx-4 md:mx-0 md:ml-10 mb-6 bg-gray-800 text-white rounded-lg">
            <div className="text-center">
              <p className="font-bold font-heading">{title}</p>
              <p className="mt-3 mb-6 text-gray-400 text-sm">{text}</p>
              {allowCookieBtn && (
                <button
                  type="button"
                  className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-webriq-blue hover:border-webriq-darkblue bg-webriq-blue hover:bg-webriq-darkblue transition duration-500"
                  onClick={() => {
                    setCookie("allow")
                    setShowCookie(!showCookie)
                  }}
                >
                  {allowCookieBtn}
                </button>
              )}
              {denyCookieBtn && (
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
              )}
            </div>
          </div>
        )
        : null}
    </div>
  );
}
export default React.memo(VariantC);
