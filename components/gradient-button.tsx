"use client"

import type React from "react"
import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TextureOverlay } from "./texture-overlay"

type TextureKey = Parameters<typeof TextureOverlay>[0]["texture"]

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  texture?: TextureKey
  glowColor?: string
  gradient?: string
  type?: "button" | "submit" | "reset"
}

/**
 * Direction-aware gradient button: the gradient and glow rotate toward the cursor entry.
 */
export function GradientButton({
  children,
  className,
  href,
  onClick,
  texture = "canvas",
  glowColor = "rgba(217, 148, 92, 0.35)",
  gradient,
  type = "button",
}: GradientButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [angle, setAngle] = useState(13)
  const [glow, setGlow] = useState({ x: "50%", y: "50%" })
  const [bgPos, setBgPos] = useState({ x: "50%", y: "50%" })

  const gradientValue = useMemo(
    () =>
      gradient ||
      [
        `linear-gradient(${angle}deg, #f4c8a5 0%, #eab679 45%, #cf6a32 100%)`,
        `linear-gradient(${angle + 45}deg, rgba(255,255,255,0.35), rgba(255,255,255,0))`,
      ].join(", "),
    [angle, gradient],
  )

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const theta = Math.atan2(relativeY - centerY, relativeX - centerX)
    setAngle((theta * 180) / Math.PI)
    setGlow({
      x: `${(relativeX / rect.width) * 100}%`,
      y: `${(relativeY / rect.height) * 100}%`,
    })
    setBgPos({
      x: `${(relativeX / rect.width) * 100}%`,
      y: `${(relativeY / rect.height) * 100}%`,
    })
  }

  const handlePointerLeave = () => {
    setAngle(135)
    setGlow({ x: "20%", y: "20%" })
    setBgPos({ x: "20%", y: "20%" })
  }

  const sharedProps = {
    ref,
    className: cn(
      "group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-[0.12em] text-[0.7rem] sm:text-xs font-medium text-[#FAF7F2] glow-dynamic overflow-hidden transition-all duration-500",
      className,
    ),
    style: {
      backgroundImage: gradientValue,
      "--glow-y": glow.y,
      "--glow-color": glowColor,
      backgroundSize: "200% 200%",
      backgroundPosition: `${bgPos.x} ${bgPos.y}, ${100 - parseFloat(bgPos.x)}% ${bgPos.y}`,
    } as React.CSSProperties,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] as any },
  }

  const content = (
    <>
      <TextureOverlay texture={texture} opacity={0.18} blendMode="overlay" size="cover" />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glow.x} ${glow.y}, ${glowColor}, transparent 60%)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    // Remove 'ref' for <a> elements to prevent React/Next.js warnings.
    // Use only valid props for <a>.
    const { ref: _ref, ...aProps } = sharedProps
    return (
      <motion.a
        href={href}
        {...aProps}
        onClick={onClick}
        role="button"
        aria-pressed="false"
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} {...sharedProps} ref={ref as any} onClick={onClick}>
      {content}
    </motion.button>
  )
}


