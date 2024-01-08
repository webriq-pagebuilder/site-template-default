import { Card } from "components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { BlogPost } from "types";
import { format } from "date-fns";
import { cn } from "utils/cn";
import { StyleVariants } from "components/ui/types";

export interface BlogCard {
  post: BlogPost;
  className?: string;
  variant?: Variant;
}

export type Variant = "primary" | "secondary";

export function BlogCard({ post, className, variant = "primary" }: BlogCard) {
  const commonClass = "p-0 bg-white";

  const variants: StyleVariants<Variant> = {
    primary: `${commonClass}`,
    secondary: `${commonClass} flex`,
  };

  const variantClass = variants[variant] ?? variants["primary"];
  return (
    <Card className={cn(variantClass, className)}>
      {post?.mainImage && (
        <Image
          className={`object-cover w-full h-full overflow-hidden rounded-t ${
            variant === "secondary" && "lg:w-1/2"
          }`}
          src={urlFor(post?.mainImage)}
          sizes="100vw"
          width={271}
          height={248}
          alt={`blog-variantB-image`}
        />
      )}
      {variant === "primary" ? (
        <div className="p-6 mt-auto bg-white rounded-b">
          {post?.publishedAt && (
            <span className="text-sm text-gray-500">
              {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
            </span>
          )}
          {post?.title && (
            <h1 className="my-2 text-lg font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
              {post?.title}
            </h1>
          )}
          {post?.excerpt && (
            <p className="mb-6 text-xs leading-loose text-justify text-gray-500 lg:text-base xl:text-base 2xl:text-base">
              {post?.excerpt}
            </p>
          )}
          {post?.slug?.current && (
            <Link
              aria-label="View Blog Post"
              className="font-bold text-webriq-darkblue hover:text-webriq-babyblue"
              href={`/${post?.slug?.current}` ?? "/page-not-found"}
            >
              View Blog Post
            </Link>
          )}
        </div>
      ) : (
        <Test post={post} />
      )}
    </Card>
  );
}

function Test({ post }: { post: BlogPost }) {
  return (
    <div className="w-full px-6 py-6 bg-white rounded-r lg:w-1/2 lg:pt-10">
      {post?.categories &&
        post?.categories?.map((category, index) => (
          <span
            className="px-3 py-1 mb-auto mr-3 text-sm font-bold uppercase rounded-full bg-webriq-lightblue text-webriq-darkblue"
            key={index}
          >
            {category?.title}
          </span>
        ))}
      {post?.publishedAt && (
        <span className="text-sm text-gray-500">
          {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
        </span>
      )}
      {post?.title && (
        <h1 className="my-4 text-xl font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
          {post?.title}
        </h1>
      )}
      {post?.authors && (
        <div className="flex mb-10">
          <span className="italic text-webriq-darkblue">By&nbsp;</span>
          {post?.authors?.map((author, index, { length }) => (
            <div key={index}>
              <span className="italic text-webriq-darkblue">
                {author?.name}
              </span>
              {index + 1 !== length ? <span>&nbsp;,&nbsp;</span> : null}
            </div>
          ))}
        </div>
      )}
      {post?.excerpt && (
        <p className="mb-6 text-sm text-justify text-gray-500 lg:text-base lg:leading-loose xl:text-base xl:leading-loose 2xl:text-base 2xl:leading-loose">
          {post?.excerpt}
        </p>
      )}
      {post?.slug?.current && (
        <Link
          aria-label="View Blog Post"
          className="font-bold text-webriq-darkblue hover:text-webriq-blue"
          href={`/${post?.slug?.current}` ?? "/page-not-found"}
        >
          View Blog Post
        </Link>
      )}
    </div>
  );
}
