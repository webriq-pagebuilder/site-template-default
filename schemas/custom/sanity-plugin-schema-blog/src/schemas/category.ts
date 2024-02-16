import { FiPackage } from "react-icons/fi"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "category",
  title: "Category",
  icon: FiPackage,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
})
