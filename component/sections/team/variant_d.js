import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

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
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap -mx-4">
            {team &&
              team.map((member, index) => (
                <div className="mb-6 w-full lg:w-1/2 px-4" key={index}>
                  <div className="flex flex-wrap items-center bg-white rounded shadow overflow-hidden">
                    {member.mainImage?.image?.asset?._ref && (
                      <div className="w-1/3">
                        <Image
                          src={urlFor(member?.mainImage?.image)}
                          layout="responsive"
                          width="179px"
                          height="320px"
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
                    <div className="w-2/3 lg:pl-6 p-4">
                      <p className="mb-2 text-2xl font-bold font-heading">
                        {member?.name}
                      </p>
                      <p className="mb-4 text-gray-500 leading-loose">
                        {member?.plainText}
                      </p>
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
