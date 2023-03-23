import { Components } from "components/list";
import EditSection from "components/EditSection";


export function WishlistSections({ data, enableInlineEditing }) {
  const { sections, _id, _type } = data;

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

          const Component = Components[sectionType];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <>
              {enableInlineEditing && <EditSection documentId={_id} documentType={_type} />}
              <Component
                key={index}
                template={{
                  bg: "gray",
                  color: "webriq",
                }}
                data={section}
              />
            </>
          );
        })}
    </>
  );
}
