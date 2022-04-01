import React from "react";

function VariantA({ stats }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-left text-center -mx-4">
          {stats &&
            stats.map((items, index) => (
              <div
                className="my-8 w-full sm:w-1/4 md:w-1/2 lg:w-1/4 px-4"
                key={index}
              >
                <div className="relative py-10 bg-white shadow rounded">
                  <p className="mb-1 text-webriq-darkblue">{items?.label}</p>
                  <span className="text-3xl lg:text-4xl font-bold">
                    {items?.value}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
