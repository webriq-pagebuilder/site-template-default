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

  return (
    <>
      <button 
        id={documentType} 
        className="bg-white border border-webriq-darkblue hover:bg-webriq-blue hover:text-white text-webriq-darkblue font-semibold p-2 rounded shadow inline-flex items-center absolute right-0 z-50"
        onClick={() => setSplitPane(!splitPane)}
      >
        {!splitPane && (
          <svg className="fill-current w-4 h-4 mr-2" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero" />
          </svg>
        )}
        <span>{splitPane ? "Close" : "Edit"}</span>
      </button>
      {splitPane ? (
        <div style={{ height: 500 }}>
          <SplitPane
            sizes={sizes}
            onChange={setSizes}
            resizerSize={10}
            className="border-y border-webriq-darkblue"
            sashRender={() => (
              <SashContent style={{ backgroundColor: "#d5e3ff" }} />
            )}
          >
            <Pane style={{ overflowY: "scroll" }}>
              <div className="bg-gray-50 overflow-y-scroll">
                {children}
              </div>
            </Pane>
            <Pane minSize={50} maxSize='50%' style={{ overflowY: "scroll" }}>
              <StudioProvider
                config={config}
                unstable_history={history}
                unstable_noAuthBoundary
              >
                <div className="inline-nav-panesearch inline-nav-paneheader inline-desk-listpane inline-footer">
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
