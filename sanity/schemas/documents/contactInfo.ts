const contactInfo = {
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
  fields: [
    { name: "email", title: "Email", type: "array", of: [{ type: "string" }] },
    { name: "phones", title: "Phones", type: "array", of: [{ type: "string" }] },
    { name: "address", title: "Address", type: "text" },
    { name: "mapEmbed", title: "Map Embed URL", type: "url" },
    {
      name: "social",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
}

export default contactInfo



