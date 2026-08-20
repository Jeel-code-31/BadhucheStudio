"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  backgroundColor?: string
  className?: string
}

export function SectionWrapper({ children, backgroundColor = "#0A0F1C", className = "" }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setIsActive(true)
          // Update body background for section color shift effect
          document.body.style.backgroundColor = backgroundColor
          document.body.style.transition = "background-color 0.6s ease-out"
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [backgroundColor])

  return (
    <section ref={ref} className={`transition-colors duration-600 ${className}`} style={{ backgroundColor }}>
      {children}
    </section>
  )
}
