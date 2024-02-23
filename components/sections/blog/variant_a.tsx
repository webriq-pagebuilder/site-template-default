import { format } from "date-fns";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Flex, Container } from "components/layout/index";
import { Button, Heading, Text } from "components/ui";

import { BlogPost } from "types";
import { BlogProps } from ".";

function VariantA({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 6,
    count = 0;

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="mb-16 text-center">
          {subtitle && (
            <Text weight="bold" className="text-primary">
              {subtitle}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </div>
        {posts && (
          <Flex gap={4} className="flex-col lg:flex-row">
            <div className="w-full space-y-5 lg:w-1/2">
              {posts
                ?.slice(count, count + 1)
                ?.map((post, key) => <BlogItem post={post} key={key} />)}
              <Flex gap={4} className="flex-col lg:flex-row">
                {posts
                  ?.slice(count + 1, count + 3)
                  ?.map((post, key) => <BlogItem post={post} key={key} />)}
              </Flex>
            </div>

            <div className="w-full space-y-5 lg:w-1/2">
              <Flex gap={4} className="flex-col lg:flex-row">
                {posts
                  ?.slice(count + 3, count + 5)
                  ?.map((post, key) => <BlogItem post={post} key={key} />)}
              </Flex>
              {posts
                ?.slice(count + 5, blogsPerPage)
                ?.map((post, key) => <BlogItem post={post} key={key} />)}
            </div>
          </Flex>
        )}
        <div className="mt-10 text-center">
          {primaryButton?.label && (
            <Button link={primaryButton} ariaLabel={primaryButton?.label}>
              {primaryButton?.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

export function BlogItem({ post }: { post: BlogPost }) {
  return (
    <div className="relative w-full h-64 rounded">
      {post?.mainImage && (
        <Image
          className="relative object-cover w-full h-full overflow-hidden rounded"
          src={urlFor(post?.mainImage)}
          alt={`blog-variantA-image`}
          sizes="(min-width: 1540px) 740px, (min-width: 1280px) 612px, (min-width: 1040px) 484px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
          fill
        />
      )}
      <div className="absolute inset-0 bg-gray-900 rounded opacity-75" />
      <div className="absolute inset-0 flex flex-col items-start p-6">
        {post?.categories && (
          <div className="absolute flex left-5 top-5">
            {post?.categories?.map((category, index) => (
              <span
                className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase bg-white rounded-full text-primary"
                key={index}
              >
                {category?.title}
              </span>
            ))}
          </div>
        )}
        {post?.publishedAt && (
          <span className="mt-auto text-sm text-gray-500">
            {format(new Date(post?.publishedAt), "dd MMM, yyyy")}
          </span>
        )}
        {post?.title && (
          <Link
            className="text-xl font-bold text-white transform hover:scale-110 hover:text-secondary motion-reduce:transform-none lg:text-2xl"
            href={`/${post?.slug?.current}` ?? "/page-not-found"}
          >
            {post?.title?.length > 50
              ? post?.title.substring(0, 50) + "..."
              : post?.title}
          </Link>
        )}
      </div>
    </div>
  );
}
export default React.memo(VariantA);
