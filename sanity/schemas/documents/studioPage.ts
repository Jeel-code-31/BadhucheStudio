import { read } from "fs"

const studioPage = {
  name: "studioPage",
  title: "Studio Page",
  type: "document",
  readOnly: false,
  hidden: false,
  fields: [
    { name: "intro", title: "Intro", type: "blockContent" },
    { name: "capabilities", title: "Capabilities/Services", type: "array", of: [{ type: "string" }] },
    {
      name: "team",
      title: "Team",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
    {
      name: "awards",
      title: "Awards",
      type: "array",
      of: [{ type: "awardItem" }],
    },
    {
      name: "pressHighlights",
      title: "Press Highlights",
      type: "array",
      of: [{ type: "pressItem" }],
    },
    { name: "studioImages", title: "Studio Images", type: "array", of: [{ type: "imageWithAlt" }] },
    { name: "seo", title: "SEO", type: "seo" },
  ],
}

export default studioPage



