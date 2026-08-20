"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { TextureOverlay } from "./texture-overlay"

interface StatProps {
  value: string
  label: string
  suffix?: string
}

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const numericValue = Number.parseInt(value.replace(/\D/g, ""), 10)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = 0
          const duration = 3000
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(Math.floor(eased * numericValue))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericValue])

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl text-[#1A1815] tracking-tight">
      {count}
      {suffix}
    </span>
  )
}

export function StatsCounter({ stats }: { stats: StatProps[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={`group relative overflow-hidden text-center py-8 rounded-sm ${index < stats.length - 1 ? "md:border-r md:border-[#1A1815]/[0.08]" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <TextureOverlay texture="bronze" opacity={0.12} blendMode="multiply" />
          <TextureOverlay texture="canvas" opacity={0.20} blendMode="soft-light" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(184,150,63,0.24), transparent 100%)",
            }}
          />
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          <p className="mt-3 text-xs uppercase tracking-[0.15em] text-[#8B8680]">({stat.label})</p>
        </motion.div>
      ))}
    </div>
  )
}
