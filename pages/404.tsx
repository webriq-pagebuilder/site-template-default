import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "components/layout/index";
import { Heading, Text } from "components/ui";

function PageNotFound() {
  const router = useRouter();

  const handleReloadPage = () => {
    router.reload();
  };

  return (
    <>
      <Head>
        <title>404: Page not found</title>
      </Head>
      <section>
        <div className="skew skew-top mr-for-radius">
          <svg
            className="w-full h-8 text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 10 0 10" />
          </svg>
        </div>
        <div className="skew skew-top ml-for-radius">
          <svg
            className="w-full h-8 text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 10 10 0 10 10" />
          </svg>
        </div>
        <div className="py-20 radius-for-skewed bg-gray-50">
          <Container>
            <div className="text-center">
              <Text fontSize="4xl" weight="bold" className="mb-6 text-primary">
                Whoops!
              </Text>
              <Heading type="h3" fontSize="4xl" className="mb-2" weight="bold">
                Something went wrong!
              </Heading>
              <Text muted className="mb-8">
                Sorry, but we are unable to open this page
              </Text>
              <div>
                <Link
                  className="inline-block w-full px-6 py-2 mb-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-primary-foreground text-gray-50 hover:bg-primary lg:mb-0 lg:mr-4 lg:w-auto"
                  href="/"
                >
                  Go back to Homepage
                </Link>
                <button
                  className="inline-block w-full px-6 py-2 font-bold leading-loose bg-white rounded-l-xl rounded-t-xl hover:bg-gray-50 lg:w-auto"
                  onClick={handleReloadPage}
                >
                  Try Again
                </button>
              </div>
            </div>
          </Container>
        </div>
        <div className="skew skew-bottom mr-for-radius">
          <svg
            className="w-full h-8 text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 0 0 10" />
          </svg>
        </div>
        <div className="skew skew-bottom ml-for-radius">
          <svg
            className="w-full h-8 text-gray-50 md:h-12 lg:h-20"
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
export default React.memo(PageNotFound);
