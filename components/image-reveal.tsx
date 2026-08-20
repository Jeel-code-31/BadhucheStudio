"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  direction?: "bottom" | "left" | "right" | "top"
  delay?: number
}

export function ImageReveal({
  src,
  alt,
  className = "",
  priority = false,
  direction = "bottom",
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const clipVariants = {
    bottom: {
      initial: "inset(100% 0 0 0)",
      animate: "inset(0% 0 0 0)",
    },
    top: {
      initial: "inset(0 0 100% 0)",
      animate: "inset(0 0 0% 0)",
    },
    left: {
      initial: "inset(0 100% 0 0)",
      animate: "inset(0 0% 0 0)",
    },
    right: {
      initial: "inset(0 0 0 100%)",
      animate: "inset(0 0 0 0%)",
    },
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="relative w-full h-full"
        initial={{ clipPath: clipVariants[direction].initial }}
        animate={isInView ? { clipPath: clipVariants[direction].animate } : {}}
        transition={{
          duration: 1.2,
          delay: delay / 1000,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.2 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 1.4,
            delay: delay / 1000,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 55vw"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(184, 150, 63, 0.1) 50%, transparent 60%)",
          }}
        />
      </div>
    </div>
  )
}
