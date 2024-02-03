import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Avatar } from "components/ui/Avatar";
import { Card } from "components/ui/Card";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { urlFor } from "lib/sanity";
import React from "react";
import { TeamsProps } from ".";

function VariantA({ caption, title, team }: TeamsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={576} className="mb-10 text-center">
          {caption && (
            <Text weight="bold" color="brand-primary">
              {caption}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Flex wrap>
          {team &&
            team?.map((member) => (
              <div
                className="w-full px-3 mb-6 md:w-1/2 lg:w-1/3"
                key={member?.name}
              >
                <Card className="py-24 text-center ">
                  {member?.mainImage?.image && (
                    <Avatar
                      className="mx-auto border-0"
                      size={96}
                      alt={
                        member?.mainImage?.alt ??
                        `team-member-${member?.name}-profile-image`
                      }
                      src={urlFor(member?.mainImage?.image)}
                    />
                  )}
                  <Heading type="h3" className="mb-2 text-2xl lg:text-2xl">
                    {member?.name}
                  </Heading>
                  <Text muted>{member?.jobTitle}</Text>
                </Card>
              </div>
            ))}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
