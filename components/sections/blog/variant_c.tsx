import { format } from "date-fns";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { BlogPost } from "types";
import { BlogProps } from ".";

function VariantC({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 3;

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex
          align="center"
          justify="between"
          className="flex-col mb-16 md:flex-row"
          gap={4}
        >
          <div className="text-center md:text-left">
            {subtitle && (
              <Text weight="bold" color="primary">
                {subtitle}
              </Text>
            )}
            {title && <Heading>{title}</Heading>}
          </div>

          {primaryButton?.label && (
            <Button
              asLink
              link={primaryButton}
              ariaLabel={primaryButton?.label}
            >
              {primaryButton?.label}
            </Button>
          )}
        </Flex>
        {posts && (
          <div>
            {posts?.slice(0, blogsPerPage)?.map((post, key) => (
              <div
                className="flex flex-wrap mb-8 overflow-hidden rounded-lg shadow"
                key={key}
              >
                <BlogItem
                  post={post}
                  className={`${
                    key % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  key={key}
                />
              </div>
            ))}
          </div>
        )}
        {primaryButton?.label && (
          <div className="w-full text-center lg:hidden">
            <Button
              asLink
              link={primaryButton}
              ariaLabel={primaryButton?.label}
            >
              {primaryButton?.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

function BlogItem({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Flex
      wrap
      className={`overflow-hidden rounded-lg shadow  w-full ${className}`}
    >
      {post?.mainImage && (
        <Image
          className="object-cover w-full h-auto rounded-l lg:w-1/2"
          src={urlFor(post?.mainImage)}
          sizes="100vw"
          width={554}
          height={416}
          alt={`blog-variantC-image-`}
        />
      )}
      <div className="w-full px-6 py-6 bg-white rounded-r lg:w-1/2 lg:pt-10">
        {post?.categories &&
          post?.categories?.map((category, index) => (
            <Badge
              className=" bg-secondary-foreground text-primary"
              key={index}
            >
              {category?.title}
            </Badge>
          ))}
        {post?.publishedAt && (
          <Text muted>
            {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
          </Text>
        )}
        {post?.title && (
          <Heading className="my-4" type="h3">
            {post?.title}
          </Heading>
        )}
        {post?.authors && (
          <div className="flex mb-10">
            <span className="italic text-primary">By&nbsp;</span>
            {post?.authors?.map((author, index, { length }) => (
              <>
                <Text className="italic text-primary">{author?.name}</Text>
                {index + 1 !== length ? <span>&nbsp;,&nbsp;</span> : null}
              </>
            ))}
          </div>
        )}
        {post?.excerpt && (
          <Text muted className="mb-6 leading-loose text-justify">
            {post?.excerpt}
          </Text>
        )}
        {post?.slug?.current && (
          <Link
            aria-label="View Blog Post"
            className="font-bold text-primary hover:text-primary-foreground"
            href={`/${post?.slug?.current}` ?? "/page-not-found"}
          >
            View Blog Post
          </Link>
        )}
      </div>
    </Flex>
  );
}
export default React.memo(VariantC);
