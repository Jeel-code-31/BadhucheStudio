export default {
  name: "projection",
  title: "Projection",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "heroImage", type: "image" },
    { name: "heroVideo", type: "url" },
    { name: "gallery", type: "array", of: [{ type: "image" }] },
    { name: "excerpt", type: "text" },
    { name: "overview", type: "array", of: [{ type: "block" }] },
    { name: "challenge", type: "array", of: [{ type: "block" }] },
    { name: "solution", type: "array", of: [{ type: "block" }] },
    { name: "location", type: "string" },
    { name: "year", type: "string" },
    { name: "materials", type: "array", of: [{ type: "string" }] },
    { name: "services", type: "array", of: [{ type: "string" }] },
    { name: "credits", type: "array", of: [{ type: "object", fields: [
      { name: "name", type: "string" },
      { name: "role", type: "string" },
      { name: "organization", type: "string" }
    ]}]},
    { name: "awards", type: "array", of: [{ type: "object", fields: [
      { name: "title", type: "string" },
      { name: "year", type: "number" },
      { name: "organization", type: "string" },
      { name: "link", type: "url" }
    ]}]},
  ],
}
