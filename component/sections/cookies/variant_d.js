import React from "react";
import PortableText from "@sanity/block-content-to-react";
import { setCookie, getCookie } from "utils/cookies";

function VariantD({ title, block, allowCookieBtn, denyCookieBtn }) {
  const [showCookie, setShowCookie] = React.useState(() => getCookie());

  //block element styling
  const serializers = {
    types: {
      block: (props) => (
        <p className="text-gray-400 text-sm my-5">{props.children}</p>
      ),
    },
    marks: {
      internalLink: ({ children, mark }) => (
        <a
          className="hover:text-webriq-blue text-webriq-babyblue"
          href={mark.slug.current}
        >
          {children}
        </a>
      ),
      link: ({ children, mark }) =>
        mark.blank ? (
          <a href={mark.href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a
            className="hover:text-webriq-darkblue text-webriq-blue"
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
    <div className="fixed bottom-0 inset-x-0 z-50">
      {!showCookie
        ? title && (
            <div className="max-w-md lg:max-w-3xl mx-4 md:mx-0 md:ml-10 mb-6 py-6 pl-6 pr-16 bg-gray-800 text-white rounded-lg">
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full lg:w-1/2 px-4">
                  <p className="font-bold font-heading">{title}</p>
                  {block && (
                    <PortableText blocks={block} serializers={serializers} />
                  )}
                </div>
                <div className="w-full lg:w-1/2 px-4 lg:text-right">
                  {allowCookieBtn && (
                    <button
                      aria-label="Allow Cookies button"
                      type="button"
                      className="mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-webriq-blue hover:border-webriq-darkblue bg-webriq-blue hover:bg-webriq-darkblue transition duration-500"
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
                      className="m-2 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
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
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantD);
