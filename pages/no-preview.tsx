import React from "react";
import Image from "next/image";
import { Container } from "components/layout/index";
import { Text } from "components/ui/Text";

function NoPreview() {
  return (
    <section className="py-20">
      <Container className="text-center">
        <div className="mx-auto">
          <Image
            layout="responsive"
            width={854}
            height={312}
            objectFit="contain"
            src="https://cdn.sanity.io/images/9itgab5x/production/8f90c590ada0a2f3c89c35535c323320627b9622-554x312.png"
            alt="no-preview-image"
          />
        </div>
        <div className="text-center">
          <Text fontSize="4xl" weight="bold" className="mb-6 text-primary">
            Whoops!
          </Text>
          <Text muted className="my-8">
            Publish your page first to preview LIVE site
          </Text>
        </div>
      </Container>
    </section>
  );
}

export default React.memo(NoPreview);
