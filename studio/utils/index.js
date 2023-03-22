/* 
  Call this functional component to update the existing schemas from included plugins with the changes from the custom folder
*/
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "../../config";

const CStudioSchema = [
  "allProducts",
  "featuredProducts",
  "navigation",
  "pages_productInfo",
  "mainProduct",
  "mainCollection",
  "productSettings",
  "collectionSettings",
  "cartPage",
  "wishlistPage",
  "searchPage"
]

export const mergeReplaceAndAdd = (existingItems, newItems) => {
  const updatedItems = existingItems.map((existingItem) => {
    const searchedIndex = newItems
      .map((newItem) => newItem.name)
      .indexOf(existingItem.name);

    if (searchedIndex >= 0) {
      return newItems[searchedIndex];
    }

    return existingItem;
  });

  const additionalSchemas = newItems.reduce((all, current) => {
    if (!existingItems.map((i) => i.name).includes(current.name)) {
      all = [...all, current];
    }

    return all;
  }, []);

  const mergedSchemas = [...updatedItems, ...additionalSchemas]

  // If C-Studio is disabled, then C-Studio fields should be read-only
  if(NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false") {
    return mergedSchemas?.map((items) => {
      if(CStudioSchema.includes(items?.name)) {
        return {
          ...items,
          readOnly: true, // sets live editing of C-Studio schema documents to false
          __experimental_actions: [
            // hide options for creating and deleting documents from C-Studio schema
            /*'create',*/ "update",
            /*'delete',*/ "publish",
          ],
        }
      }
      return items
    })
  }

  return mergedSchemas;
};
