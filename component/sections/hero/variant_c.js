import React from "react";
import Link from "next/link";

function VariantC({
  // template,
  videoLink,
  title,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="relative pb-56 sm:pb-80">
      <div className="relative pt-12 md:pt-16 pb-32 md:pb-64 bg-gray-50">
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-20">
            <h1 className="mb-10 text-lg md:text-4xl lg:text-5xl font-bold">
              {title && <span>{title}</span>}
            </h1>
            <div>
              {primaryButton?.label &&
              primaryButton?.type === "linkInternal" ? (
                <Link
                  href={
                    primaryButton?.internalLink === "Home" ||
                    primaryButton?.internalLink === "home"
                      ? "/"
                      : `/${
                          primaryButton.internalLink === undefined
                            ? "page-not-found"
                            : primaryButton.internalLink
                        }`
                  }
                >
                  <a
                    aria-label={`Header ${
                      primaryButton?.label ?? "Primary"
                    } button which directs to ${
                      primaryButton?.internalLink === undefined
                        ? "page-not-found"
                        : primaryButton?.internalLink
                    }`}
                    className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                    target={primaryButton?.linkTarget}
                    rel={
                      primaryButton?.linkTarget === "_blank"
                        ? "noopener noreferrer"
                        : null
                    }
                  >
                    {primaryButton?.label}
                  </a>
                </Link>
              ) : (
                <a
                  aria-label={`Header ${
                    primaryButton?.label ?? "Primary"
                  } button which directs to ${
                    primaryButton?.externalLink === undefined
                      ? "link-not-found"
                      : primaryButton?.externalLink
                  }`}
                  className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                  target={primaryButton?.linkTarget}
                  href={`/${
                    primaryButton.externalLink === undefined
                      ? "link-not-found"
                      : primaryButton.externalLink
                  }`}
                  rel={
                    primaryButton?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {primaryButton?.label}
                </a>
              )}
              {secondaryButton?.label &&
              secondaryButton?.type === "linkInternal" ? (
                <Link
                  href={
                    secondaryButton?.internalLink === "Home" ||
                    secondaryButton?.internalLink === "home"
                      ? "/"
                      : `/${
                          secondaryButton.internalLink === undefined
                            ? "page-not-found"
                            : secondaryButton.internalLink
                        }`
                  }
                >
                  <a
                    aria-label={`Header ${
                      secondaryButton?.label ?? "Secondary"
                    } button which directs to ${
                      secondaryButton?.internalLink === undefined
                        ? "page-not-found"
                        : secondaryButton?.internalLink
                    }`}
                    className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                    target={secondaryButton?.linkTarget}
                    rel={
                      secondaryButton?.linkTarget === "_blank"
                        ? "noopener noreferrer"
                        : null
                    }
                  >
                    {secondaryButton?.label}
                  </a>
                </Link>
              ) : (
                <a
                  aria-label={`Header ${
                    secondaryButton?.label ?? "Secondary"
                  } button which directs to ${
                    secondaryButton?.externalLink === undefined
                      ? "link-not-found"
                      : secondaryButton?.externalLink
                  }`}
                  className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                  target={secondaryButton?.linkTarget}
                  href={`/${
                    secondaryButton.externalLink === undefined
                      ? "link-not-found"
                      : secondaryButton.externalLink
                  }`}
                  rel={
                    secondaryButton?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {secondaryButton?.label}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mx-10 md:mx-20 lg:mx-60 xl:mx-60">
          <div className="relative aspect-w-16 aspect-h-9">
            {(videoLink &&
              String(videoLink).includes("https://www.youtube.com/watch?")) ||
            String(videoLink).includes("youtube.com/watch?") ? (
              <iframe
                aria-label="Show Video Frame"
                className="absolute top-0 left-0 w-full h-full rounded-3xl border-4 border-webriq-darkblue"
                src={`https://www.youtube.com/embed/${
                  String(videoLink).split("=")[1].split("&")[0]
                }`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
