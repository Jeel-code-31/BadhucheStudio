const download = {
  name: "download",
  title: "Download",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "file", title: "File", type: "file", validation: (Rule: any) => Rule.required() },
  ],
}

export default download



