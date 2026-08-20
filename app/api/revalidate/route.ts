import { revalidateTag, revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current: string }
      _id: string
    }>(request, process.env.SANITY_WEBHOOK_SECRET)

    // Validate the webhook signature
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 })
    }

    // Revalidate by tag
    revalidateTag(body._type, "default")
    
    // Also revalidate specific paths based on document type
    switch (body._type) {
      case "project":
        if (body.slug?.current) {
          revalidatePath(`/works/${body.slug.current}`)
        }
        revalidatePath("/works")
        revalidatePath("/")
        break
      case "homepage":
        revalidatePath("/")
        break
      case "siteSettings":
        revalidatePath("/", "layout")
        break
      case "contactInfo":
        revalidatePath("/contact")
        break
      case "processStep":
        revalidatePath("/process")
        break
      case "galleryItem":
        revalidatePath("/gallery")
        break
      case "press":
      case "award":
      case "testimonial":
        revalidatePath("/recognition")
        break
      case "faq":
        revalidatePath("/faq")
        break
      default:
        // Revalidate homepage for any other content type
        revalidatePath("/")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}



