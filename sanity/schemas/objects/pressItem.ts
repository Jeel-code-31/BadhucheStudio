const pressItem = {
  name: "pressItem",
  title: "Press Item",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "publication", title: "Publication", type: "string" },
    { name: "date", title: "Date", type: "date" },
    { name: "link", title: "Link", type: "url" },
    { name: "excerpt", title: "Excerpt", type: "text" },
  ],
}

export default pressItem



