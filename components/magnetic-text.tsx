"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface MagneticTextProps {
  children: React.ReactNode
  className?: string
  /** Drag strength multiplier */
  strength?: number
  /** Radius in px where the magnetic effect is active */
  radius?: number
  /** Text color when cursor is within the radius */
  activeColor?: string
  /** Default text color */
  baseColor?: string
}

/**
 * Cursor-reactive text: gently pulls toward the pointer within a radius
 * and shifts color toward the accent.
 */
export function MagneticText({
  children,
  className,
  strength = 0.25,
  radius = 140,
  activeColor = "#c2542d",
  baseColor,
}: MagneticTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = event.clientX - centerX
    const deltaY = event.clientY - centerY
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

    if (distance < radius) {
      const influence = 1 - distance / radius
      x.set(deltaX * strength * influence)
      y.set(deltaY * strength * influence)
      setIsActive(true)
    } else {
      x.set(0)
      y.set(0)
      setIsActive(false)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsActive(false)
  }

  return (
    <motion.span
      ref={ref}
      style={{
        x: prefersReducedMotion ? 0 : springX,
        y: prefersReducedMotion ? 0 : springY,
        color: isActive && activeColor ? activeColor : baseColor,
        willChange: "transform, color",
      }}
      className={cn("inline-block", className)}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}


