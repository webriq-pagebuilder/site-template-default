import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";

function VariantE({ title, block, allowCookieBtn, denyCookieBtn }) {
  const [showCookie, setShowCookie] = React.useState(() => getCookie());

  //block element styling
  const serializers = {
    types: {
      block: (props) => (
        <p className="text-gray-400 text-sm my-5">{props.children}</p>
      ),
    },
    marks: {
      link: ({ children, mark }) => (
        <a
          aria-label={children ?? "external link"}
          className="hover:text-webriq-lightblue text-blue-400"
          target="_blank"
          href={mark.href}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {!showCookie
        ? title && (
            <div className="max-w-md mx-4 md:mx-0 md:ml-10 mb-6 p-8 bg-gray-800 text-white rounded-lg">
              <div className="text-center">
                <p className="font-bold font-heading">{title}</p>
                {block && (
                  <PortableText blocks={block} serializers={serializers} />
                )}
                {allowCookieBtn && (
                  <button
                    aria-label="Allow Cookies button"
                    type="button"
                    className="inline-block mr-3 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-webriq-darkblue bg-webriq-darkblue hover:bg-webriq-blue hover:border-webriq-blue transition duration-500"
                    onClick={() => {
                      setCookie("allow");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {allowCookieBtn}
                  </button>
                )}
                {denyCookieBtn && (
                  <button
                    aria-label="Deny Cookies button"
                    type="button"
                    className="inline-block mr-4 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                    onClick={() => {
                      setCookie("dismiss");
                      setShowCookie(!showCookie);
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
export default React.memo(VariantE);
