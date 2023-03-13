import Link from "next/link";

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
export const logoLink = (logo) => {
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

// Internal link used in routes or menus and buttons
export const InternalLink = (link, className) => {
  if(!link) {
    return "/page-not-found"
  } else {
    if(link?.internalLink?.toLowerCase() === "home") {
      return "/"
    } else {
      return (
        <Link
          aria-label={link?.label}
          className={className}
          target={link?.linkTarget}
          rel={
            link?.linkTarget === "_blank"
              ? "noopener noreferrer"
              : null
          }
          href={`/${link.internalLink}`}
        >
          {link?.label}
        </Link>
      )
    }
  }
}

// External link used in routes or menus and buttons
export const ExternalLink = (link, className) => {
  if(!link) {
    return "/link-not-found"
  } else {
    return (
      <a
        aria-label={link?.label}
        className={className}
        target={link?.linkTarget}
        href={link?.externalLink}
        rel={
          link?.linkTarget === "_blank"
            ? "noopener noreferrer"
            : null
        }
      >
        {link?.label}
      </a>
    )
  }
}
