import { createClient } from "@sanity/client"
import "server-only"

import { apiVersion, dataset, projectId } from "../env"

const useCdn = process.env.NODE_ENV === "production"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
  perspective: "previewDrafts",
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}



