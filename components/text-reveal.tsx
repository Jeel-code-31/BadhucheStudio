"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function TextReveal({ children, className = "", delay = 0, direction = "up" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true)
          setHasAnimated(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          y: directions[direction].y,
          x: directions[direction].x,
        }}
        animate={isInView || hasAnimated ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: delay / 1000,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
