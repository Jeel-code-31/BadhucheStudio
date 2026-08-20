"use client"

import { MagneticButton } from "./magnetic-button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react"
import type { SiteSettings, ContactInfo } from "@/sanity/lib/types"

interface FooterProps {
  settings?: SiteSettings | null
  contactInfo?: ContactInfo | null
}

export function Footer({ settings, contactInfo }: FooterProps) {
  const prefersReducedMotion = useReducedMotion()

  const siteTitle = settings?.siteTitle || "Badhuche"

  const contactSummary =
    settings?.contactSummary ||
    "Reimagining spaces as lasting cultural landmarks through monumental art and sculptural excellence."

  const email = contactInfo?.email?.[0] || "badhuche@gmail.com"

  // ✅ Fixed phone logic
  const phones =
    contactInfo?.phones?.length
      ? contactInfo.phones
      : ["+91 98257 99794", "+91 7972823811"]

  const address =
    contactInfo?.address || "Vadodara,Gujarat\n Nashik,Maharashtra"

  const addresses = [
    {
      title: "Head Office",
      lines: [
        "S5, National Plaza",
        "Alkapuri- Vadodara",
        "Gujarat-390 007",
      ],
    },
    {
      title: "Second Office",
      lines: [
        "307, Center Point",
        "Andheri-East,",
        "Mumbai-400 059",
      ],
    },
  ]

  const addressLines = address.split("\n")

  const socialLinks =
    settings?.social && settings.social.length > 0
      ? settings.social
      : [
        { platform: "Instagram", url: "https://www.instagram.com/badhuche_studio/" },
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/badhuche/" },
        { platform: "YouTube", url: "https://www.youtube.com/@badhuchecreativestudio2025" },
        { platform: "Facebook", url: "https://www.facebook.com/share/1C3csBgRb2/" },
      ]

  return (
    <footer className="relative overflow-hidden text-[#FAF7F2]">

      {!prefersReducedMotion && (
        <video
          className="absolute inset-0 w-full h-full object-cover scale-[1.03] blur-[0.5px]"
          poster="/footer.png"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {prefersReducedMotion && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/footer.png)" }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t" />

      <div className="relative px-6 md:px-10 py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto">

          <div className="w-full h-px bg-[rgba(250,247,242,0.16)] mb-3" />

        </div>

        <div className="max-w-[1400px] mx-auto">

          <div className="flex flex-col md:flex-row justify-between">

            {/* Branding */}
            <div className="space-y-8">
              <div className="space-y-4">
                <MagneticButton href="/">
                  <span className="font-serif text-4xl md:text-5xl font-semibold text-[#FAF7F2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:tracking-[0.09em]">
                    {siteTitle}
                    <sup className="text-xs align-super ml-0.5">TM</sup>
                  </span>
                </MagneticButton>

                <p className="text-[#E8E2D9] text-xl max-w-[400px] leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                  {contactSummary}
                </p>
              </div>

              <div className="pt-4">
                <p className="text-[#D9D4CC] text-xs uppercase tracking-widest opacity-60">
                  © {new Date().getFullYear()} {siteTitle} Art Studios 
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 lg:gap-16">

              {/* Contact */}
              <div className="space-y-5">

                <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                  Contact
                </span>

                <div className="space-y-3">

                  <a
                    href={`mailto:${email}`}
                    className="block text-[#FAF7F2] text-sm font-semibold hover:text-[#b8963f] transition-colors duration-300 drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]"
                  >
                    {email}
                  </a>

                  {/* ✅ Phone numbers */}
                  {phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-[#FAF7F2] text-sm font-semibold hover:text-[#b8963f] transition-colors duration-300 drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]"
                    >
                      {phone}
                    </a>
                  ))}

                </div>

              </div>

              {/* Social */}
              <div className="space-y-3">

                <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                  Social
                </span>

                <div className="flex items-center gap-4 drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">

                  {socialLinks.map((social) => {

                    const icon =
                      social.platform.toLowerCase() === "instagram"
                        ? <Instagram className="h-5 w-5" />
                        : social.platform.toLowerCase() === "linkedin"
                          ? <Linkedin className="h-5 w-5" />
                          : social.platform.toLowerCase() === "youtube"
                            ? <Youtube className="h-5 w-5" />
                            : <Facebook className="h-5 w-5" />

                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="text-[#FAF7F2] hover:text-[#b8963f] transition-colors duration-300"
                      >
                        {icon}
                      </a>
                    )
                  })}

                </div>

              </div>

              {/* Studio */}
              <div className="space-y-3">

                <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                  Studio
                </span>

                <div className="space-y-1">

                  {addressLines.map((line, i) => (
                    <p
                      key={i}
                      className="text-[#FAF7F2] text-sm font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]"
                    >
                      {line}
                    </p>
                  ))}

                </div>

              </div>

              {/* Office Addresses */}
              <div className="space-y-6">

                {addresses.map((address, index) => (

                  <div key={index} className="space-y-3">

                    <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold">
                      {address.title}
                    </span>

                    <div className="space-y-1">

                      {address.lines.map((line, i) => (
                        <p
                          key={i}
                          className="text-[#FAF7F2] text-sm font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
