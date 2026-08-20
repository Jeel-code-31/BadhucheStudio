"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  color: string
}

interface InkSplash {
  id: number
  x: number
  y: number
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "link" | "project" | "gallery" | "text">("default")
  const [cursorText, setCursorText] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])
  const [inkSplashes, setInkSplashes] = useState<InkSplash[]>([])
  const [isPressed, setIsPressed] = useState(false)
  const particleId = useRef(0)
  const lastPosition = useRef({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for outer blob cursor
  const springConfig = { damping: 20, stiffness: 200, mass: 0.8 }
  const outerX = useSpring(mouseX, springConfig)
  const outerY = useSpring(mouseY, springConfig)

  // Inner dot follows more closely
  const innerSpringConfig = { damping: 30, stiffness: 400, mass: 0.2 }
  const innerX = useSpring(mouseX, innerSpringConfig)
  const innerY = useSpring(mouseY, innerSpringConfig)

  const colors = ["#C2542D", "#B8963F", "#A84A2A", "#1A1815"]

  const spawnParticle = useCallback((x: number, y: number) => {
    const distance = Math.sqrt(Math.pow(x - lastPosition.current.x, 2) + Math.pow(y - lastPosition.current.y, 2))

    if (distance > 15) {
      const newParticle: Particle = {
        id: particleId.current++,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      setParticles((prev) => [...prev.slice(-15), newParticle])
      lastPosition.current = { x, y }

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 800)
    }
  }, [])

  const spawnInkSplash = useCallback((x: number, y: number) => {
    const newSplash: InkSplash = {
      id: Date.now(),
      x,
      y,
    }
    setInkSplashes((prev) => [...prev, newSplash])

    setTimeout(() => {
      setInkSplashes((prev) => prev.filter((s) => s.id !== newSplash.id))
    }, 600)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX
      let targetY = e.clientY

      const target = e.target as HTMLElement
      const magneticElement = target.closest("[data-magnetic]") as HTMLElement

      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        if (distance < 100) {
          const strength = 0.3
          targetX = e.clientX + (centerX - e.clientX) * strength
          targetY = e.clientY + (centerY - e.clientY) * strength
        }
      }

      mouseX.set(targetX)
      mouseY.set(targetY)

      spawnParticle(e.clientX, e.clientY)

      const isLink = target.closest("a, button, [role='button']")
      const isProjectCard = target.closest("[data-cursor='project']")
      const isGallery = target.closest("[data-cursor='gallery']")
      const isInput = target.closest("input, textarea, select")
      const isText = target.closest("[data-cursor='text']")

      if (isInput) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      if (isProjectCard) {
        setCursorState("project")
        setCursorText("Explore")
      } else if (isGallery) {
        setCursorState("gallery")
        setCursorText("Drag")
      } else if (isText) {
        setCursorState("text")
        setCursorText("Read")
      } else if (isLink) {
        setCursorState("link")
        setCursorText("")
      } else {
        setCursorState("default")
        setCursorText("")
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true)
      spawnInkSplash(e.clientX, e.clientY)
    }

    const handleMouseUp = () => {
      setIsPressed(false)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, spawnParticle, spawnInkSplash])

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null
  }

  return (
    <>
      {/* Particle trail */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[9997] rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: 6,
              height: 6,
              backgroundColor: particle.color,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Ink splash on click - Updated to dark colors */}
      <AnimatePresence>
        {inkSplashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed pointer-events-none z-[9996]"
            style={{
              left: splash.x,
              top: splash.y,
              width: 150,
              height: 150,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >

          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer morphing blob cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorState === "project" || cursorState === "gallery" || cursorState === "text"
              ? 100
              : cursorState === "link"
                ? 60
                : 40,
          height:
            cursorState === "project" || cursorState === "gallery" || cursorState === "text"
              ? 100
              : cursorState === "link"
                ? 60
                : 40,
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 animate-blob-morph"
          style={{
            background:
              cursorState === "project"
                ? "linear-gradient(135deg, rgba(194, 84, 45, 0.95) 0%, rgba(184, 150, 63, 0.95) 100%)"
                : cursorState === "gallery"
                  ? "linear-gradient(135deg, rgba(168, 74, 42, 0.95) 0%, rgba(139, 105, 20, 0.95) 100%)"
                  : cursorState === "text"
                    ? "linear-gradient(135deg, rgba(26, 24, 21, 0.95) 0%, rgba(45, 41, 38, 0.95) 100%)"
                    : cursorState === "link"
                      ? "linear-gradient(135deg, rgba(26, 24, 21, 0.08) 0%, rgba(194, 84, 45, 0.12) 100%)"
                      : "transparent",
            border: cursorState === "default" ? "1.5px solid rgba(26, 24, 21, 0.4)" : "none",
            mixBlendMode: cursorState === "default" ? "normal" : "normal",
          }}
          animate={{
            borderRadius: cursorState === "default" ? "43% 77% 80% 40% / 40% 40% 80% 80%" : "50%",
          }}
          transition={{ duration: 0.3 }}
        />

        {cursorText && (
          <motion.span
            className="relative z-10 text-[10px] uppercase tracking-[0.15em] text-white font-sans font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #C2542D 0%, #B8963F 100%)",
        }}
        animate={{
          width: cursorState === "default" ? 8 : 4,
          height: cursorState === "default" ? 8 : 4,
          opacity:
            isVisible && cursorState !== "project" && cursorState !== "gallery" && cursorState !== "text" ? 1 : 0,
          scale: isPressed ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="fixed pointer-events-none z-[9995] rounded-full"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(26, 24, 21, 0.04) 0%, transparent 70%)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorState === "link" ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
