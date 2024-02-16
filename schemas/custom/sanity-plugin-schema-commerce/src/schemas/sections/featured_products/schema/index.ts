export const featuredProductsSchema = [
  {
    name: "collections",
    title: "Collections reference",
    description: "Select the collections to display products",
    type: "reference",
    to: [{ type: "mainCollection" }],
  },
];
