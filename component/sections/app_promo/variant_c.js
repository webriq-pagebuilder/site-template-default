import React from "react"
import { urlFor } from "../../../lib/sanity"

function VariantC({ subtitle, title, description, features, images }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center mx-5">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2 px-4">
              <div className="max-w-md">
                <span className="text-green-600 font-bold">{subtitle}</span>
                <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
                <p className="mb-6 text-gray-500 leading-loose">
                  {description}
                </p>
                <ul className="mb-8 text-gray-500 font-bold">
                  {features &&
                    features.map((feature, index) => (
                      <li className="mb-3 flex items-center" key={index}>
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="transform -rotate-12 flex items-center w-full lg:w-1/2 px-4">
              <div className="w-1/3">
                {images?.[0] && <img src={urlFor(images[0])} />}
              </div>
              <div className="w-1/3">
                {images?.[1] && <img src={urlFor(images[1])} />}
                {images?.[2] && <img src={urlFor(images[2])} />}
              </div>
              <div className="w-1/3">
                {images?.[3] && <img src={urlFor(images[3])} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default React.memo(VariantC)
