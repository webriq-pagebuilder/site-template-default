import { Components } from "components/list";
import { EcwidContextProvider } from "context/EcwidContext";

export function ProductSections({ data }) {
  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    ecwidProductId, // the product ID from Ecwid
    price, // product price
    description, // product description
    sections, // sections from the Design field group tab of Product page
  } = data;

  let sectionsToDisplay = commonSections?.sections;

  // let us make sure that "sections" array is not empty or undefined, otherwise use the default sections from Store > Commerce Pages > Products
  if (sections) {
    // check if we have other sections aside from slotProductInfo in a Store > Products product page
    const filtered = sections?.filter(
      (section) => section?._type !== "slotProductInfo"
    );

    if (filtered?.length !== 0) {
      // if line 67 returns true, then replace all the sections from Store > Commerce Pages > Products with sections from Store > Products
      sectionsToDisplay = sections;
    } else {
      // there is only "slotProductInfo" section in Store > Products product page
      sectionsToDisplay = sections?.reduce(
        (defaultsArr, newArr) => {
          // get the index of the "slotProductInfo" section from Store > Commerce Pages > Products sections
          const getIndex = commonSections?.sections?.findIndex((item) =>
            item?._type?.includes("slotProductInfo")
          );

          // if the variant from the Store > Products page is a "defaultVariant", then replace it with the variant of Store > Commerce Pages > Products "slotProductInfo"
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a "slotProductInfo" section in Store > Commerce Pages > Products, then replace it with the "slotProductInfo" of Store > Pages section
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the sections as defined
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
              : section?._type === "slotProductInfo" // for slotProductInfo, apply the variant templates of the former productInfo section
              ? "productInfo"
              : section?._type; // otherwise, use the actual section type

          const Component = Components?.[sectionType];

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
                product={{
                  name,
                  ecwidProductId,
                  price,
                  description,
                }}
                data={section}
              />
            </EcwidContextProvider>
          );
        })}
    </>
  );
}
