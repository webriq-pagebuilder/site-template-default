import { useMagicRouter } from "hooks";
import { useMediaQuery } from "hooks/useMediaQuery";
import config from "sanity.config";
import React from "react";
import { StudioProvider, StudioLayout } from "sanity";
import SplitPane, { SashContent, Pane } from "split-pane-react";
import { InlineEditorProps } from "./InlineEditor";

import "split-pane-react/esm/themes/default.css";
import styles from "styles/InlineEditing.module.css";
import { Button } from "./ui/Button";

export default function InlineEditorContainer({
  document,
  children,
}: InlineEditorProps) {
  const history = useMagicRouter(
    `/studio/structure/__edit__${document?.id},type=${document?.type}`
  );
  const [splitPane, setSplitPane] = React.useState(false);
  const [sizes, setSizes] = React.useState([350, 250]);
  const breakpoint = useMediaQuery("1023");

  const sectionsWithoutEditor = ["slotCart", "slotWishlist"];

  const layoutCSS: React.CSSProperties = {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",
  };

  return (
    <div
      className={`relative ${
        !breakpoint &&
        !splitPane &&
        !sectionsWithoutEditor?.includes(document?.type) &&
        `${styles["inline-editor"]} ${styles["show-button"]}`
      }`}
    >
      {!breakpoint && !sectionsWithoutEditor?.includes(document?.type) && (
        <div className="absolute top-0 left-0 w-full h-full p-4 text-right pointer-events-none">
          <Button
            as="button"
            ariaLabel="Inline Editing Button"
            variant="outline"
            id={document?.type}
            className={`pointer-events-auto z-40 items-center  px-2 py-2.5 text-center text-sm font-medium text-primary shadow-lg hover:border-primary-foreground hover:bg-primary-foreground hover:text-white rounded-none ${
              !splitPane && `styles.hide`
            }`}
            style={{
              position: "sticky",
              top: "32px",
            }}
            onClick={() => setSplitPane(!splitPane)}
          >
            {!splitPane ? (
              <svg
                className="w-4 h-4 fill-current"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z"
                  fillRule="nonzero"
                />
              </svg>
            ) : (
              // close button
              <svg
                className="w-4 h-4 fill-current"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
              </svg>
            )}
          </Button>
        </div>
      )}
      {/* TODO: [Improvement] Add feature to view pane in different device screen sizes */}
      {splitPane ? (
        !breakpoint ? (
          <div className="h-screen">
            <SplitPane
              sizes={sizes}
              onChange={setSizes}
              resizerSize={5}
              className="border-y border-primary"
              sashRender={() => (
                <SashContent style={{ backgroundColor: "#d5e3ff" }} />
              )}
            >
              <Pane style={{ ...layoutCSS }}>{children}</Pane>
              <Pane
                minSize={350}
                maxSize="45%"
                style={{ overflowY: "scroll", ...layoutCSS }}
              >
                <StudioProvider
                  config={config}
                  unstable_history={history}
                  unstable_noAuthBoundary
                >
                  <div
                    className={`${styles["nav-panesearch"]} ${
                      styles["nav-paneheader"]
                    } ${styles["desk-listpane"]} ${styles["document-pane"]} ${
                      styles["field-label"]
                    } ${styles["field-variant"]} ${styles["panel"]} ${
                      styles["pane-footer"]
                    } ${
                      document?.type === "mainProduct"
                        ? `product-fieldgroup-tabs product-fieldgroup-select`
                        : ` fieldgroup-tabs fieldgroup-select`
                    }`}
                  >
                    <StudioLayout />
                  </div>
                </StudioProvider>
              </Pane>
            </SplitPane>
          </div>
        ) : (
          <>
            <div className="z-50 mt-2 w-full bg-primary px-3 py-2.5 text-center text-sm text-white shadow md:flex md:flex-wrap">
              To continue using the inline editor, adjust screen width to
              DESKTOP view (screen width 1024px above).
              <Button
                variant="link"
                ariaLabel="Close Banner Button"
                as="button"
                id={document?.type}
                className="absolute z-40 inline-flex items-center ml-2 text-sm font-medium text-center text-white no-underline md:right-2 hover:text-white"
                onClick={() => setSplitPane(!splitPane)}
              >
                Close
              </Button>
            </div>
            {children}
          </>
        )
      ) : (
        children
      )}
    </div>
  );
}
