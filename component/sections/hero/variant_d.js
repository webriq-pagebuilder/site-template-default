import React from "react";
import { urlFor } from "lib/sanity";
function VariantD({
  template,
  image,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="overflow-hidden">
      {/* <nav className="relative px-6 py-6 flex justify-between items-center bg-white">
        <a className="text-3xl font-bold leading-none" href="#">
          <img
            className="h-12"
            src=""
            alt=""
            width="auto"
          />
        </a>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-gray-400 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Start
            </a>
          </li>
          <li className="text-gray-300">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </li>
          <li>
            <a className="text-sm text-webriq-darkblue font-bold" href="#">
              About Us
            </a>
          </li>
          <li className="text-gray-300">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Services
            </a>
          </li>
          <li className="text-gray-300">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Platform
            </a>
          </li>
          <li className="text-gray-300">
            <svg
              className="w-4 h-4 current-fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </li>
          <li>
            <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
              Testimonials
            </a>
          </li>
        </ul>
        <a
          className="hidden lg:block py-2 px-6 bg-webriq-blue hover:bg-webriq-darkblue text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200"
          href="#"
        >
          Contact Us
        </a>
      </nav> */}
      <div className="relative bg-gray-50 pt-20 pb-24 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 flex items-center">
              <div className="w-full text-center lg:text-left">
                <img
                  className="hidden lg:block absolute inset-0 w-full"
                  src=""
                  alt=""
                />
                <div className="relative max-w-md mx-auto lg:mx-0">
                  <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {/* <span>Build &amp; Launch without </span>
                    <span className="text-webriq-darkblue">problems</span> */}
                    {title && (
                      <>
                        <span>{title}</span>
                      </>
                    )}
                  </h2>
                </div>
                <div className="relative max-w-sm mx-auto lg:mx-0">
                  {description && (
                    <p className="mb-6 text-gray-400 leading-loose">
                      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque efficitur nisl sodales egestas lobortis. */}
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton && (
                      <a
                        className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-webriq-blue hover:bg-webriq-darkblue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                        href={
                          primaryButton.type === "linkInternal"
                            ? primaryButton.internalLink === "Home" ||
                              primaryButton.internalLink === "home"
                              ? "/"
                              : primaryButton.internalLink
                            : primaryButton.externalLink
                        }
                      >
                        {primaryButton.label}
                      </a>
                    )}
                    {secondaryButton && (
                      <a
                        className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                        href={
                          secondaryButton.type === "linkInternal"
                            ? secondaryButton.internalLink === "Home" ||
                              secondaryButton.internalLink === "home"
                              ? "/"
                              : secondaryButton.internalLink
                            : secondaryButton.externalLink
                        }
                      >
                        {secondaryButton.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              {image === undefined ? null : (
                <img
                  className="lg:absolute top-0 my-12 lg:my-0 h-full w-full lg:w-1/2 rounded-3xl lg:rounded-none object-cover"
                  src={urlFor(image)}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
