"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type SplitMode = "character-reveal" | "word-reveal" | "hover-wave" | "gradient-sweep"

interface SplitTextProps {
  text: string
  mode?: SplitMode
  delay?: number
  stagger?: number
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * Split text into characters or words with configurable reveal + hover effects.
 * Intended for headlines and hero typography.
 */
export function SplitText({
  text,
  mode = "character-reveal",
  delay = 0,
  stagger = 0.03,
  className,
  as: Tag = "span",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const parts = mode === "word-reveal" ? text.split(" ") : Array.from(text)

  const isGradient = mode === "gradient-sweep"
  const shouldAnimate = !prefersReducedMotion

  return (
    <Tag className={cn("inline-flex flex-wrap", isGradient && "text-shimmer", className)}>
      {parts.map((part, index) => (
        <motion.span key={`${part}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: mode === "hover-wave" ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: (delay + (shouldAnimate ? index * stagger * 1000 : 0)) / 1000,
              duration: 0.45,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            whileHover={
              mode === "hover-wave" && shouldAnimate
                ? {
                    y: -6,
                    scale: 1.05,
                    transition: { duration: 0.2, ease: [0.25, 0.4, 0.25, 1] },
                  }
                : undefined
            }
            style={{ willChange: "transform, opacity" }}
            className="inline-block"
          >
            {part === " " ? "\u00A0" : part}
            {mode === "word-reveal" ? "\u00A0" : null}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}


