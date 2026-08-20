// TypeScript interfaces for Sanity data structures

export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
      lqip?: string
    }
  }
  alt: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface SanityFile {
  asset: {
    url: string
    originalFilename?: string
    size?: number
  }
}

export interface CTA {
  _key: string
  label: string
  url: string
  external?: boolean
}

export interface Social {
  platform: string
  url: string
}

export interface Stat {
  _key: string
  label: string
  value: string
  suffix?: string
}

export interface TimelineItem {
  _key: string
  year?: string
  phase?: string
  startDate?: string
  endDate?: string
  title: string
  description?: string
}

export interface AwardItem {
  _key: string
  title: string
  organization: string
  year: string
  description?: string
}

export interface PressItem {
  _key: string
  title: string
  publication: string
  url?: string
  date: string
  excerpt?: string
}

export interface Download {
  _key: string
  label: string
  file: SanityFile
}

export interface SEO {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: SanityImage
}

// ============================================
// DOCUMENT TYPES
// ============================================

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  order?: number
}
export interface Projection {
  _id: string
  title: string
  slug: {
    current: string
  }
  heroImage: SanityImage
  heroVideo?: string
  excerpt?: string
  overview?: any // Portable Text
  challenge?: any // Portable Text
  solution?: any // Portable Text
  category?: Category
  services?: string[]
  materials?: string[]
  dimensions?: string
  weight?: string
  year?: string
  location?: string
  timeline?: TimelineItem[]
  gallery?: SanityImage[]
  coverVideo?: string
  credits?: string[]
  collaborators?: string
  awards?: AwardItem[]
  pressLinks?: PressItem[]
  sustainability?: any // Portable Text
  downloads?: Download[]
  seo?: SEO
  featured?: boolean
  order?: number
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  heroImage: SanityImage
  heroVideo?: string
  excerpt?: string
  overview?: any // Portable Text
  challenge?: any // Portable Text
  solution?: any // Portable Text
  category?: Category
  services?: string[]
  materials?: string[]
  dimensions?: string
  weight?: string
  year?: string
  location?: string
  timeline?: TimelineItem[]
  gallery?: SanityImage[]
  coverVideo?: string
  credits?: string[]
  collaborators?: string
  awards?: AwardItem[]
  pressLinks?: PressItem[]
  sustainability?: any // Portable Text
  downloads?: Download[]
  seo?: SEO
  featured?: boolean
  order?: number
}

export interface Person {
  _id: string
  name: string
  role: string
  bio?: any // Portable Text
  image?: SanityImage
  email?: string
  linkedin?: string
  order?: number
}

export interface ProcessStep {
  _id: string
  title: string
  description?: any // Portable Text
  deliverables?: string[]
  duration?: string
  order: number
}

export interface Press {
  _id: string
  title: string
  publication: string
  url?: string
  date: string
  excerpt?: string
  featured?: boolean
}

export interface Award {
  _id: string
  title: string
  organization: string
  category?: string
  year: string
  description?: string
  image?: SanityImage
}

export interface FAQ {
  _id: string
  question: string
  answer: any // Portable Text
  category?: string
  order?: number
}

export interface GalleryItem {
  _id: string
  title: string
  image: SanityImage
  category?: "WIP" | "Render" | "Installation"
  project?: {
    title: string
    slug: {
      current: string
    }
  }
  order?: number
}

export interface Testimonial {
  _id: string
  name: string
  role?: string
  company?: string
  content: any // Portable Text
  image?: SanityImage
  project?: {
    title: string
    slug: {
      current: string
    }
  }
}

export interface Homepage {
  _id: string
  heroTitle: string
  heroSubtitle?: string
  heroImage?: SanityImage
  featuredProjects?: Project[]
  stats?: Stat[]
  ctaTitle?: string
  ctaDescription?: string
}

export interface StudioPage {
  _id: string
  title: string
  description?: any // Portable Text
  capabilities?: string[]
  services?: string[]
  featuredImage?: SanityImage
  timeline?: TimelineItem[]
}

export interface ContactInfo {
  _id: string
  email?: string[]
  phones?: string[]
  address?: string
  mapEmbed?: string
  social?: Array<{
    platform: string
    url: string
  }>
}

export interface SiteSettings {
  _id: string
  siteTitle: string
  description?: string
  navLinks?: CTA[]
  footerLinks?: CTA[]
  social?: Social[]
  contactSummary?: string
  logo?: SanityImage
  defaultSeo?: SEO
}

// ============================================
// SEARCH RESULT TYPE
// ============================================

export interface SearchResult {
  _id: string
  _type: "project" | "press" | "galleryItem"
  title: string
  slug?: {
    current: string
  }
  excerpt?: string
  heroImage?: SanityImage
}

