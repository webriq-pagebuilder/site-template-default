import Link from "next/link";
import { Logo, MyPortableTextComponents } from "types";

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

// Conditional links
export const ConditionalBtnOrLink = ({ value, style }) => {
  const defaultStyle =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200";

  if (
    (value?.internalLink || value?.linkInternal) &&
    value?.type === "linkInternal"
  ) {
    // internal link
    if (value?.internalLink?.toLowerCase() === "home") {
      return (
        <Link
          aria-label={value?.label}
          className={style ?? defaultStyle}
          target={value?.linkTarget}
          rel={value?.linkTarget === "_blank" ? "noopener noreferrer" : null}
          href={`/`}
        >
          {value?.label}
        </Link>
      );
    } else {
      return (
        <Link
          aria-label={value?.label}
          className={style ?? defaultStyle}
          target={value?.linkTarget}
          rel={value?.linkTarget === "_blank" ? "noopener noreferrer" : null}
          href={`/${value.internalLink}`}
        >
          {value?.label}
        </Link>
      );
    }
  } else if (
    (value?.externalLink || value?.linkExternal) &&
    value?.type === "linkExternal"
  ) {
    // external link (includes mailto and tel)
    return (
      <Link
        aria-label={value?.label}
        className={style ?? defaultStyle}
        target={value?.linkTarget}
        href={value?.externalLink}
        rel={value?.linkTarget === "_blank" ? "noopener noreferrer" : null}
      >
        {value?.label}
      </Link>
    );
  } else {
    return (
      <a className={style ?? defaultStyle} href="/link-not-found">
        {value?.label}
      </a>
    );
  }
};

export const defaultBlockStyle: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-6 text-7xl leading-loose text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-6 text-5xl leading-loose text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className="mb-6 text-3xl leading-loose text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className="mb-6 text-xl leading-loose text-gray-900">{children}</h4>
      );
    },
    normal: ({ children }) => {
      return (
        <p className="mb-6 text-justify leading-loose text-gray-900">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 px-14 italic leading-loose text-gray-500">
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
        <ul className="mb-6 list-disc pl-10 leading-loose text-gray-900">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="mb-6 list-decimal leading-loose text-gray-900">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        className="hover:text-webriq-darkorange text-webriq-lightorange"
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
      <img
        className="mb-5 h-full w-full"
        src={urlFor(value?.image)}
        alt={value?.alt ?? value?.image?.asset?._ref}
      />
    ),
  },
};