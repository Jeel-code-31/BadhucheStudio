"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { TextReveal } from "./text-reveal"

const processSteps = [
  {
    number: "01",
    title: "Design & Research",
    description:
      "We begin every project by immersing ourselves in the cultural context, architectural environment, and human stories that will shape our work. This deep research phase includes site visits, historical analysis, and community engagement.",
    image: "/art-studio-workshop-sculptors-working-monumental-a.jpg",
    duration: "2-4 Weeks",
    deliverables: ["Site Analysis Report", "Cultural Brief", "Initial Concepts"],
  },
  {
    number: "02",
    title: "Concept Development",
    description:
      "Our design team translates research insights into compelling visual narratives. We explore multiple creative directions, creating detailed sketches, 3D models, and material studies that honor both tradition and innovation.",
    image: "/ayodhya-airport-mural-ramayana.jpg",
    duration: "4-6 Weeks",
    deliverables: ["Design Presentations", "3D Visualizations", "Material Samples"],
  },
  {
    number: "03",
    title: "Artisan Collaboration",
    description:
      "With designs approved, we engage our network of over 200 master craftsmen. Bronze casters, stone carvers, textile artists, and metal fabricators work in concert, each bringing generations of expertise to the project.",
    image: "/art-studio-workshop-sculptors-working-monumental.jpg",
    duration: "8-24 Weeks",
    deliverables: ["Progress Updates", "Quality Inspections", "Craft Documentation"],
  },
  {
    number: "04",
    title: "Installation & Unveiling",
    description:
      "The final phase brings our creation to its permanent home. Our installation teams work with precision and care, ensuring every element is perfectly positioned. We coordinate with stakeholders for a memorable unveiling ceremony.",
    image: "/surat-airport-public-art.jpg",
    duration: "2-6 Weeks",
    deliverables: ["Installation", "Documentation", "Maintenance Guide"],
  },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-32 bg-[#F5F0E8]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <TextReveal>
              <span className="oh-label block mb-4">(Our Process)</span>
            </TextReveal>
            <TextReveal delay={100}>
              <h2 className="font-serif lg:text-5xl max-w-[650px]">
                From vision to monument, every step is intentional
              </h2>
            </TextReveal>
          </div>
          <TextReveal delay={200}>
            <p className="oh-body max-w-[450px] lg:text-xl">
              Our proven methodology ensures exceptional results while honoring the cultural significance of each
              commission.
            </p>
          </TextReveal>
        </div>

        {/* Process steps - horizontal scroll on mobile, grid on desktop */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - Step navigation */}
          <div className="space-y-9">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`cursor-pointer group transition-all duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-90 hover:opacity-70"
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      activeStep === index ? "text-[#FFA500]" : "text-[#CFCAC4]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`font-serif text-xl md:text-2xl mb-2 transition-colors duration-300 ${
                        activeStep === index ? "text-[#1A1815]" : "text-[#6B6560]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeStep === index ? "auto" : 0,
                        opacity: activeStep === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="oh-body text-sm mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <span className="text-[#C2542D] uppercase tracking-wider">{step.duration}</span>
                        <span className="text-[#8B8680]">•</span>
                        {step.deliverables.map((d, i) => (
                          <span key={i} className="text-[#6B6560]">
                            {d}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
                {/* Progress line */}
                <div className="ml-10 mt-4 h-px bg-[#1A1815]/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C2542D] to-[#B8963F]"
                    initial={{ width: "0%" }}
                    animate={{ width: activeStep === index ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Step image */}
          <div className="relative aspect-[4/3.5] overflow-hidden">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: activeStep === index ? 1 : 0,
                  scale: activeStep === index ? 1 : 1.1,
                }}
                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                {/* Overlay with step number */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="font-mono text-6xl md:text-8xl text-[#FAF7F2]/20">{step.number}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
