/**
 * Animation timing and easing functions for scroll-based interactions
 */

export const animationTimings = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 700,
} as const

export const easingFunctions = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const

/**
 * Scroll progress utilities
 */
export const calculateScrollProgress = (element: HTMLElement, offset = 0): number => {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top + offset) / (viewportHeight + rect.height)))

  return progress
}

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement, threshold = 0.1): boolean => {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  return (
    rect.top < viewportHeight * (1 - threshold) &&
    rect.bottom > viewportHeight * threshold &&
    rect.left < viewportWidth * (1 - threshold) &&
    rect.right > viewportWidth * threshold
  )
}

/**
 * Staggered animation delays
 */
export const getStaggerDelay = (index: number, baseDelay = 100): number => {
  return index * baseDelay
}

/**
 * Arrow path generators for SVG
 */
export const arrowPaths = {
  straight: "M12 4V20M12 4L8 8M12 4L16 8",
  curved: "M12 4Q12 12 12 20M12 4L8 8M12 4L16 8",
  zigzag: "M12 4L12 8L16 12L12 16L12 20M12 4L8 8M12 4L16 8",
} as const

/**
 * Hotspot animation styles
 */
export const hotspotAnimations = {
  pulse: {
    animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
  },
  bounce: {
    animation: "bounce 1s infinite",
  },
  scale: {
    transition: "transform 0.3s ease-in-out",
    transform: "scale(1)",
    hover: {
      transform: "scale(1.2)",
    },
  },
} as const

/**
 * Calculate position for text based on image hotspot
 */
export const calculateTextPosition = (hotspotX: number, hotspotY: number, imageWidth: number, imageHeight: number) => {
  const isLeftSide = hotspotX < 50
  const isTopHalf = hotspotY < 50

  return {
    align: isLeftSide ? "left" : "right",
    verticalAlign: isTopHalf ? "bottom" : "top",
    arrowDirection: isTopHalf ? "down" : "up",
  }
}

/**
 * Intersection Observer options for scroll triggers
 */
export const intersectionObserverOptions = {
  default: {
    threshold: 0.1,
    rootMargin: "0px",
  },
  lazy: {
    threshold: 0,
    rootMargin: "50px",
  },
  eager: {
    threshold: 0.5,
    rootMargin: "-50px",
  },
} as const
