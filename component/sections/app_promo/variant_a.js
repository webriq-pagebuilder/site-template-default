import { urlFor } from "lib/sanity";
import { logoLink } from "helper";

function VariantA({ logo, subtitle, title, images }) {
  return (
    <section>
      <div className="pt-16 bg-webriq-darkblue overflow-hidden radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto text-center">
            {logo?.image && (
              <Link href={logoLink()}>
                <a
                  aria-label={
                    logoLink() === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink()}`
                  }
                  className="mb-8 inline-block p-5 bg-white rounded-lg"
                >
                  <img
                    className="h-14"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "appPromo-logo"}
                  />
                </a>
              </Link>
            )}
            <p className="text-gray-50 mb-3">{subtitle}</p>
            <h1 className="text-3xl lg:text-5xl text-white font-bold mb-8">
              {title}
            </h1>
            <div className="h-72">
              {images?.[0]?.image?.asset?._ref && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-10 h-80 z-20">
                  <Image
                    src={urlFor(images[0]?.image)}
                    layout="fixed"
                    width="218px"
                    height="320px"
                    objectFit="contain"
                    alt="appPromo-variantA-image-1"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
              {images?.[1]?.image?.asset?._ref && (
                <div className="absolute bottom-0 left-0 -mb-24 h-80">
                  <Image
                    src={urlFor(images[1]?.image)}
                    layout="fixed"
                    width="218px"
                    height="320px"
                    objectFit="contain"
                    alt="appPromo-variantA-image-2"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
              {images?.[2]?.image?.asset?._ref && (
                <div className="absolute bottom-0 right-0 -mb-24 h-80">
                  <Image
                    src={urlFor(images[2]?.image)}
                    layout="fixed"
                    width="218px"
                    height="320px"
                    objectFit="contain"
                    alt="appPromo-variantA-image-3"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
