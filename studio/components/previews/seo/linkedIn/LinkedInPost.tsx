/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import { useClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";
import { assemblePageUrl } from "../frontendUtils";
import styles from "./LinkedInPost.module.css";

function LinkedinPost(props) {
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
			<h3>LinkedIn Post</h3>
			<div className={styles.linkedinWrapper} style={{ width }}>
				<div className={styles.linkedinImageContainer}>
					{seoImage && (
						<img
							className={styles.linkedinCardImage}
							src={urlFor(seo?.seoImage)}
						/>
					)}
				</div>
				<div className={styles.linkedinCardContent}>
					<div className={styles.linkedinCardTitle}>
						<a href={url}>{title}</a>
					</div>
					{/* <div className={styles.linkedinCardDescription}>
            {seo?.seoDescription}
          </div> */}
					<div className={styles.linkedinCardUrl}>
						{websiteUrlWithoutProtocol}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LinkedinPost;
