import React from "react";
import Link from "next/link";
import { Container } from "@stackshift-ui/container";
import { Heading } from "@stackshift-ui/heading";
import { Text } from "@stackshift-ui/text";

function Success() {
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
              <Text weight="bold" fontSize="4xl" className="mb-10 text-primary">
                Success!
              </Text>
              <Heading weight="bold" fontSize="4xl" className="mb-10">
                Thank you for your purchase!
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
export default React.memo(Success);
