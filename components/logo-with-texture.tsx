 "use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { MagneticButton } from "./magnetic-button"

type TextureConfig = {
  texture: "bronze" | "stone" | "weathered-metal" | "gold-leaf" | "marble"
  gradient: string
  accent: string
}

const textureByPath: Array<{ test: (path: string) => boolean; config: TextureConfig }> = [
  {
    test: (path) => path.startsWith("/works"),
    config: {
      texture: "stone",
      gradient: "var(--gradient-bronze)",
      accent: "#8b6914",
    },
  },
  {
    test: (path) => path.startsWith("/process"),
    config: {
      texture: "weathered-metal",
      gradient: "linear-gradient(120deg, #a84a2a, #c2542d, #b8963f)",
      accent: "#c2542d",
    },
  },
  {
    test: (path) => path.startsWith("/contact"),
    config: {
      texture: "gold-leaf",
      gradient: "linear-gradient(135deg, #d4af37, #b8963f, #8b6914)",
      accent: "#b8963f",
    },
  },
  {
    test: (path) => path.startsWith("/recognition") || path.startsWith("/faq"),
    config: {
      texture: "weathered-metal",
      gradient: "linear-gradient(135deg, #a84a2a, #c2542d, #8b6914)",
      accent: "#c2542d",
    },
  },
  {
    test: () => true,
    config: {
      texture: "bronze",
      gradient: "var(--gradient-sunset)",
      accent: "#b8963f",
    },
  },
]

const TEXTURE_SRC: Record<TextureConfig["texture"], string> = {
  bronze: "",
  stone: "",
  "weathered-metal": "",
  "gold-leaf": "/textures/gold-leaf.webp",
  marble: "/textures/marble-white.webp",
}

interface LogoWithTextureProps {
  title?: string
}

/**
 * Large, texture-reactive brand mark for the navbar.
 * Fades between materials per route and adds a subtle glow + hover spacing.
 */
export function LogoWithTexture({ title = "Badhuche" }: LogoWithTextureProps) {
  const pathname = usePathname() || "/"

  const active = useMemo(
    () => textureByPath.find((entry) => entry.test(pathname))?.config ?? textureByPath[textureByPath.length - 1].config,
    [pathname],
  )

  const textureKey = `${active.texture}-${pathname}`

  return (
    <MagneticButton href="/" className="group">
      <motion.span
        key={pathname}
        initial={{ scale: 0.98, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.1, 1] }}
        className="relative inline-flex items-center px-1"
        style={{
          filter: `drop-shadow(0 8px 18px ${active.accent}22)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={textureKey}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative z-10 font-serif text-3xl md:text-3xl tracking-wide transition-all duration-500 group-hover:tracking-[0.06em]"
            style={{
              backgroundImage: `url(${TEXTURE_SRC[active.texture]}), ${active.gradient}`,
              backgroundSize: "cover, 100% 100%",
              backgroundPosition: "center, 0% 50%",
              backgroundBlendMode: "multiply, normal",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </motion.span>
        </AnimatePresence>

        <motion.span
          className="relative ml-2 h-2 w-2 rounded-full"
          style={{ background: active.accent, boxShadow: `0 0 0 0 ${active.accent}60` }}
          animate={{ scale: [1, 1.15, 1], boxShadow: [`0 0 0 0 ${active.accent}60`, `0 0 0 8px ${active.accent}10`, `0 0 0 0 ${active.accent}10`] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>
    </MagneticButton>
  )
}


