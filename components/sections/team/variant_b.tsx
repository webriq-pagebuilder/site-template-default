import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";
import { Card } from "components/ui/Card";

function VariantB({ team }: TeamsProps) {
  const [activeTab, setActiveTab] = React.useState(team?.[0]?.name); // default active tab is the first tab

  const filterMember = team?.filter((member) => member?.name === activeTab);

  return (
    <section>
      {team && (
        <div className="py-20 radius-for-skewed bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center -mx-3">
              <div className="w-full px-3 mb-8 lg:mb-0 lg:w-1/3">
                <ul className="flex flex-row flex-wrap justify-center space-x-6 lg:flex-col lg:justify-start lg:space-x-0">
                  {team &&
                    team?.map((item) => (
                      <li key={item?.name}>
                        <button
                          aria-label={item.name}
                          className={`mb-4 text-2xl lg:text-4xl ${
                            item?.name === activeTab
                              ? "text-gray-900"
                              : "text-gray-500"
                          } font-bold hover:text-gray-500 focus:outline-none`}
                          onClick={() => setActiveTab(item?.name)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              {team && (
                <div className="w-full px-3 lg:w-2/3">
                  {filterMember?.map((member, index) => (
                    <Card className="flex p-6 bg-white" key={index}>
                      {member?.mainImage?.image && (
                        <Image
                          className="object-cover overflow-hidden rounded-lg"
                          src={urlFor(member?.mainImage?.image)}
                          sizes="100vw"
                          width={329}
                          height={494}
                          alt={
                            member?.mainImage?.alt ??
                            `team-member-${member?.name}-profile-image`
                          }
                        />
                      )}
                      <div className="order-last w-1/2 pt-6 pl-6 mt-6">
                        <p className="text-2xl font-bold font-heading">
                          {member?.name}
                        </p>
                        <p className="mb-6 text-gray-500">{member?.jobTitle}</p>
                        <p className="mb-6 text-justify text-gray-500">
                          {member?.plainText}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default React.memo(VariantB);
