import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

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
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap">
            {team &&
              team.map((member) => (
                <div
                  className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3"
                  key={member?.name}
                >
                  <div className="pb-8 bg-white w-full rounded shadow text-center overflow-hidden">
                    {member.mainImage && (
                      <div className="mb-8 w-full h-full">
                        <Image
                          src={urlFor(member?.mainImage)}
                          layout="responsive"
                          width="345px"
                          height="256px"
                          objectFit="cover"
                          alt={`team-member-${member?.name}-profile-image`}
                        />
                      </div>
                    )}
                    <p className="mb-2 text-2xl font-bold font-heading">
                      {member?.name}
                    </p>
                    <p className="text-gray-500">{member?.jobTitle}</p>
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
