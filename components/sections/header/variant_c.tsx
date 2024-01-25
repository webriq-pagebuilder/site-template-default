import React from "react";

import { HeaderProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";

function VariantC({
  template,
  videoLink,
  title,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  // get the video link ID
  let videoLinkId;

  if (videoLink) {
    if (videoLink.includes("embed")) {
      videoLinkId = videoLink.split("/")[4];
    } else {
      videoLinkId = videoLink.split("/watch?v=")[1] || videoLink.split("/")[3];
    }
  }

  return (
    <section>
      <div className="py-20 bg-gray-50 md:py-52 lg:py-52">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center md:mb-20">
            <h1 className="mb-10 text-lg font-bold md:text-4xl lg:text-5xl">
              {title && <span>{title}</span>}
            </h1>
            <div>
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                  className={`mb-3 lg:mb-0 lg:mr-3 `}
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
              {secondaryButton?.label && (
                <ConditionalLink
                  ariaLabel={secondaryButton?.label}
                  link={secondaryButton}
                  className="text-black bg-white  hover:bg-gray-50"
                >
                  {secondaryButton?.label}
                </ConditionalLink>
              )}
            </div>
          </div>
          <div className="md:mx-20 lg:mx-60 xl:mx-60">
            <div className="aspect-video">
              {videoLink && (
                <iframe
                  aria-label="Show Video Frame"
                  className="w-full h-full border-4 rounded-3xl border-brand-primary"
                  src={`https://www.youtube.com/embed/${videoLinkId}`}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden;border-radius:24px}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${`https://www.youtube.com/embed/${videoLinkId}`}><img src=${`https://i.ytimg.com/vi_webp/${videoLinkId}/maxresdefault.webp`} alt=${title} loading="lazy" /><span>▶</span></a>`}
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
