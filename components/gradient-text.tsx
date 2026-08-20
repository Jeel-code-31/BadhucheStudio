"use client"

import type React from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: "gold" | "terracotta" | "cyan"
}

export function GradientText({ children, className = "", variant = "gold" }: GradientTextProps) {
  const gradients = {
    gold: "linear-gradient(135deg, #B8562D 0%, #D4A574 50%, #C4A35A 100%)",
    terracotta: "linear-gradient(135deg, #9A4725 0%, #B8562D 50%, #D4A574 100%)",
    cyan: "linear-gradient(135deg, #1E3A5F 0%, #22D3EE 50%, #1E3A5F 100%)",
  }

  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradients[variant],
      }}
    >
      {children}
    </span>
  )
}
