import { MdPerson } from "react-icons/md"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "author",
  title: "Author",
  icon: MdPerson,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "profile",
      title: "Profile picture",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Image",
          description:
            "Add from your computer (click 'Upload' button), this studio (click 'Browse' button) or by doing a drag/paste of the image.",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "alt",
          title: "Alternative text",
          description:
            "Add the text to display when the image can't be loaded or is unavailable.",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "profile.image",
    },
  },
})
