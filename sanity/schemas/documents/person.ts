const person = {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "blockContent" },
    { name: "photo", title: "Photo", type: "imageWithAlt" },
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
  ],
}

export default person



