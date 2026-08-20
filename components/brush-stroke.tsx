"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface BrushStrokeProps {
  className?: string
  color?: "terracotta" | "gold"
  width?: number
}

export function BrushStroke({ className = "", color = "terracotta", width = 200 }: BrushStrokeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const colors = {
    terracotta: "#B8562D",
    gold: "#C4A35A",
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg width={width} height="12" viewBox={`0 0 ${width} 12`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d={`M2 6 Q ${width * 0.25} 2, ${width * 0.5} 6 T ${width - 2} 6`}
          stroke={colors[color]}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}
