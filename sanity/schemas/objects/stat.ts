const stat = {
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    { name: "value", title: "Value", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "suffix", title: "Suffix", type: "string" },
    { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
  ],
}

export default stat



