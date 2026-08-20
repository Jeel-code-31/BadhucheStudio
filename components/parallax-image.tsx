"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  priority?: boolean
}

export function ParallaxImage({ src, alt, className = "", speed = 0.3, priority = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-20%]" style={{ y }}>
        <Image src={src || "/placeholder.svg"} alt={alt} fill priority={priority} className="object-cover" />
      </motion.div>
    </div>
  )
}
