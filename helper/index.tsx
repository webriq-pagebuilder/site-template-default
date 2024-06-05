import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import {
  LabeledRoute,
  LabeledRouteWithKey,
  Logo,
  MyPortableTextComponents,
} from "types";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";

interface ConditionalLinkTypes {
  className?: string;
  ariaLabel: string; // required for A11Y
  style?: any;
  children: string | React.ReactNode;
  link: LabeledRoute | LabeledRouteWithKey | undefined;
  target?: string;
}

// WebriQ form redirect thank you page on successful submission
export const thankYouPageLink = (link) => {
  if (!link) {
    return "/thank-you";
  } else {
    if (link?.linkType === "linkInternal") {
      return `/${link?.internalLink}`;
    } else {
      return link?.externalLink;
    }
  }
};

// Logo link
export const logoLink = (logo: Logo) => {
  if (logo?.internalLink && logo?.type === "linkInternal") {
    if (logo?.internalLink?.toLowerCase()?.includes("home")) {
      return "/";
    }
    return `/${logo.internalLink}`;
  } else if (logo?.externalLink && logo?.type === "linkExternal") {
    return logo?.externalLink ?? "/";
  } else {
    return "/";
  }
};

export const extractLink = (link: LabeledRoute): string => {
  //not found page
  if (!link?.internalLink && !link?.externalLink) {
    return "/page-not-found";
  }

  //home page
  if (
    link?.type === "linkInternal" &&
    link?.internalLink?.toLowerCase()?.includes("home")
  ) {
    return "/";
  }

  //internal link
  if (link?.type === "linkInternal") {
    return `/${link?.internalLink}`;
  }

  //external link
  if (link?.type === "linkExternal") {
    return `${link?.externalLink}`;
  }

  return "/";
};

// Conditional Link
export const ConditionalLink = ({
  className,
  ariaLabel,
  style = {},
  children,
  link,
  target,
}: ConditionalLinkTypes) => {
  const defaultStyle =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-primary hover:bg-primary-foreground text-gray-50 font-bold leading-loose outline-none transition duration-200";

  if (!link?.internalLink && !link?.externalLink) {
    return (
      <a
        className={className ?? defaultStyle}
        aria-label={ariaLabel}
        //style={style}
        target={target}
        href="/page-not-found"
      >
        {children}
      </a>
    );
  } else if (
    link?.type === "linkInternal" &&
    link?.internalLink?.toLowerCase()?.includes("home")
  ) {
    return (
      <Link
        href="/"
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        target={target}
      >
        {children}
      </Link>
    );
  } else if (link?.type === "linkInternal") {
    return (
      <Link
        href={`/${link?.internalLink}`}
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        target={target}
      >
        {children}
      </Link>
    );
  } else if (link?.type === "linkExternal") {
    return (
      <a
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        href={link?.externalLink}
        target={target}
        rel={link?.linkTarget === "_blank" ? "noopener noreferrer" : null}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link
        href="/"
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        target={target}
      >
        {children}
      </Link>
    );
  }
};

export const defaultBlockStyle: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <Heading
        fontSize="3xl"
        weight="bold"
        className="mb-8 leading-normal text-black dark:text-white"
      >
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading
        type="h2"
        weight="bold"
        fontSize="2xl"
        className="mb-8 text-black dark:text-white"
      >
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading
        type="h3"
        fontSize="xl"
        weight="bold"
        className="mb-8 leading-normal text-black dark:text-white"
      >
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading
        type="h4"
        weight="bold"
        fontSize="lg"
        className="mb-8 leading-normal text-black dark:text-white"
      >
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <Text className="mb-8 leading-relaxed">{children}</Text>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-6 italic leading-loose text-gray-500 px-14">
        - {children}
      </blockquote>
    ),
  },
  code: ({ value }) => (
    <pre data-language={value.language}>
      <code>{value.code}</code>
    </pre>
  ),
  list: {
    bullet: ({ children }) => (
      <ul className="flex flex-col pl-10 mb-8 space-y-4 leading-relaxed list-disc">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="flex flex-col pl-10 mb-8 space-y-4 leading-relaxed list-decimal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        className="hover:text-primary-foreground text-primary"
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    addImage: ({ value }) => (
      <Image
        className="w-full h-full mb-5"
        width={500}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={urlFor(value?.image)}
        alt={value?.alt ?? value?.image?.asset?._ref}
      />
    ),
  },
};

export const DefaultSocialMediaIcons = ({ platform }) => {
  if (platform === "instagram") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#0045d8"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
    );
  } else if (platform === "facebook") {
    return (
      <svg
        className=""
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#0045d8"
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
        />
      </svg>
    );
  } else {
    return null;
  }
};
