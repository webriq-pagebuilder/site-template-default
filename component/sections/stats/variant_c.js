import React from "react";
import { urlFor } from "lib/sanity";

function VariantC({ stats }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {stats && (
          <div className="flex flex-wrap items-center text-center">
            {stats?.map((stat, index) => (
              <div className="my-8 w-full md:w-1/2 lg:w-1/4" key={index}>
                {stat?.mainImage?.image && (
                  <div className="mx-auto inline-block p-4 rounded bg-webriq-lightblue">
                    <img
                      className="h-6"
                      src={urlFor(stat?.mainImage?.image)}
                      alt={stat?.mainImage?.alt ?? "statistics-icon"}
                    />
                  </div>
                )}
                <p className="mt-4 text-2xl font-bold">{stat?.value}</p>
                <p className="text-gray-500">{stat?.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantC);
