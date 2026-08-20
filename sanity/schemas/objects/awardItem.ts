const awardItem = {
  name: "awardItem",
  title: "Award Item",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "year", title: "Year", type: "number" },
    { name: "organization", title: "Organization", type: "string" },
    { name: "link", title: "Link", type: "url" },
  ],
}

export default awardItem



