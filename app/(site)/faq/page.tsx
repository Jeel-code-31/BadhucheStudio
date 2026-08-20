import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { faqQuery } from "@/sanity/lib/queries"
import { PortableTextRenderer } from "@/components/portable-text"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Badhuche Art Studio',
  description: 'Find answers to common questions about commissioning sculptures, project timelines, costs, and our creative process.',
}
type FaqItem = { question?: string; answer?: any; category?: string }

export default async function FaqPage() {
  const { isEnabled } = await draftMode()
  const faqs = await sanityFetch<FaqItem[]>({
    query: faqQuery,
    tags: ["faq"],
    preview: isEnabled,
  })

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1815]">

      <section className="pt-28 pb-12 px-6 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <p className="oh-label mb-3">(FAQ)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-4">Frequently Asked Questions</h1>
          <p className="oh-body text-lg">
            Answers to common questions about our commissioning process, timelines, and collaboration.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-[900px] mx-auto divide-y divide-[rgba(26,24,21,0.1)]">
          {faqs.map((faq, idx) => (
            <details key={idx} className="py-4 group">
              <summary className="oh-headline text-xl cursor-pointer list-none flex justify-between items-center">
                <span>{faq.question}</span>
                <span className="text-[#C2542D] transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3">
                <PortableTextRenderer value={faq.answer} />
              </div>
              {faq.category ? <p className="oh-label text-[#4a4640] mt-2">({faq.category})</p> : null}
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}

