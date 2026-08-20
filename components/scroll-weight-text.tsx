"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ScrollWeightTextProps {
  children: React.ReactNode
  from?: number
  to?: number
  className?: string
}

/**
 * Animates font-weight based on scroll position inside the viewport.
 * Useful for subtle emphasis on headlines as they come into view.
 */
export function ScrollWeightText({
  children,
  from = 400,
  to = 700,
  className,
}: ScrollWeightTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  })

  const weight = useTransform(scrollYProgress, [0, 1], [from, to])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{
        fontWeight: prefersReducedMotion ? to : weight,
        opacity: prefersReducedMotion ? 0 : opacity,
        willChange: prefersReducedMotion ? undefined : "opacity, font-weight",
      }}
    >
      {children}
    </motion.span>
  )
}


