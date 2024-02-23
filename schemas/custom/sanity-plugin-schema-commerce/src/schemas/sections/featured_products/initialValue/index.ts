//import { client } from "../../../../sanity";

// export const initialValue = async () => {
//   const refDoc = await client.fetch(
//     `*[_type == "mainCollection" && name == "All Products"][0]`
//   );

//   return {
//     collections: {
//       _ref: "2bb70613-7104-4c43-a953-ed73eb74473b",
//       _type: "reference",
//     },
//   };
// };

// TODO: Re-implement dynamic document query for initial value
export const initialValue = {
  collections: {
    _ref: "2bb70613-7104-4c43-a953-ed73eb74473b",
    _type: "reference",
  },
}