import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { SanityBody, SanityImage, Author, BlogPost } from "types";

import { BlogProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Text, Heading, Card, Button } from "components/ui";

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
  const [activeTab, setActiveTab] = React.useState("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

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
  const filteredPosts =
    activeTab === "All"
      ? posts?.filter(
          (post) =>
            post?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : transformedPosts.filter(
          (item) =>
            item?.category === activeTab &&
            item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  //Pagination
  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveTab("All");
    setCurrentPage(1);
  };

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
        <div className="flex justify-center lg:justify-start mb-5 w-full lg:w-1/4">
          <input
            aria-label="Search, find any question you want to ask..."
            className="w-full p-4 text-xs bg-white rounded-l font-heading focus:border-gray-500 focus:outline-none"
            placeholder="Search posts..."
            onChange={handleSearchChange}
          />
          <Button
            as="button"
            variant="unstyled"
            ariaLabel="Search button"
            className="pr-4 bg-white rounded-r-lg text-primary"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}
              />
            </svg>
          </Button>
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
          {filteredPosts?.length === 0 && (
            <div className="w-full px-3 lg:w-3/4 font-medium text-lg">
              No post available.
            </div>
          )}
          {posts && (
            <div className="w-full px-3 lg:w-3/4">
              {activeTab === "All"
                ? currentPosts?.map((post, index) => (
                    <PostItem post={post} key={index} />
                  ))
                : currentPosts
                    ?.slice(0, blogsPerPage)
                    ?.map((post, index) => (
                      <PostItem post={post} key={index} />
                    ))}
            </div>
          )}
        </Flex>
        {blogsPerPage && (
          <Pagination
            blogsPerPage={blogsPerPage}
            totalBlogs={filteredPosts?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </Container>
    </section>
  );
}

function CategoryItem({ activeTab, setActiveTab, category }) {
  return (
    <Button
      as="button"
      variant="unstyled"
      ariaLabel="Show all blog posts"
      className={`mb-4 block ${
        !category ? "hidden" : "block"
      } px-3 py-2 hover:bg-secondary-foreground focus:outline-none w-full text-left rounded ${
        activeTab === category
          ? "font-bold text-primary focus:outline-none bg-secondary-foreground"
          : null
      }`}
      onClick={() => setActiveTab(category)}
    >
      {category}
    </Button>
  );
}

function PostItem({ post }) {
  return (
    <Flex wrap className="mb-8 lg:mb-6 bg-white shadow rounded-lg">
      <div className="w-full h-fullmb-4 lg:mb-0 lg:w-1/4">
        <Image
          className="object-cover w-full h-full overflow-hidden rounded"
          src={
            post?.mainImage ? urlFor(post?.mainImage) : "/webriq-logo-lg.png"
          }
          sizes="100vw"
          width={188}
          height={129}
          alt={`blog-variantD-image-`}
        />
      </div>
      <div className="w-full px-3 py-2 lg:w-3/4">
        {post?.title && (
          <Link
            aria-label={post?.title}
            className="mb-1 text-2xl font-bold hover:text-secondary font-heading"
            href={`/${post?.slug?.current ?? "page-not-added"}`}
          >
            {post?.title.length > 25
              ? post?.title?.substring(0, 25) + "..."
              : post?.title}
          </Link>
        )}
        <div className="flex flex-wrap items-center mb-2 text-sm">
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
        {post?.excerpt && (
          <Text muted>
            {post?.excerpt.length > 60
              ? post?.excerpt.substring(0, 60) + "..."
              : post?.excerpt}
          </Text>
        )}
      </div>
    </Flex>
  );
}
interface PaginationProps {
  blogsPerPage: number;
  totalBlogs: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  blogsPerPage,
  totalBlogs,
  paginate,
  currentPage,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="mt-4" aria-label="Pagination">
      <ul className="flex space-x-2 justify-end mr-5">
        {pageNumber.map((number) => (
          <Button
            variant="unstyled"
            as="button"
            ariaLabel={`Page ${number}`}
            key={number}
            className={`${
              currentPage === number
                ? "bg-secondary-foreground text-white"
                : "bg-white hover:bg-secondary-foreground hover:text-white"
            } text-primary font-medium py-2 px-4 border border-primary rounded focus:outline-none`}
            onClick={() => paginate(number)}
          >
            {number}
          </Button>
        ))}
      </ul>
    </nav>
  );
};

export default React.memo(VariantD);
