import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantB({ team }) {
  const [member, setMember] = React.useState({
    name: "",
    jobTitle: "",
    image: "",
  });

  React.useEffect(() => {
    team &&
      team.map((item) =>
        item.team === team[0].team
          ? setMember({
              name: item.name && item.name,
              jobTitle: item.jobTitle && item.jobTitle,
              image: item.mainImage && item.mainImage,
            })
          : null
      );
  }, []);

  const choosenMember = (name, jobTitle, img) => {
    setMember({ name, jobTitle, image: img });
  };
  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      {team && (
        <div className="py-20 bg-gray-50 radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center -mx-3">
              <div className="w-full lg:w-1/3 px-3 mb-8 lg:mb-0">
                <ul className="flex flex-wrap flex-row lg:flex-col justify-center lg:justify-start space-x-6 lg:space-x-0">
                  {team &&
                    team.map((item) => (
                      <li key={item.name}>
                        <button
                          aria-label={`Team member ${item?.name}`}
                          className={`text-2xl lg:text-4xl mb-4 ${
                            item.name === member.name
                              ? "text-gray-900"
                              : "text-gray-300"
                          } hover:text-gray-400 font-bold focus:outline-none`}
                          onClick={() =>
                            choosenMember(
                              item.name,
                              item.jobTitle,
                              item.mainImage
                            )
                          }
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              {team.length === 0 ? null : (
                <div className="w-full lg:w-2/3 px-3">
                  {member === undefined ? null : (
                    <div className="flex p-6 flex-wrap bg-white rounded-lg shadow">
                      <div className="w-full lg:w-1/2 lg:pr-3">
                        <img
                          className="h-80 lg:h-auto w-full lg:w-auto object-cover rounded-lg"
                          src={urlFor(member.image)}
                        />
                      </div>
                      <div className="w-full lg:w-1/2 lg:pl-3 lg:mt-6 order-first lg:order-last">
                        <h4 className="text-2xl font-bold font-heading">
                          {member.name}
                        </h4>
                        <p className="mb-6 text-gray-500">{member.jobTitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="skew skew-bottom mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
