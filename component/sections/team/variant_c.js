import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantC({ caption, title, team }) {
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
            {/* <div className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3">
              <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                <img
                  className="mb-8 w-full h-64 object-cover"
                  src="https://images.unsplash.com/photo-1580852300654-03c803a14e24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <h4 className="mb-2 text-2xl font-bold font-heading">
                  Danny Bailey
                </h4>
                <p className="text-gray-500">CEO</p>
              </div>
            </div>
            <div className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3">
              <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                <img
                  className="mb-8 w-full h-64 object-cover"
                  src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <h4 className="mb-2 text-2xl font-bold font-heading">
                  Ian Brown
                </h4>
                <p className="text-gray-500">Head of Development</p>
              </div>
            </div>
            <div className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3">
              <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                <img
                  className="mb-8 w-full h-64 object-cover"
                  src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <h4 className="mb-2 text-2xl font-bold font-heading">
                  Daisy Carter
                </h4>
                <p className="text-gray-500">Product Development</p>
              </div>
            </div>
            <div className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3">
              <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                <img
                  className="mb-8 w-full h-64 object-cover"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <h4 className="mb-2 text-2xl font-bold font-heading">
                  Dennis Robertson
                </h4>
                <p className="text-gray-500">Frontend Developer</p>
              </div>
            </div>
            <div className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3">
              <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                <img
                  className="mb-8 w-full h-64 object-cover"
                  src="https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <h4 className="mb-2 text-2xl font-bold font-heading">
                  Alice Bradley
                </h4>
                <p className="text-gray-500">Backend Developer</p>
              </div>
            </div>
            <div className="mb-6 w-full md:w-1/2 lg:w-1/3 px-3">
              <div className="pb-8 bg-white rounded shadow text-center overflow-hidden">
                <img
                  className="mb-8 w-full h-64 object-cover"
                  src="https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTB8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=600"
                  alt=""
                />
                <h4 className="mb-2 text-2xl font-bold font-heading">
                  Sahra Ortiz
                </h4>
                <p className="text-gray-500">Product Designer</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
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
export default React.memo(VariantC);
