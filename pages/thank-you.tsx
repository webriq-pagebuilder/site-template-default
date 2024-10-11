import React from "react";
import Link from "next/link";
import { Container } from "@stackshift/components-layout";
import { Heading, Text } from "@stackshift/components-common";

function ThankYouForm() {
  return (
    <>
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
              <Text fontSize="4xl" weight="bold" className="mb-10 text-primary">
                Success!
              </Text>
              <Heading type="h4" fontSize="4xl" weight="bold" className="mb-10">
                Thank you for your response
              </Heading>
              <div>
                <Link
                  className="inline-block w-full px-6 py-2 mb-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-primary-foreground text-gray-50 hover:bg-primary lg:mb-0 lg:mr-4 lg:w-auto"
                  href="/"
                >
                  Go back to Homepage
                </Link>
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
export default React.memo(ThankYouForm);
