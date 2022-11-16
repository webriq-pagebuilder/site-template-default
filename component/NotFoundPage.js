import { memo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function NotFoundPage({ data }) {
  const router = useRouter();

  // TODO: data = "preview" true or false so use the variable to return the correct 404 text

  return (
    <>
      <Head>
        <title>404: Not found | WebriQ</title>
      </Head>
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
              <span className="mb-6 text-4xl text-webriq-darkblue font-bold">
                Whoops!
              </span>
              <h3 className="mb-2 text-4xl font-bold">Something went wrong!</h3>
              <p className="mb-8 text-gray-400">
                Sorry, but we are unable to open this page
              </p>
              <div>
                <a
                  className="w-full lg:w-auto mb-2 lg:mb-0 lg:mr-4 inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose text-gray-50 bg-webriq-blue hover:bg-webriq-darkblue"
                  href="/"
                >
                  Go back to Homepage
                </a>
                <button
                  className="w-full lg:w-auto inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose bg-white hover:bg-gray-50"
                  type="button"
                  onClick={() => router.reload()}
                >
                  Try Again
                </button>
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
export default memo(NotFoundPage);
