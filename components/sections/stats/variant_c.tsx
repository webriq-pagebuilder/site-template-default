import { StatsCard } from "components/common/stats/stats-card";
import { Container, Flex } from "components/layout/index";
import { urlFor } from "lib/sanity";
import React from "react";
import { StatsProps } from ".";

function VariantC({ stats }: StatsProps) {
  return (
    <section className="py-20">
      <Container>
        {stats && (
          <Flex wrap align="center" className="text-center ">
            {stats?.map((stat, index) => (
              <StatsCard
                key={index}
                className="my-8 md:w-1/2 lg:w-1/4"
                variant="stacked"
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
export default React.memo(VariantC);
