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
