const cta = {
  name: "cta",
  title: "Call To Action",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "href", title: "Link", type: "string", validation: (Rule: any) => Rule.required() },
  ],
}

export default cta



