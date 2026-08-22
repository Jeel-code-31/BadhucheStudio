import { TextReveal } from "@/components/text-reveal"
import { TextureOverlay } from "@/components/texture-overlay"
import { CursorTrail } from "@/components/cursor-trail"
import { ProjectionGallery } from "@/components/projection-gallery"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Projection Works - Sculpture Projections | Badhuche Art Studio",
  description: "Browse our collection of completed sculpture projections.",
}

// Local Data
const PROJECTS_DATA = [
  {
    id: "1",
    title: "Story of Ramayan",
    slug: "Ramayan",
    image: "/Ramayan1.png",
    videoUrl: "https://iframe.mediadelivery.net/play/583855/912f0d66-3718-4682-ab0d-ec228ae1af66",
    category: "Ramayan",
  },
{
  id: "2",
  title: "Story Of Mahavira",
  slug: "MahaVira",
  image: "/Mahavira.jpg",
  // Use the direct blob link here
  videoUrl: "https://iframe.mediadelivery.net/embed/583855/1f6a8565-084f-4272-9b01-b8abc364471d?autoplay=true&loop=false&muted=false&preload=true&responsive=true", 
  category: "Mahavira"
}, 
{
  id: "3",
  title: "Goda Aarti Nashik",
  slug: "Goda-Aarti-Nashik",
  image: "/Goda-Aarti.jpg",
  // Use the direct blob link here
  videoUrl: "https://iframe.mediadelivery.net/embed/583855/7838c69b-7d21-40e4-af72-ec682884baa4?autoplay=true&loop=false&muted=false&preload=true&responsive=true", 
  category: "Goda Aarti Nashik"
}
];

export default function ProjectionWorksPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-white text-black">
      <TextureOverlay texture="paper" opacity={0.05} blendMode="overlay" />
      <CursorTrail />

      {/* Header Section */}
      <section className="relative px-4 sm:px-6 md:px-10 pt-20 z-10">
        <div className="max-w-[1400px] mx-auto">
          <TextReveal>
            <h1 className="text-2xl sm:text-2xl md:text-5xl font-bold mt-10 mb-5 tracking-tight uppercase">
              Light & Sound Design - Projection Mapping
            </h1>
          </TextReveal>

          <TextReveal delay={50}>
            <p className="text-sm sm:text-base opacity-70 max-w-[650px] mb-12 leading-relaxed">
              "Our projection videos blend creativity, technology, and architectural vision,
              bringing each installation to life in captivating and memorable ways."
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative px-4 sm:px-6 md:px-10 pt-10 pb-32 z-10">
        <div className="max-w-[1400px] mx-auto">
          <ProjectionGallery initialProjects={PROJECTS_DATA} />
        </div>
      </section>
    </main>
  )
}
