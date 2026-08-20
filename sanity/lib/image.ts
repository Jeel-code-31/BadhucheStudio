import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: Image | null | undefined) {
  if (!builder || !source) return ""
  return builder.image(source)
}
