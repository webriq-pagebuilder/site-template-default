import { Button } from "@stackshift-ui/button";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";
import { Heading } from "@stackshift-ui/heading";
import { Image } from "@stackshift-ui/image";
import { Section } from "@stackshift-ui/section";
import { Text } from "@stackshift-ui/text";

export interface FeaturesIProps {
  caption?: string;
  title?: string;
  description?: string;
  mainImage?: { image?: any; alt?: string };
  logo?: { image?: string; alt?: string };
  primaryButton?: {
    label?: string;
    ariaLabel?: string;
    linkType?: string;
    internalLink?: string | null;
    externalLink?: string | null;
    linkTarget?: string;
  };
  features?: Array<{
    _key?: string;
    mainImage?: { image?: string; alt?: string };
    title?: string;
    plainText?: string;
  }>;
}

export default function Features_I({
  caption,
  title,
  description,
  mainImage,
  logo,
  primaryButton,
  features,
}: FeaturesIProps) {
  return (
    <Section className="py-20 bg-white">
      <Container maxWidth={1280}>
        <Flex wrap className="mb-0 lg:mb-12">
          {/* LEFT column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-16 mb-10 lg:mb-0">
            {caption && (
              <Text weight="bold" className="text-secondary mb-2">
                {caption}
              </Text>
            )}
            {title && (
              <Heading fontSize="3xl" className="mb-6">
                {title}
              </Heading>
            )}
            {description && (
              <Text muted className="mb-8 leading-relaxed">
                {description}
              </Text>
            )}
            {logo?.image && (
              <div className="mb-8">
                <Image
                  src={logo.image}
                  alt={logo.alt ?? "endorsement-badge"}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            )}
            {primaryButton?.label && (
              <div>
                <Button as="link" link={primaryButton as any}>
                  {primaryButton.label}
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT column — portrait image */}
          {mainImage?.image && (
            <div className="w-full lg:w-1/2">
              <Image
                src={`${mainImage.image}`}
                alt={mainImage.alt ?? "endorsement-portrait"}
                width={600}
                height={800}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </Flex>

        {/* Badge / certification carousel */}
        {features && features.length > 0 && (
          <BadgeCarousel features={features} />
        )}
      </Container>
    </Section>
  );
}

function BadgeCarousel({
  features,
}: {
  features: NonNullable<FeaturesIProps["features"]>;
}) {
  return (
    <div className="overflow-x-auto border-t pt-8 mt-12">
      <Flex wrap justify="center" gap={8} className="min-w-max mx-auto px-4">
        {features.map((item) => (
          <div
            key={item._key}
            className="flex flex-col items-center text-center px-4"
          >
            {item.mainImage?.image && (
              <Image
                src={item.mainImage.image}
                alt={item.mainImage.alt ?? item.title ?? "certification-badge"}
                width={80}
                height={80}
                className="object-contain mb-2"
              />
            )}
            {item.title && (
              <Text fontSize="sm" muted>
                {item.title}
              </Text>
            )}
          </div>
        ))}
      </Flex>
    </div>
  );
}
