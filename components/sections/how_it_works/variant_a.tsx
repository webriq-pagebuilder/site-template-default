import React from "react";

import { Container, Flex } from "components/layout/index";
import { Heading, Text } from "components/ui";
import { HowItWorksProps } from ".";

import { YoutubeVideo } from "components/common/youtube_video/youtube-video";

function VariantA({ subtitle, title, text, video, steps }: HowItWorksProps) {
  // get the video link ID
  let videoLinkId;

  if (video) {
    if (video.includes("embed")) {
      videoLinkId = video.split("/")[4];
    } else {
      videoLinkId = video.split("/watch?v=")[1] || video.split("/")[3];
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap className="mb-10" gap={10} justify="between">
          <div className="w-full mb-10 lg:mb-0 lg:w-[45%]">
            <Text weight="bold" className="md:text-lg lg:text-lg text-primary">
              {subtitle}
            </Text>
            <Heading className="my-5">{title}</Heading>
            <Text muted className="text-sm md:text-lg md:leading-loose">
              {text}
            </Text>
          </div>
          {video && 
            <div className="h-full w-full lg:w-[40%]">
              <YoutubeVideo videoLinkId={videoLinkId} title={title} />
            </div>
          }
        </Flex>

        <Flex wrap>
          {steps &&
            steps?.map((step, index) => (
              <StepsItem index={index} step={step} key={step._key} />
            ))}
        </Flex>
      </Container>
    </section>
  );
}

function StepsItem({ index, step }) {
  return (
    <div className="w-full px-5 mb-12 md:w-1/2 lg:mb-0 lg:w-1/3">
      <span className="flex items-center justify-center w-12 h-12 mt-6 mb-6 font-bold rounded bg-secondary-foreground text-primary">
        {index + 1}
      </span>
      <Text weight="bold" className="mb-2 text-lg md:text-2xl">
        {step?.title}
      </Text>
      <Text muted className="text-xs md:text-lg md:leading-loose ">
        {step?.plainText}
      </Text>
    </div>
  );
}
export default React.memo(VariantA);
