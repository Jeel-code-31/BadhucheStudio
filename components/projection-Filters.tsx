"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { GradientButton } from "./gradient-button"
import { TextureOverlay } from "./texture-overlay"

interface ProjectionFiltersProps {
  projections: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
}

export function ProjectionFilters({ projections }: ProjectionFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentProjection = searchParams.get("projection") // Separate query param

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (projectionSlug: string) => {
    const query = createQueryString("projection", projectionSlug)
    router.push(pathname + (query ? `?${query}` : ""), { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
      <GradientButton
        onClick={() => handleFilterChange("")}
        texture={!currentProjection ? "bronze" : "canvas"}
        gradient={!currentProjection ? "linear-gradient(135deg, #b8963f, #c2542d)" : "linear-gradient(135deg, rgba(26,24,21,0.08), rgba(26,24,21,0.18))"}
        className={`!px-4 !py-2 min-h-[44px] text-[0.72rem] sm:text-xs ${currentProjection ? "text-[#1A1815]" : ""}`}
      >
        <span className="tracking-[0.20em]">All Projections</span>
      </GradientButton>

      {projections.map((proj) => {
        const isActive = currentProjection === proj.slug.current
        return (
          <div key={proj._id} className="relative">
            <GradientButton
              onClick={() => handleFilterChange(proj.slug.current)}
              texture={isActive ? "stone" : "canvas"}
              gradient={isActive ? "linear-gradient(135deg, #1A1815 0%, #c2542d 50%, #b8963f 100%)" : "linear-gradient(135deg, rgba(26,24,21,0.06), rgba(26,24,21,0.14))"}
              className={`!px-2 !py-2 min-h-[44px] text-[0.80rem] sm:text-xs ${isActive ? "" : "text-[#1A1815]"}`}
              glowColor={isActive ? "rgba(194,84,45,0.45)" : "rgba(26,24,21,0.15)"}
            >
              <span className="tracking-[0.14em]">{proj.title}</span>
            </GradientButton>
            {isActive && <TextureOverlay texture="gold-leaf" opacity={0.12} blendMode="overlay" className="absolute inset-0 pointer-events-none rounded-sm" />}
          </div>
        )
      })}
    </div>
  )
}
