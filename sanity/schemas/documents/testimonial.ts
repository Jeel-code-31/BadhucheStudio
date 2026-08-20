const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "quote", title: "Quote", type: "text", validation: (Rule: any) => Rule.required() },
    { name: "author", title: "Author", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "role", title: "Role/Title", type: "string" },
    { name: "organization", title: "Organization", type: "string" },
    { name: "project", title: "Related Project", type: "reference", to: [{ type: "project" }] },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
  ],
}

export default testimonial



