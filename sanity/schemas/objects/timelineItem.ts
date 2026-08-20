const timelineItem = {
  name: "timelineItem",
  title: "Timeline Item",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "summary", title: "Summary", type: "text" },
    { name: "duration", title: "Duration", type: "string" },
  ],
}

export default timelineItem



