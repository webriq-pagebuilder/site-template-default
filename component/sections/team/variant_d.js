import React from "react"
import { urlFor } from "../../../lib/sanity"

function VariantD({ caption, title, team }) {
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
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-16 text-center mx-auto max-w-xl">
            {caption && (
              <span className="text-green-600 font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
          </div>
          <div className="flex flex-wrap -mx-4">
            {team && team.map((member, index) => (
                  <div className="mb-6 w-full lg:w-1/2 px-4" key={member.name}>
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
            {/* <div className="mb-6 w-full lg:w-1/2 px-4">
              <div className="flex flex-wrap items-center bg-white rounded shadow overflow-hidden">
                <img
                  className="w-full lg:w-1/3 h-80 object-cover"
                  src="https://images.unsplash.com/photo-1580852300654-03c803a14e24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <div className="w-full lg:w-2/3 lg:pl-6 p-4">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    Danny Bailey
                  </h4>
                  <p className="mb-4 text-gray-500 leading-loose">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    vitae felis at ante bibendum mollis et et mauris.
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
            <div className="mb-6 w-full lg:w-1/2 px-4">
              <div className="flex flex-wrap items-center bg-white rounded shadow overflow-hidden">
                <img
                  className="w-full lg:w-1/3 h-80 object-cover"
                  src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <div className="w-full lg:w-2/3 lg:pl-6 p-4">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    Ian Brown
                  </h4>
                  <p className="mb-4 text-gray-500 leading-loose">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    vitae felis at ante bibendum mollis et et mauris.
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
            <div className="mb-6 w-full lg:w-1/2 px-4">
              <div className="flex flex-wrap items-center bg-white rounded shadow overflow-hidden">
                <img
                  className="w-full lg:w-1/3 h-80 object-cover"
                  src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <div className="w-full lg:w-2/3 lg:pl-6 p-4">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    Daisy Carter
                  </h4>
                  <p className="mb-4 text-gray-500 leading-loose">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    vitae felis at ante bibendum mollis et et mauris.
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
            <div className="mb-6 w-full lg:w-1/2 px-4">
              <div className="flex flex-wrap items-center bg-white rounded shadow overflow-hidden">
                <img
                  className="w-full lg:w-1/3 h-80 object-cover"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=80"
                  alt=""
                />
                <div className="w-full lg:w-2/3 lg:pl-6 p-4">
                  <h4 className="mb-2 text-2xl font-bold font-heading">
                    Dennis Robertson
                  </h4>
                  <p className="mb-4 text-gray-500 leading-loose">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    vitae felis at ante bibendum mollis et et mauris.
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
  )
}
export default React.memo(VariantD)
