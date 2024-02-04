import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { SanityBody, SanityImage, Author, BlogPost } from "types";

import { BlogProps } from ".";
import { Container } from "components/layout/Container";
import { Text } from "components/ui/Text";
import { Heading } from "components/ui/Heading";
import { Card } from "components/ui/Card";
import { Flex } from "components/layout/Flex/Flex";

interface BlogPostProps extends SanityBody {
  category?: string;
  title?: string;
  slug?: {
    _type: "slug";
    current: string;
  };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  authors?: Author[];
}

function VariantD({ subtitle, title, posts }: BlogProps) {
  let blogsPerPage = 6;
  const [activeTab, setActiveTab] = React.useState("All"); //set the first index category as initial value
  const transformedPosts: BlogPostProps[] = posts
    ?.map((post) => {
      return post?.categories?.map((category) => {
        return {
          category: category?.title,
          title: post?.title,
          slug: post?.slug,
          excerpt: post?.excerpt,
          publishedAt: post?.publishedAt,
          mainImage: post?.mainImage,
          authors: post?.authors,
        } as BlogPostProps;
      });
    })
    .flat();

  // get all categories
  const categories: string[] = transformedPosts?.reduce((newArr, items) => {
    const titles = items?.category;

    if (newArr.indexOf(titles) === -1) {
      newArr.push(titles);
    }
    return newArr;
  }, []);

  // filtered posts per category
  const postsPerCategory = transformedPosts?.filter(
    (items) => items?.category === activeTab
  );

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="w-full mb-16">
          {subtitle && (
            <Text weight={"bold"} className="text-primary">
              {subtitle}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </div>

        <Flex wrap>
          <Card className="w-full px-3 mb-8 bg-white lg:mb-0 lg:w-1/4">
            {categories && (
              <>
                <Heading
                  type="h3"
                  muted
                  weight={"bold"}
                  className="mb-4 text-base uppercase lg:text-base"
                >
                  Topics
                </Heading>
                <ul>
                  {categories?.length > 1 && (
                    <li>
                      <CategoryItem
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        category={"All"}
                      />
                    </li>
                  )}
                  {categories?.map((category, index) => (
                    <li key={index}>
                      <CategoryItem
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        category={category}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>
          {posts && (
            <div className="w-full px-3 lg:w-3/4">
              {activeTab === "All"
                ? posts
                    ?.slice(0, blogsPerPage)
                    ?.map((post, index) => <PostItem post={post} key={index} />)
                : postsPerCategory?.map((post, index) => (
                    <PostItem post={post} key={index} />
                  ))}
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}

function CategoryItem({ activeTab, setActiveTab, category }) {
  return (
    <button
      aria-label="Show all blog posts"
      className={`mb-4 block px-3 py-2 hover:bg-secondary-foreground focus:outline-none w-full text-left rounded ${
        activeTab === category
          ? "font-bold text-primary focus:outline-none bg-secondary-foreground"
          : null
      }`}
      onClick={() => setActiveTab(category)}
    >
      {category}
    </button>
  );
}

function PostItem({ post }) {
  return (
    <Flex wrap className="mb-8 lg:mb-6">
      <div className="w-full h-full px-3 mb-4 lg:mb-0 lg:w-1/4">
        {post?.mainImage && (
          <Image
            className="object-cover w-full h-full overflow-hidden rounded"
            src={urlFor(post?.mainImage)}
            sizes="100vw"
            width={188}
            height={129}
            alt={`blog-variantD-image-`}
          />
        )}
      </div>
      <div className="w-full px-3 lg:w-3/4">
        {post?.title && (
          <Link
            aria-label={post?.title}
            className="mb-1 text-2xl font-bold hover:text-secondary font-heading"
            href={`/${post?.slug?.current ?? "page-not-added"}`}
          >
            {post?.title}
          </Link>
        )}
        <div className="flex items-center mb-2 text-sm">
          {post?.authors &&
            post?.authors?.map((author, index, { length }) => (
              <div className="flex" key={index}>
                <Text className="text-primary">{author?.name}</Text>
                {index + 1 !== length ? <span>&nbsp;,&nbsp;</span> : null}
              </div>
            ))}
          {post?.publishedAt && post?.authors && (
            <span className="mx-2 text-gray-500">•</span>
          )}
          {post?.publishedAt && (
            <Text muted>
              {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
            </Text>
          )}
        </div>
        {post?.excerpt && <Text muted>{post?.excerpt}</Text>}
      </div>
    </Flex>
  );
}
export default React.memo(VariantD);
