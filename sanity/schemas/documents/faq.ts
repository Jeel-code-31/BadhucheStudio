const faq = {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "answer", title: "Answer", type: "blockContent", validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "string" },
    { name: "order", title: "Order", type: "number" },
  ],
}

export default faq



