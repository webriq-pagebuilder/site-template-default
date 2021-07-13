import React from "react";
import PropTypes from "prop-types";

function VariantC({
  // template,
  videoLink,
  title,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="relative pb-56 sm:pb-80">
      <div className="relative pt-12 md:pt-16 pb-32 md:pb-64 bg-gray-50 border-b-4 border-webriq-blue">
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-20">
            <h2 className="mb-10 text-4xl lg:text-5xl font-bold">
              {title && <span>{title}</span>}
            </h2>
            <div>
              {primaryButton && (
                <a
                  className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 bg-webriq-blue hover:bg-webriq-darkblue text-white font-semibold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                  target={primaryButton?.linkTarget}
                  rel={
                    primaryButton?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                  href={
                    primaryButton.type === "linkInternal"
                      ? primaryButton.internalLink === "Home" ||
                        primaryButton.internalLink === "home"
                        ? "/"
                        : primaryButton.internalLink
                      : primaryButton.externalLink
                  }
                >
                  {primaryButton.label}
                </a>
              )}
              {secondaryButton === undefined ? null : (
                <a
                  className="inline-block w-full lg:w-auto py-2 px-6 font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                  target={secondaryButton?.linkTarget}
                  rel={
                    secondaryButton?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                  href={
                    secondaryButton.type === "linkInternal"
                      ? secondaryButton.internalLink === "Home" ||
                        secondaryButton.internalLink === "home"
                        ? "/"
                        : secondaryButton.internalLink
                      : secondaryButton.externalLink
                  }
                >
                  {secondaryButton.label}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-5 max-w-4xl mx-auto px-2">
          {(videoLink &&
            String(videoLink).includes("https://www.youtube.com/watch?")) ||
          String(videoLink).includes("youtube.com/watch?") ? (
            <iframe
              className="rounded-3xl md:rounded-6xl md:rounded-br-none border-4 border-webriq-blue"
              width="880"
              height="500"
              src={`https://www.youtube.com/embed/${
                String(videoLink).split("=")[1].split("&")[0]
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : null}

          {/* <div className="absolute inset-0 flex items-center justify-center">
            <button className="flex items-center justify-center bg-white rounded-full">
              <svg
                className="w-16 h-16 text-webriq-darkblue hover:text-webriq-darkblue transition duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

VariantC.propTypes = {
  template: PropTypes.object,
  images: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  primaryButton: PropTypes.object,
  secondaryButton: PropTypes.object,
  videoLink: PropTypes.string,
};
export default React.memo(VariantC);
