const award = {
  name: "award",
  title: "Award / Recognition",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "year", title: "Year", type: "number" },
    { name: "organization", title: "Organization", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "link", title: "Link", type: "url" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
}

export default award



