import { TextReveal } from "@/components/text-reveal"
import { ImageReveal } from "@/components/image-reveal"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { processStepsQuery } from "@/sanity/lib/queries"
import { ProcessTimeline } from "@/components/process-timeline"
import { TextureOverlay } from "@/components/texture-overlay"
import { GradientButton } from "@/components/gradient-button"
import { ScrollWeightText } from "@/components/scroll-weight-text"
import type { ProcessStep } from "@/sanity/lib/types"

export default async function ProcessPage() {
  const { isEnabled } = await draftMode()
  // Fetch process steps from CMS
  const processSteps = await sanityFetch<ProcessStep[]>({
    query: processStepsQuery,
    tags: ["processStep"],
    preview: isEnabled,
  }).catch(() => [])

  // Default data if CMS is empty
  const defaultSteps =
    processSteps.length === 0
      ? [
          {
            _id: "1",
            title: "Discovery & Research",
            duration: "2-4 weeks",
            description: null,
            deliverables: [
              "Cultural research documentation",
              "Site analysis report",
              "Initial concept directions",
              "Stakeholder alignment workshop",
            ],
            order: 1,
          },
          {
            _id: "2",
            title: "Concept Development",
            duration: "4-6 weeks",
            description: null,
            deliverables: [
              "3-5 concept presentations",
               "Digital renderings", 
               "Material palette boards",
                "Scale maquettes"
          ],
            order: 2,
          },
          {
            _id: "3",
            title: "Design Refinement",
            duration: "4-8 weeks",
            description: null,
            deliverables: [
              "Final design documentation",
              "Engineering drawings",
              "Material specifications",
              "Installation methodology",
            ],
            order: 3,
          },

          {
            _id: "4",
            title: "Fabrication",
            duration: "8-24 weeks",
            description: null,
            deliverables: [
              "Progress documentation", 
              "Quality control reports",
              "Mock-up approvals",
              "Shipping coordination"
          ],
            order: 4,
          },

          {
            _id: "5",
            title: "Installation & Reveal",
            duration: "2-8 weeks",
            description: null,
            deliverables: [
              "Installation supervision",
              "Final adjustments",
              "Documentation photography",
              "Maintenance guidelines",
            ],
            order: 5,
          },
        ]
      : processSteps

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative px-6 md:px-10 pt-32 pb-20 overflow-hidden">
        <TextureOverlay texture="paper" opacity={0.14} blendMode="multiply" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <TextReveal>
            <span className="oh-label block mb-10 gradient-terracotta">(Our Process)</span>
          </TextReveal>
          <TextReveal delay={100}>
            <ScrollWeightText className="oh-headline text-4xl md:text-6xl lg:text-5xl max-w-[1000px]">
              From vision to monument: a journey of craft, collaboration, and cultural storytelling.
            </ScrollWeightText>
          </TextReveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative px-6 md:px-40 py-20 overflow-hidden">
        <TextureOverlay texture="canvas" opacity={0.12} blendMode="soft-light" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <TextReveal>
            <p className="oh-body text-lg md:text-3xl leading-relaxed">
              Creating monumental art is not just about scale—it is about meaning. Every installation we create goes
              through a rigorous process designed to ensure the final work resonates with its audience for generations.
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <p className="oh-body text-lg md:text-2xl leading-relaxed mt-10">
              Our typical project timeline ranges from 6 months to 2 years, depending on scale and complexity.
              Throughout this journey, we maintain transparent communication and collaborative decision-making with all
              stakeholders.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative px-6 md:px-10 py-20 overflow-hidden">
        <TextureOverlay texture="stone" opacity={0.08} blendMode="multiply" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <ProcessTimeline steps={defaultSteps} />
        </div>
      </section>

      {/* Workshop Image */}
      <section className="relative px-6 md:px-10 py-20 overflow-hidden">
        <TextureOverlay texture="marble" opacity={0.12} blendMode="multiply" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <ImageReveal
            src="/art-studio-workshop-sculptors-working-monumental.jpg"
            alt="Badhuche workshop - artisans crafting monumental sculptures"
            className="aspect-[21/9] w-full"
            direction="bottom"
          />
          <TextReveal delay={100}>
            <p className="oh-label mt-4 text-center">
              Our Mumbai workshop during fabrication of the Ayodhya Airport mural
            </p>
          </TextReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-10 py-20 bg-[#F5F0E8] overflow-hidden">
        <TextureOverlay texture="gold-leaf" opacity={0.08} blendMode="overlay" />
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <TextReveal>
            <h2 className="oh-headline text-3xl md:text-4xl mb-6">Ready to move forward with your project?</h2>
          </TextReveal>
          <TextReveal delay={100}>
            <p className="oh-body text-lg mb-8">
              Every great monument starts with a conversation. Tell us about your vision and we will guide you through
              each step of bringing it to life.
            </p>
          </TextReveal>
          <TextReveal delay={200}>
            <GradientButton href="/contact" texture="gold-leaf" className="min-w-[220px]">
              <span className="tracking-[0.16em]">Start a Commission</span>
              <span className="h-2 w-2 rounded-full bg-[#FAF7F2]" />
            </GradientButton>
          </TextReveal>
        </div>
      </section>
    </main>
  )
}
