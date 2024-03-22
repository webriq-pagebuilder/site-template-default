import React from "react";

import { StatsProps } from ".";
import { Card, Text } from "components/ui";
import { Container, Flex } from "components/layout/index";

function VariantA({ stats }: StatsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap align="center" justify="start" className="text-center ">
          {stats &&
            stats.map((items, index) => (
              <div className="w-full px-4 my-8 sm:w-1/4 lg:w-1/4" key={index}>
                <Card className="relative py-10 ">
                  <Text className="mb-1 text-primary overflow-ellipsis overflow-clip">{items?.label}</Text>
                  <p className="text-3xl font-bold lg:text-4xl overflow-ellipsis overflow-clip">
                    {items?.value}
                  </p>
                </Card>
              </div>
            ))}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
