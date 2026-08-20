const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteTitle", title: "Site Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "cta" }],
    },
    {
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [{ type: "cta" }],
    },
    {
      name: "social",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string", validation: (Rule: any) => Rule.required() },
            { name: "url", title: "URL", type: "url", validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
    },
    { name: "contactSummary", title: "Contact Summary", type: "text" },
    { name: "logo", title: "Logo", type: "imageWithAlt" },
    { name: "defaultSeo", title: "Default SEO", type: "seo" },
  ],
}

export default siteSettings



