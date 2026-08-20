"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"

interface ProjectData {
  id: string
  title: string
  slug: string
  image: string
  videoUrl: string
  category: string
}

interface ProjectionGalleryProps {
  initialProjects: ProjectData[]
}

export function ProjectionGallery({ initialProjects }: ProjectionGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return initialProjects
    return initialProjects.filter((project) => project.category === selectedCategory)
  }, [initialProjects, selectedCategory])

  const categories = useMemo(() => {
    return Array.from(new Set(initialProjects.map((p) => p.category)))
  }, [initialProjects])

  if (!initialProjects || initialProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No projection works available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-md transition-all ${
            selectedCategory === null
              ? "bg-[#c2542d] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All Works
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedCategory === category
                ? "bg-[#c2542d] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex flex-col gap-3 rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Media Container - FIXED FIX */}
            <div className="relative w-full aspect-video bg-black overflow-hidden group">
              {project.videoUrl?.includes("mediadelivery.net") ? (
                /* For iframes: We MUST use absolute inset-0 and 100% 
                   to force the player out of that "tiny" box.
                */
                <iframe
                  src={project.videoUrl}
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  src={project.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster={project.image}
                  playsInline
                >
                  <source src={project.videoUrl} type="video/mp4" />
                  <source src={project.videoUrl} type="video/quicktime" />
                </video>
              )}
            </div>

            {/* Project Info */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-[#c2542d] uppercase tracking-wider">
                {project.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}