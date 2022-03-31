import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

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
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap">
            {team &&
              team?.map((member) => (
                <div
                  className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3"
                  key={member?.name}
                >
                  <div className="py-24 bg-white rounded shadow text-center">
                    {member?.mainImage?.image?.asset?._ref && (
                      <div className="mx-auto mb-8 h-24 w-24 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(member?.mainImage?.image)}
                          layout="responsive"
                          width="96px"
                          height="96px"
                          objectFit="cover"
                          alt={
                            member?.mainImage?.alt ??
                            `team-member-${member?.name}-profile-image`
                          }
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                    <h1 className="mb-2 text-2xl font-bold font-heading">
                      {member?.name}
                    </h1>
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
export default React.memo(VariantA);
