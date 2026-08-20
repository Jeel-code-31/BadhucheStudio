import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { awardsQuery, pressQuery, testimonialsQuery } from "@/sanity/lib/queries"
import { PortableTextRenderer } from "@/components/portable-text"

type Award = { title?: string; year?: number; organization?: string; link?: string; description?: string }
type Press = { title?: string; publication?: string; date?: string; link?: string; excerpt?: string }
type Testimonial = { quote?: string; author?: string; role?: string; organization?: string }

export default async function RecognitionPage() {
  const { isEnabled } = await draftMode()
  const [awards, press, testimonials] = await Promise.all([
    sanityFetch<Award[]>({ query: awardsQuery, tags: ["award"], preview: isEnabled }),
    sanityFetch<Press[]>({ query: pressQuery, tags: ["press"], preview: isEnabled }),
    sanityFetch<Testimonial[]>({ query: testimonialsQuery, tags: ["testimonial"], preview: isEnabled }),
  ])

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1815]">


      <section className="pt-28 pb-12 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <p className="oh-label mb-3">(Recognition)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-4">Awards & Press</h1>
          <p className="oh-body text-lg max-w-3xl">Highlights from juries, publications, and client voices.</p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10">
          <div>
            <p className="oh-label mb-3">(Awards)</p>
            <div className="space-y-4">
              {awards.map((a, idx) => (
                <div key={idx} className="oh-body">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{a.title}</span>
                    {a.organization ? `— ${a.organization}` : ""}
                    {a.year ? ` (${a.year})` : ""}
                    {a.link ? (
                      <a href={a.link} target="_blank" rel="noreferrer" className="text-[#C2542D] underline">
                        View
                      </a>
                    ) : null}
                  </div>
                  {a.description ? <p className="text-sm text-[#4a4640]">{a.description}</p> : null}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="oh-label mb-3">(Press)</p>
            <div className="space-y-4">
              {press.map((p, idx) => (
                <div key={idx} className="oh-body">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{p.title}</span>
                    {p.publication ? `— ${p.publication}` : ""}
                    {p.date ? ` (${p.date})` : ""}
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer" className="text-[#C2542D] underline">
                        Read
                      </a>
                    ) : null}
                  </div>
                  {p.excerpt ? <p className="text-sm text-[#4a4640]">{p.excerpt}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {testimonials.length ? (
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-[1200px] mx-auto">
            <p className="oh-label mb-3">(Testimonials)</p>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-[#F5F0E8] p-6">
                  <blockquote className="oh-body text-lg mb-4 leading-relaxed">“{t.quote}”</blockquote>
                  <div className="oh-label text-[#C2542D]">
                    {t.author}
                    {t.role ? ` — ${t.role}` : ""} {t.organization ? `, ${t.organization}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

