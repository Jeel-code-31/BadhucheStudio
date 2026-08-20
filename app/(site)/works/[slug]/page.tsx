import Image from "next/image"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectBySlugQuery, featuredProjectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

export const revalidate = 60;

type Project = {
  title: string
  slug?: { current: string }
  heroImage?: any
  heroVideo?: string
  gallery?: any[]
  excerpt?: string
  overview?: any[]
  challenge?: any[]
  solution?: any[]
  location?: string
  year?: string
  materials?: string[]
  services?: string[]
  credits?: { name?: string; role?: string; organization?: string }[]
  awards?: { title?: string; year?: number; organization?: string; link?: string }[]
}

async function getProject(slug: string, preview: boolean) {
  return sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project"],
    preview,
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const project = await getProject(slug, isEnabled)

  if (!project) return notFound()

  const heroUrl = project.heroImage ? urlFor(project.heroImage).width(1600).height(1000).url() : null

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1815]">

      {/* Header Section */}
      <section className="pt-28 pb-16 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <p className="oh-label mb-4 text-[#AC9148] uppercase tracking-widest text-xs">(Project)</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-light">{project.title}</h1>
          <p className="text-lg max-w-3xl opacity-80">{project.excerpt}</p>
        </div>
      </section>

      {/* Hero Visual */}
      {heroUrl && (
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-[1400px] mx-auto overflow-hidden">
            <Image
              src={heroUrl}
              alt={project.title}
              width={1600}
              height={1000}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Main Content Grid: Sidebar (Left) & Narrative (Right) */}
      <section className="px-6 md:px-10 py-24 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

            {/* LEFT SIDE: Meta Information (Location, Year, Materials) */}
            <div className="lg:col-span-4 space-y-12 border-r border-black/10 pr-0 lg:pr-20">
              {project.year && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC9148] font-bold mb-4">Year</p>
                  <p className="text-sm leading-loose text-[#1A1815]/70 uppercase tracking-tight">
                    {project.year}
                  </p>
                </div>
              )}
              {project.location && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC9148] font-bold mb-4">Location</p>
                  <p className="text-sm leading-loose text-[#1A1815]/70 uppercase tracking-tight">
                    {project.location}
                  </p>
                </div>
              )}


              {project.materials?.length ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC9148] font-bold mb-4">Materials</p>
                  <p className="text-sm leading-loose text-[#1A1815]/70 uppercase tracking-tight">
                    {project.materials.join(" / ")}
                  </p>
                </div>
              ) : null}


            </div>

            {/* RIGHT SIDE: Narrative (Overview, Challenge, Solution) */}
            <div className="lg:col-span-8 space-y-24">
              {project.overview && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#AC9148] font-bold pt-1">Overview</span>
                  <div className="md:col-span-3 text-lg leading-relaxed font-light prose prose-stone max-w-none">
                    <PortableText value={project.overview} />
                  </div>
                </div>
              )}

              {project.challenge && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#AC9148] font-bold pt-1">Challenge</span>
                  <div className="md:col-span-3 text-lg leading-relaxed font-light prose prose-stone max-w-none">
                    <PortableText value={project.challenge} />
                  </div>
                </div>
              )}

              {project.solution && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#AC9148] font-bold pt-1">Solution</span>
                  <div className="md:col-span-3 text-lg leading-relaxed font-light prose prose-stone max-w-none">
                    <PortableText value={project.solution} />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Credits & Recognition Section */}
      {(project.credits?.length || project.awards?.length) && (
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-24 border-t border-black/10 pt-16">
            {project.credits?.length ? (
              <div>
                <p className="text-[#AC9148] text-xs uppercase mb-6 font-bold tracking-widest">Credits</p>
                <div className="space-y-4">
                  {project.credits.map((c, idx) => (
                    <p key={idx} className="text-sm">
                      <span className="font-semibold">{c.name}</span>
                      {c.role ? ` — ${c.role}` : ""} {c.organization ? `, ${c.organization}` : ""}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {project.awards?.length ? (
              <div>
                <p className="text-[#AC9148] text-xs uppercase mb-6 font-bold tracking-widest">Recognition</p>
                <ul className="space-y-4">
                  {project.awards.map((a, idx) => (
                    <li key={idx} className="text-sm">
                      {a.title} {a.organization ? `— ${a.organization}` : ""} {a.year ? `(${a.year})` : ""}
                      {a.link && (
                        <a href={a.link} className="ml-2 text-[#AC9148] underline underline-offset-4" target="_blank" rel="noreferrer">
                          View
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {project.gallery?.length ? (
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#AC9148] mb-8 font-bold">(Gallery)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, idx) => {
                const imgUrl = urlFor(img).width(1200).height(900).url()
                if (!imgUrl) return null
                return (
                  <div key={idx} className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100">
                    <Image
                      src={imgUrl}
                      alt={img?.alt || project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

    </main>
  )
}