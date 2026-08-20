"use client"
                                                      
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  const currentImage = images[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "z" || e.key === "Z") setIsZoomed(!isZoomed)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isZoomed, onClose])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }, [images.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#1A1815]/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-[#FAF7F2]" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-[#FAF7F2]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-[#FAF7F2]" />
          </button>
        </>
      )}

      {/* Zoom toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsZoomed(!isZoomed)
        }}
        className="absolute bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 transition-colors"
        aria-label={isZoomed ? "Zoom out" : "Zoom in"}
      >
        {isZoomed ? (
          <ZoomOut className="w-5 h-5 text-[#FAF7F2]" />
        ) : (
          <ZoomIn className="w-5 h-5 text-[#FAF7F2]" />
        )}
      </button>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-6 text-[#FAF7F2] text-sm font-mono">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`relative ${isZoomed ? "w-full h-full" : "max-h-[80vh]"}`}>
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1920}
              height={1080}
              className={`object-contain w-full h-full ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={() => setIsZoomed(!isZoomed)}
              priority
            />
          </div>
          
          {/* Caption */}
          {currentImage.caption && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#C7C2BC] text-sm mt-4 max-w-2xl text-center"
            >
              {currentImage.caption}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

interface LightboxTriggerProps {
  images: LightboxImage[]
  index?: number
  children: React.ReactNode
  className?: string
}

export function LightboxTrigger({ images, index = 0, children, className }: LightboxTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
        aria-label="Open image in lightbox"
      >
        {children}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <Lightbox
            images={images}
            initialIndex={index}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}



