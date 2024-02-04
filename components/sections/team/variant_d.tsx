import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";

function VariantD({ caption, title, team }: TeamsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={576} className="mb-8 text-center lg:mb-16">
          {caption && (
            <Text weight="bold" color="primary">
              {caption}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Flex wrap>
          {team &&
            team.map((member, index) => (
              <div className="w-full px-4 mb-6 lg:w-1/2" key={index}>
                <Card className="items-center p-0 overflow-hidden sm:flex sm:flex-wrap lg:block xl:flex">
                  {member.mainImage?.image && (
                    <div>
                      <Image
                        className="h-[320px] w-full object-cover sm:w-[179px] lg:w-full xl:w-[179px]"
                        sizes="100vw"
                        src={urlFor(member?.mainImage?.image)}
                        width={179}
                        height={320}
                        alt={
                          member?.mainImage?.alt ??
                          `team-member-${member?.name}-profile-image`
                        }
                      />
                    </div>
                  )}
                  <div className="p-4 sm:w-2/3 lg:w-full lg:pl-6 xl:w-2/3">
                    <Text weight="bold" className="mb-2 text-2xl">
                      {member?.name}
                    </Text>
                    <Text className="mb-4 leading-loose" muted>
                      {member?.plainText}
                    </Text>
                  </div>
                </Card>
              </div>
            ))}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantD);
