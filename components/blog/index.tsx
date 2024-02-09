import InlineEditor from "components/InlineEditor";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { InlineEditorContext } from "context/InlineEditorContext";
import { format } from "date-fns";
import { PortableText, urlFor } from "lib/sanity";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogsData, MyPortableTextComponents } from "types";

const Navigation = dynamic(() => import("components/sections/navigation"));
const Footer = dynamic(() => import("components/sections/footer"));
// block styling as props to `components` of the PortableText component
const blockStyle: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return (
        <Heading fontSize="5xl" className="mb-6 leading-loose text-gray-900">
          {children}
        </Heading>
      );
    },
    h2: ({ children }) => {
      return (
        <Heading
          type="h2"
          fontSize="4xl"
          className="mb-6 leading-loose text-gray-900"
        >
          {children}
        </Heading>
      );
    },
    h3: ({ children }) => {
      return (
        <Heading
          type="h3"
          fontSize="3xl"
          className="mb-6 leading-loose text-gray-900"
        >
          {children}
        </Heading>
      );
    },
    h4: ({ children }) => {
      return (
        <Heading
          fontSize="2xl"
          type="h4"
          className="mb-6 leading-loose text-gray-900"
        >
          {children}
        </Heading>
      );
    },
    h5: ({ children }) => {
      return (
        <Heading
          fontSize="xl"
          type="h5"
          className="mb-6 leading-loose text-gray-900"
        >
          {children}
        </Heading>
      );
    },
    h6: ({ children }) => {
      return (
        <Heading
          fontSize="lg"
          type="h6"
          className="mb-6 leading-loose text-gray-900"
        >
          {children}
        </Heading>
      );
    },
    normal: ({ children }) => {
      return (
        <Text className="mb-6 leading-loose text-justify text-gray-900">
          {children}
        </Text>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 italic leading-loose text-gray-500 px-14">
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    return (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    );
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul className="pl-10 mb-6 leading-loose text-gray-900 list-disc">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="pl-10 mb-6 leading-loose text-gray-900 list-decimal">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <Link
        className="hover:text-primary-foreground text-primary"
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  types: {
    addImage: ({ value }) => (
      <Image
        className="w-full h-full mb-10"
        width={300}
        height={300}
        src={urlFor(value?.image)}
        alt={value?.alt ?? value?.image?.asset?._ref}
      />
    ),
  },
};

interface BlogSectionsProps {
  data: BlogsData;
}

function BlogSections({ data }: BlogSectionsProps) {
  const blogData: BlogsData = data || data?.[0];

  const showInlineEditor = React.useContext(InlineEditorContext);
  if (!blogData) {
    return null;
  }

  const {
    _id,
    _type,
    authors,
    categories,
    body,
    mainImage,
    publishedAt,
    title,
    navigation,
    footer,
  } = blogData;

  return (
    <InlineEditor
      document={{
        id: _id,
        type: _type,
      }}
      showInlineEditor={showInlineEditor}
      key={_id}
    >
      {navigation && (
        <Navigation
          data={navigation}
          template={{
            bg: "gray",
            color: "webriq",
          }}
        />
      )}
      <section className="pb-20">
        <div
          className="p-20 mb-12"
          style={{
            backgroundImage: `url(${mainImage && urlFor(mainImage)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Container>
            <Container maxWidth={"2xl"} className="text-center">
              {categories &&
                categories?.map((tag, index) => (
                  <span
                    className="mr-2 text-base uppercase text-primary-foreground lg:text-xl"
                    key={index}
                  >
                    {tag?.title}
                  </span>
                ))}
              {categories && publishedAt && (
                <span className="mx-2 text-base text-gray-500 uppercase lg:text-xl">
                  •
                </span>
              )}
              {publishedAt && (
                <span
                  className={`text-base text-white lg:text-xl ${
                    categories ?? "ml-2"
                  }`}
                >
                  {format(new Date(publishedAt), "MMMM dd, yyyy")}
                </span>
              )}
              <div className="mt-2">
                {title && (
                  <Heading weight="bold" className="mb-6 text-white">
                    {title}
                  </Heading>
                )}
                <div className="flex justify-center">
                  {authors &&
                    authors?.map((author, index, { length }) => (
                      <Flex justify="center" className="mr-2" key={index}>
                        <div className="mr-4">
                          {author?.profile?.image ? (
                            <Image
                              className="object-cover object-top w-12 h-12 rounded-full"
                              width={48}
                              height={48}
                              src={urlFor(author?.profile?.image)}
                              alt={author?.profile?.alt ?? author?.name}
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                            </svg>
                          )}
                        </div>
                        <div className="text-left">
                          <Heading
                            type="h3"
                            weight="bold"
                            fontSize="base"
                            className="text-primary-foreground"
                          >
                            {author?.name}
                          </Heading>
                          {index + 1 !== length ? (
                            <span>&nbsp;and&nbsp;</span>
                          ) : null}
                          <span className="text-xs italic text-secondary-foreground">
                            {authors?.length > 1 ? "Authors" : "Author"}
                          </span>
                        </div>
                      </Flex>
                    ))}
                </div>
              </div>
            </Container>
          </Container>
        </div>
        <Container>
          {body && (
            <div className="max-w-4xl mx-auto break-all">
              <PortableText value={body} components={blockStyle} />
            </div>
          )}
        </Container>
      </section>
      {footer && (
        <Footer
          data={footer}
          template={{
            bg: "gray",
            color: "webriq",
          }}
        />
      )}
    </InlineEditor>
  );
}

export default React.memo(BlogSections);
