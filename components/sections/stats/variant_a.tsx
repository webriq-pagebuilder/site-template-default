import React from "react";

import { StatsProps } from ".";
import { Card } from "components/ui/Card";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Text } from "components/ui/Text";

function VariantA({ stats }: StatsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap align="center" justify="start" className="text-center ">
          {stats &&
            stats.map((items, index) => (
              <div className="w-full px-4 my-8 sm:w-1/4 lg:w-1/4" key={index}>
                <Card className="relative py-10 ">
                  <Text color="primary" className="mb-1">
                    {items?.label}
                  </Text>
                  <span className="text-3xl font-bold lg:text-4xl">
                    {items?.value}
                  </span>
                </Card>
              </div>
            ))}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
