import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";

function VariantD({ caption, title, team }: TeamsProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto mb-8 text-center lg:mb-16">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && <Text type="h1">{title}</Text>}
          </div>
          <div className="flex flex-wrap -mx-4">
            {team &&
              team.map((member, index) => (
                <div className="w-full px-4 mb-6 lg:w-1/2" key={index}>
                  <Card className="items-center p-0 overflow-hidden sm:flex sm:flex-wrap lg:block xl:flex">
                    {member.mainImage?.image && (
                      <div>
                        <Image
                          className="h-[320px] w-full object-cover sm:w-[179px] lg:w-full xl:w-[179px]"
                          sizes="100vw"
                          src={urlFor(member?.mainImage?.image)}
                          width={179}
                          height={320}
                          alt={
                            member?.mainImage?.alt ??
                            `team-member-${member?.name}-profile-image`
                          }
                        />
                      </div>
                    )}
                    <div className="p-4 sm:w-2/3 lg:w-full lg:pl-6 xl:w-2/3">
                      <p className="mb-2 text-2xl font-bold font-heading">
                        {member?.name}
                      </p>
                      <Text className="mb-4 leading-loose " muted>
                        {member?.plainText}
                      </Text>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
