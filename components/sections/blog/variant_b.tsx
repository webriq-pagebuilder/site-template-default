import Image from "next/image";
import React from "react";

import { Container, Flex } from "components/layout/index";
import { Button, Heading, Text } from "components/ui";
import { format } from "date-fns";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import { BlogPost } from "types";
import { BlogProps } from "./index";

function VariantB({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 5,
    count = 0;

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="w-full mb-16 text-center">
          {subtitle && (
            <Text weight="bold" className="text-primary">
              {subtitle}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </div>
        <Flex wrap justify="center" className="mb-16" gap={4}>
          <div className="w-full lg:w-[45%]">
            {posts
              ?.slice(count, count + 1)
              ?.map((post, key) => <BlogItem post={post} key={key} />)}
          </div>
          <Flex wrap className="w-full lg:w-[45%]" gap={4}>
            {posts?.slice(count + 1, blogsPerPage)?.map((post, key) => (
              <div className="w-full lg:basis-[45%]" key={key}>
                <BlogItem post={post} />
              </div>
            ))}
          </Flex>
        </Flex>

        <div className="text-center">
          {primaryButton?.label && (
            <Button
              as="link"
              link={primaryButton}
              ariaLabel={primaryButton?.label}
            >
              {primaryButton?.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

function BlogItem({ post }: { post: BlogPost }) {
  return (
    <div className="overflow-hidden rounded shadow">
      {post?.mainImage && (
        <Image
          className="object-cover w-full h-full overflow-hidden rounded-t"
          src={urlFor(post?.mainImage)}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
          width={271}
          height={248}
          alt={`blog-variantB-image-`}
        />
      )}
      <div className="p-6 bg-white ">
        {post?.publishedAt && (
          <Text muted className="text-sm ">
            {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
          </Text>
        )}
        {post?.title && (
          <Heading type="h3" className="my-2">
            {post?.title}
          </Heading>
        )}
        {post?.excerpt && (
          <Text muted className="mb-6 text-justify">
            {post?.excerpt}
          </Text>
        )}
        {post?.slug?.current && (
          <Link
            aria-label="View Blog Post"
            className="font-bold text-primary hover:text-secondary"
            href={`/${post?.slug?.current}` ?? "/page-not-found"}
          >
            View Blog Post
          </Link>
        )}
      </div>
    </div>
  );
}
export default React.memo(VariantB);
