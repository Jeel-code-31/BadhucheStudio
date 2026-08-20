import type React from "react"
import { draftMode } from "next/headers"
import { ImageReveal } from "@/components/image-reveal"
import { TextReveal } from "@/components/text-reveal"
import { sanityFetch } from "@/sanity/lib/fetch"
import { contactInfoQuery } from "@/sanity/lib/queries"
import type { ContactInfo } from "@/sanity/lib/types"
import ContactForm from "./contact-form"
import { TextureOverlay } from "@/components/texture-overlay"
import { ScrollWeightText } from "@/components/scroll-weight-text"
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Contact Us - Badhuche Art Studio',
  description: 'Get in touch with Badhuche Art Studio to discuss your sculpture project, commission artwork, or learn about our creative process.',
}
export default async function ContactPage() {
  const { isEnabled } = await draftMode()
  // Fetch contact info from CMS
  const contactInfo = await sanityFetch<ContactInfo>({
    query: contactInfoQuery,
    tags: ["contactInfo"],
    preview: isEnabled,
  }).catch(() => null)
  
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative px-6 md:px-10 pt-32 pb-10 overflow-hidden">
        <TextureOverlay texture="paper" opacity={0.14} blendMode="multiply" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <TextReveal>
            <span className="oh-label block mb-10 gradient-terracotta">(Begin a Project with Us)</span>
          </TextReveal>
          <TextReveal delay={100}>
            <ScrollWeightText className="oh-headline text-4xl md:text-5xl lg:text-6xl max-w-[900px]">
             Together, we will craft a landmark that endures.
            </ScrollWeightText>
          </TextReveal>
          <TextReveal delay={200}>
            <p className="oh-body text-2xl max-w-[900px] mt-10 mb-4 leading-relaxed">
              From iconic airport installations to temple sculptures and enduring public artworks, we welcome the opportunity to bring your vision to life.
            </p>
          </TextReveal>
        </div>
             </section>
      
      {/* {contact form text} */}
      <div className="max-w-[1500px] mx-auto text-center relative z-10">
         <ScrollWeightText className="oh-body text-sm sm:text-base md:text-3xl max-w-[1000px] mt-10 sm:mb-10 leading-relaxed">
         <TextReveal delay={100}>
            <p className="oh-semibold text-3xl md:text-4xl leading-relaxed">
           <span className="text-shimmer font-bold">Kindly refer to the contact form below....</span>
          </p>
          </TextReveal>
          </ScrollWeightText>
          </div>
          
      {/* Form */}
      <section className="relative px-6 md:px-10 pt-5 pb-20">
        <div className="max-w-[1000px] mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Contact Info */}
      <section className="relative px-6 md:px-10 py-0 pb-12 overflow-hidden">
        <TextureOverlay texture="gold-leaf" opacity={0.08} blendMode="overlay" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="oh-divider mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TextReveal>
              <div className="relative overflow-hidden p-4 pb-6 rounded-sm border border-[#1A1815]/10 bg-[#FAF7F2]/70 backdrop-blur-sm">
                <TextureOverlay texture="bronze" opacity={0.08} blendMode="multiply" />
                <span className="oh-label block mb-3">(Email Inquiries)</span>
                {contactInfo?.email && contactInfo.email.length > 0 ? (
                  <div className="space-y-2">
                    {contactInfo.email.map((email, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${email}`}
                        className="oh-body hover:text-black transition-colors duration-300 link-underline block"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href="mailto:badhuche@gmail.com"
                    className="oh-body hover:text-black transition-colors duration-300 link-underline block font-semibold text-[#1A1815]"
                  >
                    badhuche@gmail.com
                  </a>
                )}
              </div>
            </TextReveal>

            <TextReveal delay={100}>
              <div className="relative overflow-hidden p-4 pb-6 rounded-sm border border-[#1A1815]/10 bg-[#FAF7F2]/70 backdrop-blur-sm">
                <TextureOverlay texture="weathered-metal" opacity={0.08} blendMode="overlay" />
                <span className="oh-label block mb-3">+91 797282311</span>
                {contactInfo?.phones && contactInfo.phones.length > 0 && (
                  <div className="space-y-2">
                    {contactInfo.phones.map((phones, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phones.replace(/\s/g, '')}`}
                        className="oh-body hover:text-[#1A1815] transition-colors duration-300 link-underline block"
                      >
                        {phones}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </TextReveal>
        
              <TextReveal delay={200}>
              <div className="relative overflow-hidden p-4 pb-6 rounded-sm border border-[#1A1815]/10 bg-[#FAF7F2]/70 backdrop-blur-sm">
                <TextureOverlay texture="stone" opacity={0.08} blendMode="multiply" />
                <span className="oh-label block mb-3">(Studio Location)</span>
                {contactInfo?.address ? (
                  <p className="oh-body whitespace-pre-line">{contactInfo.address}</p>
                ) : (
                  <>
                    <p className="oh-body">Badhuche Art Studios</p>
                    <p className="oh-body">Andheri East, Mumbai</p>
                    <p className="oh-body">Maharashtra 400069, India</p>
                  </>
                )}
              </div>
            </TextReveal>
          </div>
        </div>
      </section>
    </main>
  )
}

