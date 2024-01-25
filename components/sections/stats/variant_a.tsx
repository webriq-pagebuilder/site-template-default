import React from "react";

import { StatsProps } from ".";
import { Card } from "components/ui/Card";

function VariantA({ stats }: StatsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center -mx-4 text-center justify-left">
          {stats &&
            stats.map((items, index) => (
              <div
                className="w-full px-4 my-8 sm:w-1/4 md:w-1/2 lg:w-1/4"
                key={index}
              >
                <Card className="relative py-10 ">
                  <p className="mb-1 text-brand-primary">{items?.label}</p>
                  <span className="text-3xl font-bold lg:text-4xl">
                    {items?.value}
                  </span>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
