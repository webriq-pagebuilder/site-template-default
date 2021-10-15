import React from "react";
import Link from "next/link";

function VariantC({
  template,
  videoLink,
  title,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section>
      <div className="bg-gray-50 py-20 md:py-52 lg:py-52">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-20">
            <h1 className="mb-10 text-lg md:text-4xl lg:text-5xl font-bold">
              {title && <span>{title}</span>}
            </h1>
            {primaryButton?.label || secondaryButton?.label ? (
              <div>
                {primaryButton?.type === "linkInternal" ? (
                  <Link
                    href={
                      primaryButton?.internalLink === "Home" ||
                      primaryButton?.internalLink === "home"
                        ? "/"
                        : `/${
                            primaryButton?.internalLink === undefined
                              ? "page-not-found"
                              : primaryButton?.internalLink
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
                    href={`${
                      primaryButton?.externalLink === undefined
                        ? "link-not-found"
                        : primaryButton?.externalLink
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
                {secondaryButton?.type === "linkInternal" ? (
                  <Link
                    href={
                      secondaryButton?.internalLink === "Home" ||
                      secondaryButton?.internalLink === "home"
                        ? "/"
                        : `/${
                            secondaryButton?.internalLink === undefined
                              ? "page-not-found"
                              : secondaryButton?.internalLink
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
                    href={`${
                      secondaryButton?.externalLink === undefined
                        ? "link-not-found"
                        : secondaryButton?.externalLink
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
            ) : null}
          </div>
          <div className="md:mx-20 lg:mx-60 xl:mx-60">
            <div className="aspect-w-16 aspect-h-9">
              {videoLink && (
                <iframe
                  aria-label="Show Video Frame"
                  className="w-full h-full rounded-3xl border-4 border-webriq-darkblue"
                  src={`https://www.youtube.com/embed/${
                    String(videoLink).split("=")[1].split("&")[0]
                  }`}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden;border-radius:24px}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${`https://www.youtube.com/embed/${
                    String(videoLink).split("=")[1].split("&")[0]
                  }`}><img src=${`https://i.ytimg.com/vi/${videoLink
                    .split("=")
                    .pop()}/maxresdefault.jpg`} alt=${title} loading="lazy" /><span>▶</span></a>`}
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
