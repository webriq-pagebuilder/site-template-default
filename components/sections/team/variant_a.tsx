import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";
import { Card } from "components/ui/Card";
import { Avatar } from "components/ui/Avatar";

function VariantA({ caption, title, team }: TeamsProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto mb-10 text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl font-bold font-heading lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap">
            {team &&
              team?.map((member) => (
                <div
                  className="w-full px-3 mb-6 md:w-1/2 lg:w-1/3"
                  key={member?.name}
                >
                  <Card className="py-24 text-center ">
                    {member?.mainImage?.image && (
                      <Avatar
                        className="mx-auto border-0"
                        size={96}
                        alt={
                          member?.mainImage?.alt ??
                          `team-member-${member?.name}-profile-image`
                        }
                        src={urlFor(member?.mainImage?.image)}
                      />
                    )}
                    <h1 className="mb-2 text-2xl font-bold font-heading">
                      {member?.name}
                    </h1>
                    <p className="text-gray-500">{member?.jobTitle}</p>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
