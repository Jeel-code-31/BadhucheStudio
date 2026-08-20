import type React from "react"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { Analytics } from "@vercel/analytics/next"
import { CustomCursor } from "@/components/custom-cursor"
import { PageTransition } from "@/components/page-transition"
import { ScrollProgress } from "@/components/scroll-progress"
import { SmoothScroll } from "@/components/smooth-scroll"
import { NavigationClient as Navigation } from "@/components/navigation-client"
import { Footer } from "@/components/footer"
import { PreviewBar } from "@/components/preview-bar"
import { sanityFetch } from "@/sanity/lib/fetch"
import { siteSettingsQuery, contactInfoQuery } from "@/sanity/lib/queries"
import type { SiteSettings, ContactInfo } from "@/sanity/lib/types"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  }).catch(() => null)

  const title = settings?.defaultSeo?.title || settings?.siteTitle || "Badhuche — Monumental Art"
  const description = settings?.defaultSeo?.description || "Award-winning monumental art and public installations across India."
  const ogImage = settings?.defaultSeo?.ogImage?.asset?.url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isPreview } = await draftMode()

  const [settings, contactInfo] = await Promise.all([
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"], preview: isPreview }).catch(() => null),
    sanityFetch<ContactInfo>({ query: contactInfoQuery, tags: ["contactInfo"], preview: isPreview }).catch(() => null),
  ])

  // Combine Schema.org data into one array to reduce script tags
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: settings?.siteTitle || "Badhuche Art Studio",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: settings?.logo?.asset?.url,
      sameAs: settings?.social?.map((s) => s.url).filter(Boolean) || [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings?.siteTitle,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${process.env.NEXT_PUBLIC_SITE_URL}/works?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }
  ]

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation settings={settings} contactInfo={contactInfo} />
      
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>

      <Footer settings={settings} contactInfo={contactInfo} />
      
      {isPreview && <PreviewBar />}
      <Analytics />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}