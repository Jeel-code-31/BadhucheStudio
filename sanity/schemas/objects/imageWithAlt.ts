const imageWithAlt = {
  name: "imageWithAlt",
  title: "Image With Alt",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (Rule: any) => Rule.required().error("Alt text is required for accessibility."),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
}

export default imageWithAlt



