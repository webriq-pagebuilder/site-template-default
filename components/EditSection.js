import React from "react";
import { useMagicRouter } from 'hooks'
import { StudioLayout, StudioProvider } from "sanity"
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css"
import config from "sanity.config"


function EditSection({ documentType, documentId, children }) {
  const history = useMagicRouter(`/studio/desk/__edit__${documentId},type=${documentType}`)
  const [splitPane, setSplitPane] = React.useState(false)

  const [sizes, setSizes] = React.useState([
    100,
    '30%',
    'auto',
  ]);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <button 
        id={documentType}
        className="p-2 border border-webriq-darkblue text-webriq-darkblue bg-white text-lg rounded-sm absolute right-0 z-50" 
        onClick={() => setSplitPane(!splitPane)}
      >
        {splitPane ? "Close" : "Edit"}
      </button>
      {splitPane ? (
        <div style={{ height: 500 }}>
          <SplitPane
            split='vertical'
            sizes={sizes}
            onChange={setSizes}
          >
            <Pane minSize={50} maxSize='50%'>
              <div className="bg-gray-50" style={{ ...layoutCSS }}>
                {children}
              </div>
            </Pane>
            <div className="overflow-scroll">
              <StudioProvider
                config={config}
                unstable_history={history}
                unstable_noAuthBoundary
              >
                <div className="inline-nav-panesearch inline-nav-paneheader inline-desk-listpane inline-footer">
                  <StudioLayout />
                </div>
              </StudioProvider>     
            </div>
          </SplitPane>
        </div>
      ): children}
    </>
  )
}

export default EditSection
