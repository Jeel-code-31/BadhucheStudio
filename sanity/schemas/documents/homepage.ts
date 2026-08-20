const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    { name: "heroHeadline", title: "Hero Headline", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "heroSubhead", title: "Hero Subhead", type: "text" },
    { name: "heroMedia", title: "Hero Media", type: "imageWithAlt" },
    { name: "heroCta", title: "Hero CTA", type: "cta" },
    {
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    },
    { name: "marqueeText", title: "Marquee Text", type: "array", of: [{ type: "string" }] },
    { name: "stats", title: "Stats", type: "array", of: [{ type: "stat" }] },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "heroHeadline" },
  },
}

export default homepage



