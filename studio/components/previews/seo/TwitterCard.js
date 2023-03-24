/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import { useClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";
import { format } from "date-fns"
import { assemblePageUrl } from "./frontendUtils";

const author = {
  name: "WebriQ",
  handle: "WebriQgoesMad",
  image:
    "https://pbs.twimg.com/profile_images/1408052895531126790/BAhX7Puq_400x400.jpg",
};

function TwitterCard (props) {
  const client = useClient({ apiVersion: "2021-10-21" })
  const builder = imageUrlBuilder(client);

  const urlFor = (source) => builder.image(source);

  const { document, width = 500, options } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split("://").pop();

  const date = document?._updatedAt && format(new Date(document?._updatedAt), "MMM dd")

  return (
    <div className="seoItem">
      <h3>Twitter card preview</h3>
      <div className="tweetWrapper" style={{ width }}>
        {author && (
          <div className="tweetAuthor">
            <img
              className="tweetAuthorAvatar"
              src={
                author && typeof author.image === "object"
                  ? urlFor(author.image).width(300).url()
                  : author.image
              }
            />
            <span className="tweetAuthorName">{author.name}</span>
            <span className="tweetAuthorHandle">@{author.handle}</span>
            <span className="tweetBullet">•</span>
            <span className="tweetAuthorHandle">{date}</span>
          </div>
        )}

        <div className="tweetText">
          <p>
            The card for your website will look a little something like this!
          </p>
        </div>
        <div className="tweetCardPreview" style={{ width }}>
          <div className="tweetCardImageContainer">
            {seo?.seoImage && (
              <img
                className="tweetCardImage"
                src={urlFor(seo?.seoImage)?.width(500)?.url()}
              />
            )}
          </div>
          <div className="tweetCardContent">
            <div className="tweetUrlWrapper">
              {websiteUrlWithoutProtocol}
            </div>
            <div className="tweetCardTitle">
              <a href={url}>{title}</a>
            </div>
            <div className="tweetCardDescription">
              {seo?.seoDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwitterCard;