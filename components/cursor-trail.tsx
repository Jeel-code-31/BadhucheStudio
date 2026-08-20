"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type TrailDot = { id: number; x: number; y: number; hue: number }

export function CursorTrail() {
  const prefersReducedMotion = useReducedMotion()
  const [dots, setDots] = useState<TrailDot[]>([])

  useEffect(() => {
    if (prefersReducedMotion) return

    let counter = 0
    let frame: number | null = null

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next: TrailDot = {
          id: Date.now() + counter++,
          x: event.clientX,
          y: event.clientY,
          hue: 26 + Math.random() * 16,
        }
        setDots((prev) => [...prev.slice(-14), next])
        setTimeout(() => {
          setDots((prev) => prev.filter((dot) => dot.id !== next.id))
        }, 900)
      })
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[6]">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="absolute animate-particle"
          style={{
            left: dot.x,
            top: dot.y,
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
            background: `hsl(${dot.hue} 70% 45%)`,
            boxShadow: `0 0 18px hsla(${dot.hue}, 80%, 55%, 0.5)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}


