import { useContext } from "react";
import { Components } from "components/list";
import { InlineEditorContext } from "context/InlineEditorContext";
import InlineEditor from "components/InlineEditor";


export function PageSections({ data }) {
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

          const Component = Components?.[sectionType];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <InlineEditor 
              document={{ id: section?._id, type: section?._type }} 
              showInlineEditor={showInlineEditor}
            >
              <Component
                key={index}
                template={{
                  bg: "gray",
                  color: "webriq",
                }}
                {...{ [section._type]: section }}
                data={section}
              />
            </InlineEditor>
          )
        })}
    </>
  );
}
