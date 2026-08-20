import Image from "next/image"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { galleryQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - Sculpture Portfolio | Badhuche Art Studio',
  description: 'Explore our portfolio of monumental sculptures, public artworks, and cultural landmarks created across India.',
}
type GalleryItem = {
  title?: string
  category?: string
  image?: any
  project?: { slug?: { current: string }; title?: string }
}

export default async function GalleryPage() {
  const { isEnabled } = await draftMode()
  const items = await sanityFetch<GalleryItem[]>({
    query: galleryQuery,
    tags: ["galleryItem"],
    preview: isEnabled,
  })

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1815]">

      <section className="pt-28 pb-12 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <p className="oh-label mb-3">(Gallery)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-4">Behind the Scenes</h1>
          <p className="oh-body text-lg max-w-3xl">
            Work-in-progress, fabrication details, and on-site installs from recent commissions.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => {
            const imgUrl = ((urlFor(item.image as any) as any)?.width(1000).height(1200).url()) || null
            if (!imgUrl) return null
            return (
              <div key={idx} className="space-y-2">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image 
                    src={imgUrl} 
                    alt={item.image?.alt || item.title || "Gallery image"} 
                    fill 
                    className="object-cover" 
                    priority={idx < 3}
                  />
                </div>
                <div className="oh-body text-sm text-[#4a4640]">
                  {item.title || item.project?.title || "Gallery item"}
                  {item.category ? ` — ${item.category}` : ""}
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </main>
  )
}

