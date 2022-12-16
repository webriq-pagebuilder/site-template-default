import { Components } from "components/list";
import { EcwidContextProvider } from "context/EcwidContext";

export function CollectionSections({ data }) {
  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    sections, // sections from the Design field group tab of Collections page
  } = data;

  let sectionsToDisplay = commonSections?.sections;

  if (sections) {
    const filtered = sections?.filter(
      (section) => section?._type !== "slotCollectionInfo"
    );

    if (filtered?.length !== 0) {
      sectionsToDisplay = sections;
    } else {
      // we only have featuredProducts section on the collection page so we merge this section with the sections in Store > Pages > Collections
      sectionsToDisplay = sections?.reduce(
        (defaultsArr, newArr) => {
          // only need the featuredProducts section from Store > Collections to match
          const getIndex = commonSections?.sections?.findIndex((item) =>
            item?._type?.includes("slotCollectionInfo")
          );

          // if the variant from the Store > Collections page is a "defaultVariant", then replace it with the variant of Store > Commerce Pages > Collections "slotCollectionInfo"
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a "slotCollectionInfo" section in Store > Commerce Pages > Collections, then replace it with the "slotCollectionInfo" of Store > Collections section
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the other sections defined
          return defaultsArr;
        },
        [...commonSections?.sections]
      );
    }
  }

  return (
    <>
      {sectionsToDisplay &&
        sectionsToDisplay?.map((section, index) => {
          const sectionType =
            section?._type === "slotCart" // for slotCart, apply the variant templates of the cart section
              ? "cartSection"
              : section?._type === "slotWishlist" // for slotWishlist, apply the variant templates of the wishlist section
              ? "wishlistSection"
              : section?._type === "slotCollectionInfo" // for slotCollectionInfo, apply the variant templates of the featuredProducts section
              ? "featuredProducts"
              : section?._type; // otherwise, use the actual section type

          const Component = Components[sectionType];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <EcwidContextProvider key={index}>
              <Component
                template={{
                  bg: "gray",
                  color: "webriq",
                }}
                collection={{
                  name,
                }}
                data={section}
              />
            </EcwidContextProvider>
          );
        })}
    </>
  );
}
