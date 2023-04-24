import React from "react";
import { useMagicRouter } from "hooks";
import { StudioLayout, StudioProvider } from "sanity";
import { useRouter } from "next/router";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css"
import config from "sanity.config";


export default function InlineEditor({ document, showInlineEditor, children }) {
  const router = useRouter();
  const history = useMagicRouter(`/studio/desk/__edit__${document?.id},type=${document?.type}`)
  const initialWidth = typeof window !== "undefined" && window.innerWidth;
  const [splitPane, setSplitPane] = React.useState(false)
  const [sizes, setSizes] = React.useState([350, 250]);
  const [windowSize, setWindowSize] = React.useState({ width: initialWidth }); // the width of the window

  const whitelistedTypes = ["slotCart", "slotWishlist"];

  const windowResizeHandler = () => {
    const width = window.innerWidth

    setWindowSize({
      width: width,
    })
  }

  React.useEffect(() => {
    window.addEventListener("resize", windowResizeHandler);

    // remove event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", windowResizeHandler)
    }
  }, [])

  const layoutCSS = {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll"
  };

  if(!showInlineEditor) {
    return children;
  } 

  return (
    <div className={`show-button ${(!splitPane && !whitelistedTypes?.includes(document?.type)) && "inline-editor"}`}>
      {(windowSize?.width >= 1024 && !whitelistedTypes?.includes(document?.type)) && (
        <button 
          id={document?.type} 
          className={`hide font-medium shadow-lg px-2 py-2.5 text-sm text-center items-center mt-2 ${
            splitPane ? "bg-webriq-darkblue text-white hover:bg-webriq-blue hover:text-white" 
                : "bg-white text-webriq-darkblue border border-webriq-darkblue hover:bg-webriq-blue hover:text-white hover:border-webriq-blue"}`}
          onClick={() => setSplitPane(!splitPane)}
        >
          {!splitPane && (
            <svg className="fill-current w-4 h-4" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z" fillRule="nonzero" />
            </svg>
          )}
          <span>{splitPane && "Close"}</span>
        </button>
      )}
      {/* TODO: [Improvement] Add feature to view pane in different device screen sizes */}
      {/* {splitPane && windowSize?.width >= 1024 && (
        <div className="inline-flex absolute right-20 z-40">
          <button 
            type="button" 
            className={`${activeTab === "mobile" ? "bg-webriq-blue text-white": "bg-gray-50 text-black"} border border-webriq-blue hover:bg-webriq-blue hover:text-white font-medium rounded-l shadow-lg text-sm p-2.5 text-center inline-flex items-center mt-2`}
            onClick={() => {
              setSizes([375, 1024])
              setActiveTab("mobile")
            }}
          >
            Mobile
          </button>
          <button 
            type="button" 
            className={`${activeTab === "tablet" ? "bg-webriq-blue text-white": "bg-gray-50 text-black"} border-y border-webriq-blue hover:bg-webriq-blue hover:text-white font-medium shadow-lg text-sm p-2.5 text-center inline-flex items-center mt-2`}
            onClick={() => {
              setSizes([640, 1024])
              setActiveTab("tablet")
            }}
          >
            Tablet
          </button>
          <button 
            type="button" 
            className={`${activeTab === "desktop" ? "bg-webriq-blue text-white": "bg-gray-50 text-black"} border border-webriq-blue hover:bg-webriq-blue hover:text-white font-medium rounded-r shadow-lg text-sm p-2.5 text-center inline-flex items-center mt-2`}
            onClick={() => {
              setSizes([1024, 1024])
              setActiveTab("desktop")
            }}
          >
            Desktop
          </button>
        </div>
      )} */}
      {splitPane ? (
        windowSize?.width >= 1024 ? (
          <div className="h-screen">
            <SplitPane
              sizes={sizes}
              onChange={setSizes}
              resizerSize={5}
              className="border-y border-webriq-darkblue"
              sashRender={() => (
                <SashContent style={{ backgroundColor: "#d5e3ff" }} />
              )}
            >
              <Pane style={{ ...layoutCSS }}>
                {children}
              </Pane>
              <Pane minSize={350} maxSize="45%" style={{ overflowY: "scroll", ...layoutCSS }}>
                <StudioProvider
                  config={config}
                  unstable_history={history}
                  unstable_noAuthBoundary
                >
                  <div className="inline-nav-panesearch inline-nav-paneheader inline-desk-listpane inline-document-pane inline-field-label inline-field-variant inline-panel inline-pane-footer">
                    <StudioLayout />
                  </div>
                </StudioProvider>    
              </Pane>
            </SplitPane>
          </div>
        ) : (
          <>
            <div className="md:flex md:flex-wrap bg-webriq-darkblue text-white w-full shadow mt-2 z-30 text-center text-sm px-3 py-2.5">
              To continue using the inline editor, adjust screen width to DESKTOP view (screen width 1024px above).
              <button 
                id={document?.type} 
                className="font-medium text-sm text-center inline-flex items-center absolute ml-2 md:right-2 z-40"
                onClick={() => setSplitPane(!splitPane)}
              >
                Close
              </button>
            </div>
            {children}
          </>
        )
      ): children}
    </div>
  )
};