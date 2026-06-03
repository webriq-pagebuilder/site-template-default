export const markdownSectionSchema = [
  {
    name: "content",
    title: "Markdown Content",
    type: "markdown",
    description: "Write your content using Markdown syntax",
    options: {
      imageUrl: (imageAsset) => `${imageAsset.url}?w=400&h400`,
    },
  },
];
