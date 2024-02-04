import React from "react";

import { ConditionalLink } from "components/ui/ConditionalLink";
import { HeaderProps } from ".";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Button } from "components/ui/Button";
import { Flex } from "components/layout/Flex/Flex";

function VariantC({
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
    <section className="py-20 bg-gray-50 md:py-52">
      <Container>
        <div className="max-w-2xl mx-auto mb-12 text-center md:mb-20">
          {title && <Heading className="mb-10">{title}</Heading>}
          <Flex
            align="center"
            gap={4}
            justify="center"
            className="flex-col lg:flex-row"
          >
            {primaryButton?.label && (
              <Button
                asLink
                ariaLabel={primaryButton?.label}
                link={primaryButton}
              >
                {primaryButton?.label}
              </Button>
            )}
            {secondaryButton?.label && (
              <Button
                asLink
                ariaLabel={secondaryButton?.label}
                link={secondaryButton}
                className="text-black bg-white hover:bg-gray-50"
              >
                {secondaryButton?.label}
              </Button>
            )}
          </Flex>
        </div>
        <div className="md:mx-20 lg:mx-60 xl:mx-60">
          {videoLinkId && (
            <VideoPlayer videoLinkId={videoLinkId} title={title} />
          )}
        </div>
      </Container>
    </section>
  );
}

function VideoPlayer({ videoLinkId, title }) {
  return (
    <div className="aspect-video">
      <iframe
        aria-label="Show Video Frame"
        className="w-full h-full border-4 rounded-3xl border-primary"
        src={`https://www.youtube.com/embed/${videoLinkId}`}
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden;border-radius:24px}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${`https://www.youtube.com/embed/${videoLinkId}`}><img src=${`https://i.ytimg.com/vi_webp/${videoLinkId}/maxresdefault.webp`} alt=${title} loading="lazy" /><span>▶</span></a>`}
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
export default React.memo(VariantC);
