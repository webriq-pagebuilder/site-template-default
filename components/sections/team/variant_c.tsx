import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";

function VariantC({ caption, title, team }: TeamsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={576} className="mb-12 text-center ">
          {caption && (
            <Text weight="bold" color="primary">
              {caption}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Flex wrap>
          {team &&
            team.map((member) => (
              <div
                className="w-full px-3 mb-6 md:w-1/2 lg:w-1/3"
                key={member?.name}
              >
                <Card className="w-full p-0 pb-8 overflow-hidden text-center">
                  {member.mainImage?.image && (
                    <div>
                      <Image
                        className="mb-8 h-[345px] w-full object-cover"
                        sizes="100vw"
                        src={urlFor(member?.mainImage?.image)}
                        width={345}
                        height={256}
                        alt={
                          member?.mainImage?.alt ??
                          `team-member-${member?.name}-profile-image`
                        }
                      />
                    </div>
                  )}
                  <Text className="mb-2 text-2xl " weight="bold">
                    {member?.name}
                  </Text>
                  <Text muted>{member?.jobTitle}</Text>
                </Card>
              </div>
            ))}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantC);
