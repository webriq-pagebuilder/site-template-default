/**
 *
 * @param sections ALl components with a _type property
 * @returns boolean yes if any of the components are a CStudio component
 */

export function hasCStudioComponents(sections: any[]) {
  // @todo: update with proper type
  return sections?.find((section) =>
    // @todo: make sure all these are updated in one place.
    [
      "mainProduct",
      "mainCollection",
      "cartPage",
      "wishlistPage",
      "searchPage",
      "productSettings",
      "collectionSettings",
      // c-studio sections
      "allProducts",
      "featuredProducts",
      "cartSection",
      "wishlistSection",
      "productInfo",
      // c-studio sections only in Store > Pages Products/Collections
      "dynamic_featuredProducts",
      "dynamic_productInfo",
      // c-studio sections only in Pages
      "pages_featuredProducts",
      "pages_productInfo",
    ].includes(section?._type)
  );
}
