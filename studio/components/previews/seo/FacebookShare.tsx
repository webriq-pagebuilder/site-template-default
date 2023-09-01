/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import { useClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";
import { assemblePageUrl } from "./frontendUtils";
import styles from "styles/studio/seo/FacebookShare.module.css";

function FacebookShare(props) {
  const client = useClient({ apiVersion: "2021-10-21" });
  const builder = imageUrlBuilder(client);

  const urlFor = (source) => builder.image(source)?.url();

  const { document, width = 500, options, defaultSeo } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split("://").pop();

  const seoImage = seo?.seoImage ?? defaultSeo?.defaultSeoImage;

  return (
    <div className={styles.seoItem}>
      <h3>Facebook share</h3>
      <div className={styles.facebookWrapper} style={{ width }}>
        <div className={styles.facebookImageContainer}>
          {seoImage && (
            <img
              className={styles.facebookCardImage}
              src={urlFor(seo?.seoImage)}
            />
          )}
        </div>
        <div className={styles.facebookCardContent}>
          <div className={styles.facebookCardUrl}>
            {websiteUrlWithoutProtocol}
          </div>
          <div className={styles.facebookCardTitle}>
            <a href={url}>{title}</a>
          </div>
          <div className={styles.facebookCardDescription}>
            {seo?.seoDescription ?? defaultSeo?.defaultSeoDescription}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacebookShare;
