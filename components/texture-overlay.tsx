import type React from "react"
import { cn } from "@/lib/utils"

type TextureName =
  | "paper"
  | "canvas"
  | "stone"
  | "bronze"
  | "weathered-metal"
  | "gold-leaf"
  | "marble"

const TEXTURE_MAP: Record<TextureName, string> = {
  paper: "/textures/paper-texture.png",
  canvas: "/textures/canvas-texture.png",
  stone: "",
  bronze: "",
  "weathered-metal": "",
  "gold-leaf": "/textures/gold-leaf.webp",
  marble: "/textures/marble-white.webp",
}

interface TextureOverlayProps {
  /** Named texture key or direct URL */
  texture?: TextureName | string
  /** Overall opacity of the texture overlay */
  opacity?: number
  /** CSS blend mode used to mix the texture into the layer below */
  blendMode?: React.CSSProperties["mixBlendMode"]
  /** Enable gentle morph animation (uses existing blob animation utilities) */
  animated?: boolean
  /** Optional className for positioning and sizing */
  className?: string
  /** Background size (e.g., 'cover', 'contain', '200px') */
  size?: string
  /** Background repeat behavior */
  repeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y"
}

/**
 * Reusable texture overlay to layer subtle materiality across sections.
 * Keeps pointer-events disabled and uses `will-change` for performant fades/morphs.
 */
export function TextureOverlay({
  texture = "paper",
  opacity = 0.12,
  blendMode = "multiply",
  animated = false,
  className,
  size = "auto",
  repeat = "repeat",
}: TextureOverlayProps) {
  const src = TEXTURE_MAP[texture as TextureName] ?? texture
  if (!src) return null

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        animated && "animate-blob-morph animate-blob-gradient",
        className,
      )}
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: repeat,
        backgroundSize: size,
        mixBlendMode: blendMode,
        opacity,
        willChange: animated ? "transform, opacity" : "opacity",
      }}
    />
  )
}


