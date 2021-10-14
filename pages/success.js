import React from "react";
import Link from "next/link";

function Success() {
  return (
    <>
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
            <div className="text-center">
              <p className="mb-10 text-4xl text-webriq-darkblue font-bold">
                Success!
              </p>
              <h4 className="mb-10 text-4xl font-bold">
                Thank you for your purchase!
              </h4>
              <div>
                <Link href="/">
                  <a className="w-full lg:w-auto mb-2 lg:mb-0 lg:mr-4 inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose text-gray-50 bg-webriq-blue hover:bg-webriq-darkblue">
                    Go back to Homepage
                  </a>
                </Link>
              </div>
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
    </>
  );
}
export default React.memo(Success);
