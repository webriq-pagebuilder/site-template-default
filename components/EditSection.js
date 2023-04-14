import React from "react";
import { useMagicRouter } from 'hooks'
import { StudioLayout, StudioProvider } from "sanity"
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css"
import config from "sanity.config"


function EditSection({ documentType, documentId, children }) {
  const history = useMagicRouter(`/studio/desk/__edit__${documentId},type=${documentType}`)
  const [splitPane, setSplitPane] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("desktop")
  const [sizes, setSizes] = React.useState([350, 250]);

  const layoutCSS = {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll"
  };

  return (
    <>
      <button 
        id={documentType} 
        className={`font-medium rounded shadow-lg text-sm px-2 py-2.5 text-center inline-flex items-center mt-2 absolute right-2 z-40 ${
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
      {splitPane && (
        <div className="inline-flex absolute right-20 z-40">
          <button 
            type="button" 
            className={`${activeTab === "mobile" ? "bg-webriq-blue text-white": "bg-gray-50 text-black"} border border-webriq-blue hover:bg-webriq-blue hover:text-white font-medium rounded-l shadow-lg text-sm p-2.5 text-center inline-flex items-center mt-2`}
            onClick={() => {
              setSizes([375, 1024])
              setActiveTab("mobile")
            }}
          >
            {/* <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20 2c0-1.105-.896-2-2-2h-12c-1.105 0-2 .896-2 2v20c0 1.104.895 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.501 0h3.001c.276 0 .5.224.5.5s-.224.5-.5.5h-3.001c-.275 0-.499-.224-.499-.5s.224-.5.499-.5zm1.501 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm6-3h-12v-14.024h12v14.024z" />
            </svg>
            <span className="sr-only">Mobile preview</span> */}
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
            {/* <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-14zm-3 14h-18v-14h18v14zm1.5-6.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5z" />
            </svg>
            <span className="sr-only">Tablet preview</span> */}
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
            {/* <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
            </svg>
            <span className="sr-only">Desktop preview</span> */}
            Desktop
          </button>
        </div>
      )}
      {splitPane ? (
        <div style={{ height: 550 }}>
          <SplitPane
            sizes={sizes}
            onChange={setSizes}
            resizerSize={5}
            className="border-y border-webriq-darkblue"
            sashRender={() => (
              <SashContent style={{ backgroundColor: "#d5e3ff" }} />
            )}
          >
            <Pane minSize={350} maxSize="50%" style={{ ...layoutCSS }}>
              {children}
            </Pane>
            <Pane style={{ overflowY: "scroll" }}>
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
      ): children}
    </>
  )
}

export default EditSection
