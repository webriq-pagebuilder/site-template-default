import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantD({ caption, title, team }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-16 text-center mx-auto max-w-xl">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
          </div>
          <div className="flex flex-wrap -mx-4">
            {team &&
              team.map((member, index) => (
                <div className="mb-6 w-full lg:w-1/2 px-4" key={index}>
                  <div className="flex flex-wrap items-center bg-white rounded shadow overflow-hidden">
                    {member.mainImage && (
                      <img
                        className="w-full lg:w-1/3 h-80 object-cover"
                        src={urlFor(member.mainImage)}
                        alt=""
                      />
                    )}
                    <div className="w-full lg:w-2/3 lg:pl-6 p-4">
                      <h4 className="mb-2 text-2xl font-bold font-heading">
                        {member.name}
                      </h4>
                      <p className="mb-4 text-gray-500 leading-loose">
                        {member.jobTitle}
                      </p>
                      <div className="flex">
                        <a className="mr-3" href="#">
                          <img src="" alt="" />
                        </a>
                        <a className="mr-3" href="#">
                          <img src="" alt="" />
                        </a>
                        <a href="#">
                          <img src="" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
