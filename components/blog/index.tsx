import InlineEditor from "components/InlineEditor";
import { Badge } from "@stackshift-ui/badge";
import { Container } from "@stackshift-ui/container";
import { Heading } from "@stackshift-ui/heading";
import { Text } from "@stackshift-ui/text";
import { InlineEditorContext } from "context/InlineEditorContext";
import { format } from "date-fns";
import { PortableText, urlFor } from "lib/sanity";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogsData, MyPortableTextComponents } from "types";

const Navigation = dynamic(() =>
  import("components/sections/navigation").then((m) => m.Navigation)
);
const Footer = dynamic(() =>
  import("@stackshift-ui/footer").then((m) => m.Footer)
);
// block styling as props to `components` of the PortableText component
const blockStyle: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return (
        <Heading className="mb-6 leading-loose text-gray-900 text-5xl">
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
          className="relative p-20 mb-12"
          style={{
            backgroundImage: `url(${mainImage && urlFor(mainImage)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

          <Container className="relative z-10">
            <Container maxWidth={"2xl"} className="text-center">
              {/* Title */}
              {title && (
                <Heading weight="bold" className="mb-4 text-white">
                  {title}
                </Heading>
              )}

              {/* Authors - "By {name}" format */}
              {authors && authors.length > 0 && (
                <Text className="text-gray-300 mb-2">
                  By{" "}
                  {authors.map((author, index, arr) => (
                    <React.Fragment key={index}>
                      <span className="text-gray-200">{author?.name}</span>
                      {index < arr.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </Text>
              )}

              {/* Date */}
              {publishedAt && (
                <Text className="text-gray-300 text-sm mb-4">
                  {format(new Date(publishedAt), "MMMM dd, yyyy")}
                </Text>
              )}

              {/* Categories as badges */}
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag?.title}
                    </Badge>
                  ))}
                </div>
              )}
            </Container>
          </Container>
        </div>
        <Container>
          {body && (
            <div className="max-w-4xl mx-auto break-all">
              <PortableText
                value={body}
                components={blockStyle}
                onMissingComponent={false} // Disabling warnings / handling unknown types
              />
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
