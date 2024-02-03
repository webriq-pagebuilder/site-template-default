import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { StatsProps } from ".";
import { StatsCard } from "components/common/stats/stats-card";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";

function VariantB({ stats }: StatsProps) {
  return (
    <section className="py-20">
      <Container>
        {stats && (
          <Flex
            wrap
            align="center"
            className="flex-col sm:justify-left sm:flex-row"
          >
            {stats?.map((stat, index) => (
              <StatsCard
                className="my-8 md:w-1/2 lg:w-1/4 lg:justify-center"
                value={stat?.value}
                label={stat?.label}
                icon={urlFor(stat?.mainImage?.image)}
              />
            ))}
          </Flex>
        )}
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
