import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { client } from "@/sanity/lib/client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")
  const type = searchParams.get("type") || "project"

  // Check the secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Verify the document exists
  if (slug) {
    const query = `*[_type == $type && slug.current == $slug][0]._id`
    const documentId = await client.fetch(query, { type, slug })
    
    if (!documentId) {
      return new Response("Document not found", { status: 404 })
    }
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path with the slug or to homepage
  const redirectPath = slug && type === "project" 
    ? `/works/${slug}` 
    : slug && type === "homepage"
    ? "/"
    : "/"
  
  redirect(redirectPath)
}



