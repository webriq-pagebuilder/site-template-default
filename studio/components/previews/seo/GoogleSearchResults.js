/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types, react/prop-types */
import React from "react";
import { assemblePageUrl } from "./frontendUtils";
import { format } from "date-fns"

function GoogleSearchResult (props) {
  const { document, options, width = 500 } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const date = document?._updatedAt && format(new Date(document?._updatedAt), "MMM dd, yyyy")

  return (
    <div className="seoItem">
      <h3>Google search result preview</h3>
      <div className="googleWrapper" style={{ width }}>
        <div className="url">{url}</div>
        <div className="title">
          {title}
        </div>
        <div className="description">
          {`${date} — ${seo?.seoDescription ?? "SEO description not added"}`}
        </div>
      </div>
    </div>
  );
}

export default GoogleSearchResult;