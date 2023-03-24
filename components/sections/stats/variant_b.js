import React from "react";
import { urlFor } from "lib/sanity";

function VariantB({ stats }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {stats && (
          <div className="sm:flex sm:flex-wrap items-center sm:justify-left mx-10 sm:-mx-4">
            {stats?.map((stat, index) => (
              <div
                className="my-8 flex items-center lg:justify-center w-full md:w-1/2 lg:w-1/4 px-4"
                key={index}
              >
                {stat?.mainImage?.image && (
                  <div className="mr-4 inline-block p-4 rounded bg-webriq-lightblue">
                    <img
                      className="h-6"
                      src={urlFor(stat?.mainImage?.image)}
                      alt={stat?.mainImage?.alt ?? "statistics-icon"}
                    />
                  </div>
                )}
                <div>
                  <p className="text-2xl font-bold">{stat?.value}</p>
                  <p className="text-gray-500">{stat?.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantB);
