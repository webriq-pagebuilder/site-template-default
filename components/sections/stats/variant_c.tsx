import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { StatsProps } from ".";
import { StatsCard } from "components/common/stats/stats-card";

function VariantC({ stats }: StatsProps) {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        {stats && (
          <div className="flex flex-wrap items-center text-center">
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
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantC);
