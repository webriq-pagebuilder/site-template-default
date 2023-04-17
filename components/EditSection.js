import React from "react";
import { useMagicRouter } from 'hooks'
import { StudioLayout, StudioProvider } from "sanity"
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css"
import config from "sanity.config"


function EditSection({ documentType, documentId, children }) {
  const history = useMagicRouter(`/studio/desk/__edit__${documentId},type=${documentType}`)
  const [splitPane, setSplitPane] = React.useState(false)
  const [sizes, setSizes] = React.useState([350, 250]);
  const [windowSize, setWindowSize] = React.useState({ width: window.innerWidth }); // the width of the window

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

  return (
    <>
      {windowSize?.width >= 1024 && (
        <button 
          id={documentType} 
          className={`font-medium rounded shadow-lg px-2 py-2.5 text-sm text-center inline-flex items-center mt-2 absolute right-2 z-40 ${
            splitPane ? "bg-webriq-darkblue text-white hover:bg-webriq-blue hover:text-white" 
                : "bg-white text-webriq-darkblue border border-webriq-darkblue hover:bg-webriq-blue hover:text-white hover:border-webriq-blue"}`}
          onClick={() => setSplitPane(!splitPane)}
        >
          {!splitPane && (
            <svg className="fill-current w-4 h-4 mr-2" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero" />
            </svg>
          )}
          <span>{splitPane ? "Close" : "Edit"}</span>
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
                id={documentType} 
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
    </>
  )
}

export default EditSection
