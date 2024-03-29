import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";
import { Card, Text, Button } from "components/ui";
import { Container, Flex } from "components/layout/index";

function VariantB({ team }: TeamsProps) {
  const [activeTab, setActiveTab] = React.useState(team?.[0]?.name); // default active tab is the first tab

  const filterMember = team?.filter((member) => member?.name === activeTab);

  return (
    <section className="py-20 bg-gray-50">
      {team && (
        <Container>
          <Flex wrap align="center">
            <div className="w-full px-3 mb-8 lg:mb-0 lg:w-1/3">
              <Flex
                as="ul"
                wrap
                className="flex-row justify-center space-x-6 lg:flex-col lg:justify-start lg:space-x-0"
              >
                {team &&
                  team?.map((item) => (
                    <li key={item?.name}>
                      <Button
                        as="button"
                        variant="unstyled"
                        ariaLabel={item.name}
                        className={`mb-4 text-2xl lg:text-4xl ${
                          item?.name === activeTab
                            ? "text-gray-900"
                            : "text-gray-500"
                        } font-bold hover:text-gray-500 focus:outline-none`}
                        onClick={() => setActiveTab(item?.name)}
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
              </Flex>
            </div>
            {team && (
              <div className="w-full px-3 lg:w-2/3">
                {filterMember?.map((member, index) => (
                  <Card className="flex p-6 bg-white" key={index}>
                    {member?.mainImage?.image && (
                      <Image
                        className="object-cover overflow-hidden rounded-lg"
                        src={urlFor(member?.mainImage?.image)}
                        sizes="100vw"
                        width={329}
                        height={494}
                        alt={
                          member?.mainImage?.alt ??
                          `team-member-${member?.name}-profile-image`
                        }
                      />
                    )}
                    <div className="order-last w-1/2 pt-6 pl-6 mt-6">
                      <Text weight="bold" className="text-2xl ">
                        {member?.name}
                      </Text>
                      <Text className="mb-6" muted>
                        {member?.jobTitle}
                      </Text>
                      <Text className="mb-6 text-justify " muted>
                        {member?.plainText}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Flex>
        </Container>
      )}
    </section>
  );
}
export default React.memo(VariantB);
