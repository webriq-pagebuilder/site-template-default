import { MdBook } from "react-icons/md";
import { defineField, defineType } from "sanity";
import { isSlugUnique } from "studio/isSlugUnique";

export default defineType({
  name: "post",
  title: "Post",
  icon: MdBook,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "On what URL should this be published? e.g: /sample-blog-post",
      type: "slug",
      validation: (Rule) =>
        Rule.required().custom((slug: any) => {
          const regex = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;

          if (regex.test(slug.current)) {
            return `Slug cannot contain these special characters [!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]`;
          }

          if (slug.current !== slug.current.toLowerCase()) {
            return "Slug must be in lowercase";
          }

          if (slug.current.indexOf(" ") !== -1) {
            return "Slug cannot contain spaces";
          }

          return true;
        }),
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isSlugUnique,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description:
        "You can use this field to schedule post where you show them",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blogBlockContent",
    }),

    // Hidden fields
    defineField({
      name: "hasBeenPublished",
      title: "Has Been Published",
      type: "boolean",
      hidden: true,
    }),
    defineField({
      name: "hasBeenUnpublished",
      title: "Has Been UnPublished",
      type: "boolean",
      hidden: true,
    }),

    // SEO fields
    defineField({
      title: "SEO Settings",
      name: "seo",
      type: "seoSettings",
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
});
