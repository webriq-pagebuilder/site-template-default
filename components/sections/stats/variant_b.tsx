import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { StatsProps } from ".";
import { StatsCard } from "components/common/stats/stats-card";

function VariantB({ stats }: StatsProps) {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        {stats && (
          <div className="items-center mx-10 sm:justify-left sm:-mx-4 sm:flex sm:flex-wrap">
            {stats?.map((stat, index) => (
              <StatsCard
                className="my-8 md:w-1/2 lg:w-1/4 lg:justify-center"
                value={stat?.value}
                label={stat?.label}
                icon={urlFor(stat?.mainImage?.image)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantB);
