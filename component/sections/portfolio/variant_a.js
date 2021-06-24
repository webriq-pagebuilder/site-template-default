import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantA({ /* template,*/ caption, title, images, primaryButton }) {
  const [category, setCategory] = React.useState("category_2");

  const renderCategory = () => {
    if (category === "category_1") {
      return <p>Category 1</p>;
    } else if (category === "category_2") {
      return (
        <div className="flex flex-wrap mb-8 -mx-4">
          {images &&
            images.map((img, index) => (
              <>
                {index === 2 ? null : (
                  <div
                    className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4"
                    key={img?._key}
                  >
                    <a href="#">
                      <img
                        className="mx-auto h-96 w-full rounded object-cover"
                        src={urlFor(img)}
                        alt=""
                      />
                    </a>
                  </div>
                )}
                {index === 2 ? (
                  <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
                    <div className="relative mx-auto h-96 w-full rounded-lg">
                      <img
                        className="relative h-full w-full rounded-lg object-cover"
                        src={urlFor(img)}
                        alt=""
                      />
                      <div className="absolute inset-0 rounded-lg hover:bg-gray-900 opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-100">
                        <a
                          className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white bg-transparent text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                          href="#"
                        >
                          View Project
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            ))}
          {/* <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <a href="#">
                <img
                  className="mx-auto h-64 w-full rounded object-cover"
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <div className="relative mx-auto h-64 w-full rounded-lg">
                <img
                  className="relative h-full w-full rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                  alt=""
                />
                <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white bg-transparent text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                    href="#"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <a href="#">
                <img
                  className="mx-auto h-64 w-full rounded object-cover"
                  src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=968&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <a href="#">
                <img
                  className="mx-auto h-64 w-full rounded object-cover"
                  src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <a href="#">
                <img
                  className="mx-auto h-64 w-full rounded object-cover"
                  src="https://images.unsplash.com/photo-1459213599465-03ab6a4d5931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <a href="#">
                <img
                  className="mx-auto h-64 w-full rounded object-cover"
                  src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1127&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
              <a href="#">
                <img
                  className="mx-auto h-64 w-full rounded object-cover"
                  src="https://images.unsplash.com/photo-1413752362258-7af2a667b590?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1055&q=80"
                  alt=""
                />
              </a>
            </div> */}
        </div>
      );
    } else if (category === "category_3") {
      return <p>Category 3</p>;
    } else if (category === "category_4") {
      return <p>Category 4</p>;
    } else {
      return <p>Category 1</p>;
    }
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
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption === undefined ? null : (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title === undefined ? null : (
              <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
            {caption === undefined || title === undefined ? null : (
              <div className="inline-flex flex-wrap py-1 sm:px-1 sm:space-x-1 bg-white rounded text-sm">
                <button
                  onClick={() => setCategory("category_1")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
                    category === "category_1"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                  }`}
                >
                  Category 1
                </button>
                <button
                  onClick={() => setCategory("category_2")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
                    category === "category_2"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                  }`}
                >
                  Category 2
                </button>
                <button
                  onClick={() => setCategory("category_3")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
                    category === "category_3"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                  }`}
                >
                  Category 3
                </button>
                <button
                  onClick={() => setCategory("category_4")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
                    category === "category_4"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                  }`}
                >
                  Category 4
                </button>
              </div>
            )}
          </div>
          {renderCategory()}
          <div className="text-center">
            {primaryButton?.label && (
              <a
                className="inline-block py-2 px-6 leading-loose rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold"
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

export default React.memo(VariantA);
