"use client"

import { useEffect, useRef, useState } from "react"
// This path assumes you save the next file in components/image-reveal.tsx
import { ImageReveal } from "@/components/image-reveal" 

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  description: string
}

const muralHotspots: Hotspot[] = [
  {
    id: "1",
    x: 50,
    y: 22,
    title: "Divine Cosmic Form",
    description: "Lord Vishnu in supreme manifestation",
  },
  {
    id: "2",
    x: 18,
    y: 48,
    title: "Golden Temple",
    description: "Classical Nagara architecture",
  },
  {
    id: "3",
    x: 82,
    y: 48,
    title: "Sacred Sanctum",
    description: "Dome of spiritual heritage",
  },
  {
    id: "4",
    x: 65,
    y: 30,
    title: "Celestial Beings",
    description: "Divine cosmic realm",
  },
]

interface ImageWithHotspotsProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  direction?: "top" | "bottom" | "left" | "right"
}

export function ImageWithHotspots({ src, alt, className, priority, direction }: ImageWithHotspotsProps) {
  const [visibleHotspots, setVisibleHotspots] = useState<Set<string>>(new Set())
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Calculate scroll progress through the container (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)))

      const newVisible = new Set<string>()
      muralHotspots.forEach((hotspot, index) => {
        // Stagger the reveal of hotspots based on scroll progress
        const threshold = (index + 1) / (muralHotspots.length + 3)
        if (scrollProgress >= threshold) {
          newVisible.add(hotspot.id)
        }
      })

      setVisibleHotspots(newVisible)
    }

    handleScroll() // Run once on mount
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Empty dependency array ensures effect runs only once

  return (
    <>
      <div ref={containerRef} className="relative mx-auto max-w-4xl">
        {/* The ImageReveal component wraps the actual image display */}
        <ImageReveal
          src={src || "/placeholder.svg"}
          alt={alt}
          className={className}
          priority={priority}
          direction={direction}
        />

        {/* Hotspot Markers */}
        {muralHotspots.map((hotspot, index) => (
          <button
            key={hotspot.id}
            // Position using percentage values from hotspot data
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 group z-20 ${
              visibleHotspots.has(hotspot.id) ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-180"
            }`}
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transitionDelay: `${index * 150}ms`,
            }}
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            aria-label={`Explore ${hotspot.title}`}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              {/* Triple ring pulsing effect */}
              <div className="absolute inset-0 bg-[#da951eff] rounded-full animate-ping opacity-60" />
              <div className="absolute inset-1 bg-[#b8963f] rounded-full animate-pulse opacity-40" />
              <div
                className="absolute inset-2 bg-[#c2542d] rounded-full animate-pulse opacity-30"
                style={{ animationDelay: "150ms" }}
              />

              {/* Center dot with gradient */}
              <div
                className={`relative w-full h-full bg-gradient-to-br from-[#da951eff] via-[#b8963f] to-[#c2542d] rounded-full border-2 border-white/90 shadow-xl group-hover:scale-125 transition-all duration-300 ${
                  activeHotspot === hotspot.id ? "ring-4 ring-[#da951eff]/50 scale-110" : ""
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Description Cards - Below the image on scroll */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mx-auto max-w-4xl">
        {muralHotspots.map((hotspot, index) => (
          <div
            key={hotspot.id}
            className={`transition-all duration-700 ${
              visibleHotspots.has(hotspot.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 180 + 400}ms`,
            }}
          >
            <div
              className={`relative bg-[#FAF7F2] border-2 rounded-lg p-4 sm:p-5 shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer ${
                activeHotspot === hotspot.id
                  ? "ring-3 ring-[#da951eff]/30 scale-[1.02] border-[#da951eff]"
                  : "border-[#1A1815]/10 hover:border-[#da951eff]/30"
              }`}
              onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#da951eff] via-[#b8963f] to-[#c2542d] text-white rounded-full flex items-center justify-center font-bold text-base shadow-md">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="oh-label text-base sm:text-lg font-semibold text-[#1A1815] mb-1 text-balance">
                    {hotspot.title}
                  </h3>
                  <p className="oh-body text-xs sm:text-sm text-[#1A1815]/70 leading-relaxed text-pretty">
                    {hotspot.description}
                  </p>
                </div>
              </div>

              {/* Active indicator */}
              {activeHotspot === hotspot.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-2.5 h-2.5 bg-[#da951eff] rounded-full animate-pulse shadow-sm" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
