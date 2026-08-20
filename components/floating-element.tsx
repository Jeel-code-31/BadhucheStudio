"use client"

import type React from "react"
import { motion } from "framer-motion"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

export function FloatingElement({
  children,
  className = "",
  delay = 0,
  duration = 6,
  distance = 15,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
