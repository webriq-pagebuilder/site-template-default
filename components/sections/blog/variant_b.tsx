import React from "react";
import { Text } from "components/ui/Text";

import { BlogProps } from "./index";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { BlogCard } from "./stories/use-cases/blog-card";

function VariantB({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 5,
    count = 0;

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center mb-6">
            <div className="w-full mb-16 text-center">
              {subtitle && (
                <Text className="font-bold text-webriq-darkblue">
                  {subtitle}
                </Text>
              )}
              {title && <Text type="h1">{title}</Text>}
            </div>
            <div className="flex flex-wrap mb-16 -mx-3">
              <div className="w-full px-3 mb-6 lg:mb-0 lg:w-1/2">
                {posts
                  ?.slice(count, count + 1)
                  ?.map((post, key) => <BlogCard post={post} key={key} />)}
              </div>
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts?.slice(count + 1, blogsPerPage)?.map((post, key) => (
                  <div className="w-full px-3 mb-6 lg:w-1/2" key={key}>
                    <BlogCard
                      className="overflow-hidden rounded shadow"
                      post={post}
                      key={key}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              {primaryButton?.label && (
                <ConditionalLink
                  link={primaryButton}
                  className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
                  ariaLabel={primaryButton?.label}
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
