const processStep = {
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "order", title: "Order", type: "number", validation: (Rule: any) => Rule.required() },
    { name: "duration", title: "Duration", type: "string" },
    { name: "body", title: "Body", type: "blockContent" },
    { name: "media", title: "Media", type: "imageWithAlt" },
  ],
  preview: {
    select: { title: "title", order: "order" },
    prepare({ title, order }: any) {
      return {
        title,
        subtitle: order ? `Step ${order}` : undefined,
      }
    },
  },
}

export default processStep



