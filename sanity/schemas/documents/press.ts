const press = {
  name: "press",
  title: "Press / News",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "publication", title: "Publication", type: "string" },
    { name: "date", title: "Date", type: "date" },
    { name: "link", title: "External Link", type: "url" },
    { name: "image", title: "Image", type: "imageWithAlt" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "body", title: "Body", type: "blockContent" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
}

export default press



