"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { GradientButton } from "./gradient-button"
import { TextureOverlay } from "./texture-overlay"

interface WorksFiltersProps {
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
}

export function WorksFilters({ categories }: WorksFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentCategory = searchParams.get("category")

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

  const handleFilterChange = (categorySlug: string) => {
    const query = createQueryString("category", categorySlug)
    router.push(pathname + (query ? `?${query}` : ""), { scroll: false })
  }

  return (
    <div className="pt-10 flex flex-wrap gap-2 sm:gap-3">
      <GradientButton
        onClick={() => handleFilterChange("")}
        texture={!currentCategory ? "bronze" : "canvas"}
        gradient={!currentCategory ? "var(--gradient-sunset)" : "linear-gradient(135deg, rgba(26,24,21,0.08), rgba(26,24,21,0.18))"}
        className={`!px-4 !py-2 min-h-[44px] text-[0.72rem] sm:text-xs ${currentCategory ? "text-[#1A1815]" : ""}`}
      >
        <span className="tracking-[0.20em]">All Works</span>
      </GradientButton>
      {categories.map((category) => {
        const isActive = currentCategory === category.slug.current
        return (
          <div key={category._id} className="relative">
            <GradientButton
              onClick={() => handleFilterChange(category.slug.current)}
              texture={isActive ? "stone" : "canvas"}
              gradient={
                isActive ? "linear-gradient(135deg, #1A1815 0%, #c2542d 50%, #b8963f 100%)" : "linear-gradient(135deg, rgba(26,24,21,0.06), rgba(26,24,21,0.14))"
              }
              className={`!px-2 !py-2 min-h-[44px] text-[0.80rem] sm:text-xs ${isActive ? "" : "text-[#1A1815]"}`}
              glowColor={isActive ? "rgba(194,84,45,0.45)" : "rgba(26,24,21,0.15)"}
            >
              <span className="tracking-[0.14em]">{category.title}</span>
            </GradientButton>
            {isActive && <TextureOverlay texture="gold-leaf" opacity={0.12} blendMode="overlay" className="absolute inset-0 pointer-events-none rounded-sm" />}
          </div>
        )
      })}
      
    </div>
  )
}

