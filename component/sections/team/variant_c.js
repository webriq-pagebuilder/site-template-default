import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantC({ caption, title, team }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto mb-12 text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
          </div>
          <div className="flex flex-wrap">
            {team &&
              team.map((member) => (
                <div
                  className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3"
                  key={member.name}
                >
                  <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                    {member.mainImage && (
                      <img
                        className="mb-8 w-full h-64 object-cover"
                        src={urlFor(member.mainImage)}
                        alt=""
                      />
                    )}
                    <h4 className="mb-2 text-2xl font-bold font-heading">
                      {member.name}
                    </h4>
                    <p className="text-gray-500">{member.jobTitle}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
