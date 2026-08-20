import { groq } from "next-sanity"

// ============================================
// SINGLETON QUERIES (Site-wide settings)
// ============================================

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  siteTitle,
  description,
  navLinks[]{
    _key,
    label,
    url,
    external
  },
  footerLinks[]{
    _key,
    label,
    url,
    external
  },
  social[]{
    platform,
    url
  },
  contactSummary,
  logo{
    asset->{
      _id,
      url,
      metadata{dimensions, lqip}
    },
    alt
  },
  defaultSeo
}`

export const contactInfoQuery = groq`*[_type == "contactInfo"][0]{
  _id,
  email,
  phones,
  address,
  mapEmbed,
  social
}`

// ============================================
// PAGE QUERIES
// ============================================

export const homepageQuery = groq`*[_type == "homepage"][0]{
  _id,
  heroTitle,
  heroSubtitle,
  heroImage{
    asset->{
      _id,
      url,
      metadata{dimensions, lqip}
    },
    alt
  },
  featuredProjects[]->{
    _id,
    title,
    slug,
    heroImage{
      asset->{url, metadata{lqip}},
      alt
    },
    excerpt,
    category->{title, slug}
  },
  stats[]{
    _key,
    label,
    value,
    suffix
  },
  ctaTitle,
  ctaDescription
}`

export const studioPageQuery = groq`*[_type == "studioPage"][0]{
  _id,
  title,
  description,
  capabilities[],
  services[],
  featuredImage{
    asset->{url, metadata{lqip}},
    alt
  },
  timeline[]{
    _key,
    year,
    title,
    description
  }
}`
// ============================================
// PROJECTION QUERIES
// ============================================
// ----------------- PROJECTION QUERIES -----------------

// Fetch all projections
export const projectionsQuery = `*[_type == "projection"] | order(_createdAt desc){
  title,
  slug,
  heroImage,
  excerpt,
  categories[]->{title, slug}
}`

// Fetch projections by category
export const projectionsByTypeQuery = `*[_type == "projection" && $categorySlug in categories[]->slug.current] | order(_createdAt desc){
  title,
  slug,
  heroImage,
  excerpt,
  categories[]->{title, slug}
}`
// Projection Queries
export const projectionBySlugQuery = `*[_type == "projection" && slug.current == $slug][0]{
  title,
  slug,
  heroImage,
  heroVideo,
  gallery,
  excerpt,
  overview,
  challenge,
  solution,
  location,
  year,
  materials,
  services,
  credits[]{name, role, organization},
  awards[]{title, year, organization, link}
}`

export const featuredProjectionsQuery = `*[_type == "projection" && defined(heroImage)] | order(_createdAt desc){
  title,
  slug,
  heroImage
}`

// ============================================
// PROJECT QUERIES
// ============================================

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc){
  _id,
  title,
  slug,
  heroImage{
    asset->{url, metadata{lqip}},
    alt
  },
  featured,
  category->{
    _id,
    title,
    slug
  },
  excerpt,
  year,
  location,
  order
}`

export const projectsByTypeQuery = groq`*[_type == "project" && category->slug.current == $categorySlug] | order(order asc, _createdAt desc){
  _id,
  title,
  slug,
  heroImage{
    asset->{url, metadata{lqip}},
    alt
  },
  excerpt,
  year,
  location,
  category->{title, slug}
}`

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc, _createdAt desc)[0...6]{
  _id,
  title,
  slug,
  heroImage{
    asset->{url, metadata{lqip}},
    alt
  },
  excerpt,
  category->{title, slug},
  year,
  location
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  heroImage{
    asset->{url, metadata{dimensions, lqip}},
    alt
  },
  heroVideo,
  excerpt,
  overview,
  challenge,
  solution,
  category->{
    title,
    slug
  },
  services[],
  materials[],
  dimensions,
  weight,
  year,
  location,
  timeline[]{
    _key,
    phase,
    startDate,
    endDate,
    description
  },
  gallery[]{
    _key,
    asset->{
      _id,
      url,
      metadata{dimensions, lqip}
    },
    alt,
    caption
  },
  coverVideo,
  credits[],
  collaborators,
  awards[]{
    _key,
    title,
    organization,
    year
  },
  pressLinks[]{
    _key,
    title,
    publication,
    url,
    date
  },
  sustainability,
  downloads[]{
    _key,
    label,
    file{
      asset->{url, originalFilename, size}
    }
  },
  seo,
  featured,
  order
}`

export const relatedProjectsQuery = groq`*[_type == "project" && slug.current != $slug && category->slug.current == $categorySlug] | order(order asc, _createdAt desc)[0...3]{
  _id,
  title,
  slug,
  heroImage{
    asset->{url, metadata{lqip}},
    alt
  },
  excerpt,
  category->{title, slug}
}`

// ============================================
// CATEGORY QUERIES
// ============================================

export const categoriesQuery = groq`*[_type == "category"] | order(order asc){
  _id,
  title,
  slug,
  description,
  order
}`

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description
}`

// ============================================
// TEAM & PEOPLE QUERIES
// ============================================

export const teamQuery = groq`*[_type == "person"] | order(order asc){
  _id,
  name,
  role,
  bio,
  image{
    asset->{url, metadata{lqip}},
    alt
  },
  email,
  linkedin,
  order
}`

export const personByIdQuery = groq`*[_type == "person" && _id == $id][0]{
  _id,
  name,
  role,
  bio,
  image{
    asset->{url, metadata{lqip}},
    alt
  },
  email,
  linkedin
}`

// ============================================
// PROCESS QUERIES
// ============================================

export const processStepsQuery = groq`*[_type == "processStep"] | order(order asc){
  _id,
  title,
  description,
  deliverables[],
  duration,
  order
}`

// ============================================
// CONTENT QUERIES (Press, Awards, FAQs, etc.)
// ============================================

export const pressQuery = groq`*[_type == "press"] | order(date desc){
  _id,
  title,
  publication,
  url,
  date,
  excerpt,
  featured
}`

export const awardsQuery = groq`*[_type == "award"] | order(year desc){
  _id,
  title,
  organization,
  category,
  year,
  description,
  image{
    asset->{url, metadata{lqip}},
    alt
  }
}`

export const faqQuery = groq`*[_type == "faq"] | order(order asc){
  _id,
  question,
  answer,
  category,
  order
}`

export const faqByCategoryQuery = groq`*[_type == "faq" && category == $category] | order(order asc){
  _id,
  question,
  answer,
  category,
  order
}`

// ============================================
// GALLERY QUERIES
// ============================================

export const galleryQuery = groq`*[_type == "galleryItem"] | order(order asc, _createdAt desc){
  _id,
  title,
  image{
    asset->{url, metadata{dimensions, lqip}},
    alt
  },
  category,
  project->{
    title,
    slug
  },
  order
}`

export const galleryByCategoryQuery = groq`*[_type == "galleryItem" && category == $category] | order(order asc, _createdAt desc){
  _id,
  title,
  image{
    asset->{url, metadata{dimensions, lqip}},
    alt
  },
  category,
  project->{
    title,
    slug
  }
}`

// ============================================
// TESTIMONIAL QUERIES
// ============================================

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  name,
  role,
  company,
  content,
  image{
    asset->{url, metadata{lqip}},
    alt
  },
  project->{
    title,
    slug
  }
}`

// ============================================
// SEARCH QUERIES
// ============================================

export const searchQuery = groq`*[
  _type in ["project", "press", "galleryItem"] && 
  (title match $searchTerm || excerpt match $searchTerm || content match $searchTerm)
] | order(_createdAt desc)[0...$limit]{
  _id,
  _type,
  title,
  slug,
  "excerpt": coalesce(excerpt, content[0].children[0].text),
  heroImage{
    asset->{url, metadata{lqip}},
    alt
  }
}`

