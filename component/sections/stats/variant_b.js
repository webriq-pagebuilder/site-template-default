import React from "react";

function VariantB({ stats }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {stats && (
          <div className="flex flex-wrap items-center justify-center -mx-4">
            {stats?.map((stats, index) => (
              <div
                className="my-8 flex items-center lg:justify-center w-full md:w-1/2 lg:w-1/4 px-4"
                key={index}
              >
                <span className="mr-4 inline-block p-4 rounded bg-webriq-lightblue">
                  <svg
                    className="w-6 h-6 text-webriq-darkblue"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </span>
                <div>
                  <p className="text-2xl font-bold">{stats?.value}</p>
                  <p className="text-gray-500">{stats?.label}</p>
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
