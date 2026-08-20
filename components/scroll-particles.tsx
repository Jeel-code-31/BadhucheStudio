"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type Particle = { id: number; x: number; y: number; hue: number }

export function ScrollParticles() {
  const prefersReducedMotion = useReducedMotion()
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (prefersReducedMotion) return

    let counter = 0
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < window.innerHeight) {
        lastY = currentY
        return
      }

      const delta = Math.abs(currentY - lastY)
      lastY = currentY
      if (delta < 8) return

      const next: Particle = {
        id: Date.now() + counter++,
        x: Math.random() * 100,
        y: 30 + Math.random() * 40,
        hue: 18 + Math.random() * 22, // terracotta-gold band
      }

      setParticles((prev) => [...prev.slice(-18), next])
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== next.id))
      }, 900)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute animate-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: "8px",
            height: "8px",
            borderRadius: "9999px",
            background: `hsl(${particle.hue} 65% 48%)`,
            boxShadow: `0 0 14px hsla(${particle.hue}, 70%, 52%, 0.5)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}


