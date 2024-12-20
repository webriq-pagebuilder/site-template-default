import { useContext } from "react";
import { Components } from "components/list";
import { InlineEditorContext } from "context/InlineEditorContext";
import InlineEditor from "components/InlineEditor";
import { SocialMediaFeedContextProvider } from "context/SocialMediaFeedContext";
import { PageData } from "pages/[slug]";
import { ErrorBoundary } from "react-error-boundary";

interface PageSectionsProps {
  data: PageData;
}

export function PageSections({ data }: PageSectionsProps) {
  const { sections } = data;
  const showInlineEditor = useContext(InlineEditorContext);

  return (
    <>
      {sections &&
        sections?.map((section, index) => {
          const sectionType =
            section?._type === "slotCart" // for slotCart, apply the variant templates of the cart section
              ? "cartSection"
              : section?._type === "slotWishlist" // for slotWishlist, apply the variant templates of the wishlist section
              ? "wishlistSection"
              : section?._type; // otherwise, use the actual section type

          const currentDocument =
            section?._type === "featuredProducts"
              ? {
                  id: section?.variants?.collections?._id,
                  type: section?.variants?.collections?._type,
                }
              : section?._type === "pages_productInfo"
              ? {
                  id: section?.variants?.products?._id,
                  type: section?.variants?.products?._type,
                }
              : {
                  id: section?._id,
                  type: section?._type,
                };

          const Component = Components?.[sectionType];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <ErrorBoundary
              fallback={
                process.env.NODE_ENV === "production" ? null : (
                  <div>Error rendering component: {sectionType}</div>
                )
              }
            >
              <InlineEditor
                document={currentDocument}
                showInlineEditor={showInlineEditor}
                key={index}
              >
                {section?._type === "socialMediaFeed" ? (
                  <SocialMediaFeedContextProvider>
                    <Component
                      template={{
                        bg: "gray",
                        color: "webriq",
                      }}
                      {...{ [section._type]: section }}
                      data={section}
                    />
                  </SocialMediaFeedContextProvider>
                ) : (
                  <Component
                    template={{
                      bg: "gray",
                      color: "webriq",
                    }}
                    {...{ [section._type]: section }}
                    data={section}
                  />
                )}
              </InlineEditor>
            </ErrorBoundary>
          );
        })}
    </>
  );
}
