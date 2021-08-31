import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantA({ caption, title, team }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto mb-10 text-center">
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
                  <div className="py-24 bg-white rounded shadow text-center">
                    {member.mainImage && (
                      <img
                        className="mx-auto mb-8 w-24 h-24 rounded-full object-cover"
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
export default React.memo(VariantA);
