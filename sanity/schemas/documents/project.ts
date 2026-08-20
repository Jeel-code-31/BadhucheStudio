import { Rule } from "sanity"

const project = {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "meta", title: "Metadata" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { 
        source: "title", 
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
      },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "meta",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "meta",
      initialValue: false,
    },
    { name: "order", title: "Display Order", type: "number", group: "meta" },
    { name: "client", title: "Client", type: "string", group: "content" },
    { name: "location", title: "Location", type: "string", group: "content" },
    {
      name: "year",
      title: "Year",
      type: "string",
      group: "content",
      description: "Example: 2024",
    },
    { name: "duration", title: "Project Duration", type: "string", group: "content" },
    { name: "size", title: "Size/Dimensions", type: "string", group: "content" },
    { name: "materials", title: "Materials", type: "array", of: [{ type: "string" }], group: "content" },
    { name: "services", title: "Services Provided", type: "array", of: [{ type: "string" }], group: "content" },
    {
      name: "metrics",
      title: "Metrics",
      type: "object",
      group: "content",
      fields: [
        { name: "dimension", title: "Dimensions", type: "string" },
        { name: "weight", title: "Weight", type: "string" },
      ],
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithAlt",
      group: "media",
    },
    { name: "heroVideo", title: "Hero Video URL", type: "url", group: "media" },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      group: "media",
    },
    { name: "coverVideo", title: "Cover Video", type: "url", group: "media" },
    { name: "excerpt", title: "Short Description", type: "text", rows: 3, group: "content" },
    { name: "overview", title: "Project Overview", type: "blockContent", group: "content" },
    { name: "challenge", title: "The Challenge", type: "blockContent", group: "content" },
    { name: "solution", title: "Our Solution", type: "blockContent", group: "content" },
    {
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [{ type: "timelineItem" }],
      group: "content",
    },
    {
      name: "credits",
      title: "Collaborators / Credits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "organization", title: "Organization", type: "string" },
          ],
        },
      ],
      group: "content",
    },
    { name: "awards", title: "Awards", type: "array", of: [{ type: "awardItem" }], group: "content" },
    { name: "pressLinks", title: "Press Links", type: "array", of: [{ type: "pressItem" }], group: "content" },
    { name: "sustainability", title: "Sustainability Note", type: "text", group: "content" },
    { name: "downloads", title: "Downloads", type: "array", of: [{ type: "download" }], group: "content" },
    { name: "seo", title: "SEO", type: "seo", group: "meta" },
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      categoryTitle: "category->title",
    },
    prepare({ title, media, categoryTitle }: any) {
      return {
        title: title || "Untitled Project",
        subtitle: categoryTitle || "No category",
        media,
      }
    },
  },
}

export default project
