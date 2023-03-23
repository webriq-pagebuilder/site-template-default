/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import { useClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";
import { assemblePageUrl } from "./frontendUtils";


function LinkedinPost (props) {
  const client = useClient({ apiVersion: "2021-10-21" })
  const builder = imageUrlBuilder(client);

  const urlFor = (source) => builder.image(source);

  const { document, width = 500, options } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split("://").pop();

  return (
    <div className="seoItem">
      <h3>LinkedIn Post</h3>
      <div className="linkedinWrapper" style={{ width }}>
        <div className="linkedinImageContainer">
          {seo?.seoImage && (
            <img
              className="linkedinCardImage"
              src={urlFor(seo?.seoImage)?.width(500)?.url()}
            />
          )}
        </div>
        <div className="linkedinCardContent">
          <div className="linkedinCardTitle">
            <a href={url}>{title}</a>
          </div>
          {/* <div className={styles.linkedinCardDescription}>
            {seo?.seoDescription}
          </div> */}
          <div className="linkedinCardUrl">
            {websiteUrlWithoutProtocol}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedinPost;