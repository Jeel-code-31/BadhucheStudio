const galleryItem = {
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "category", title: "Category", type: "string" },
    { name: "image", title: "Image", type: "imageWithAlt", validation: (Rule: any) => Rule.required() },
    { name: "project", title: "Related Project", type: "reference", to: [{ type: "project" }] },
    { name: "order", title: "Order", type: "number" },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
}

export default galleryItem



