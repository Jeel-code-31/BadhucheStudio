"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({ children, className = "", href, onClick, strength = 0.12 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 70 }
  const x = useSpring(
    useTransform(mouseX, (v) => v * strength),
    springConfig,
  )
  const y = useSpring(
    useTransform(mouseY, (v) => v * strength),
    springConfig,
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const content = (
    <motion.div
      ref={ref}
      data-magnetic
      className={`inline-block relative ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  )
}
