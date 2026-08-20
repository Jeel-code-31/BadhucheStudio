import Image from "next/image"
import { TextReveal } from "./text-reveal"
import { ImageReveal } from "./image-reveal"

interface AlternatingContentProps {
  title: string
  content: string
  imageSrc: string
  imageAlt: string
  imagePosition?: "left" | "right"
}

export function AlternatingContent({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: AlternatingContentProps) {
  const isImageRight = imagePosition === "right"

  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-10 items-center">
      <div className={`${isImageRight ? "md:order-1" : "md:order-2"} space-y-6`}>
        <TextReveal>
          <h2 className="oh-headline text-3xl md:text-4xl">{title}</h2>
        </TextReveal>
        <TextReveal delay={100}>
          <p className="oh-body text-lg leading-relaxed">{content}</p>
        </TextReveal>
      </div>
      <div className={isImageRight ? "md:order-2" : "md:order-1"}>
        <ImageReveal 
          src={imageSrc}
          alt={imageAlt}
          direction={isImageRight ? "right" : "left"}
          className="w-full aspect-[4/3] object-cover"
        />
      </div>
    </div>
  )
}

interface PullQuoteProps {
  quote: string
  author?: string
  role?: string
}

export function PullQuote({ quote, author, role }: PullQuoteProps) {
  return (
    <TextReveal>
      <blockquote className="my-16 md:my-24 text-center max-w-4xl mx-auto">
        <div className="relative">
          <span className="absolute -top-6 -left-4 text-8xl text-[#C2542D] opacity-10 font-serif">"</span>
          <p className="oh-headline text-2xl md:text-3xl lg:text-4xl leading-relaxed relative z-10">
            {quote}
          </p>
        </div>
        {(author || role) && (
          <footer className="mt-8">
            {author && <cite className="oh-body text-lg not-italic">{author}</cite>}
            {role && <span className="oh-label block mt-2">({role})</span>}
          </footer>
        )}
      </blockquote>
    </TextReveal>
  )
}

interface StatCalloutProps {
  stats: Array<{
    value: string
    label: string
    suffix?: string
  }>
}

export function StatCallout({ stats }: StatCalloutProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
      {stats.map((stat, index) => (
        <TextReveal key={index} delay={index * 50}>
          <div className="text-center">
            <div className="oh-headline text-4xl md:text-5xl text-[#C2542D] mb-2">
              {stat.value}
              {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
            </div>
            <div className="oh-label">{stat.label}</div>
          </div>
        </TextReveal>
      ))}
    </div>
  )
}

interface VideoEmbedProps {
  src: string
  title: string
  aspectRatio?: "16/9" | "21/9" | "4/3"
}

export function VideoEmbed({ src, title, aspectRatio = "16/9" }: VideoEmbedProps) {
  const aspectClass = {
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
    "4/3": "aspect-[4/3]",
  }[aspectRatio]

  return (
    <div className={`relative w-full ${aspectClass} bg-[#1A1815] overflow-hidden`}>
      <video
        src={src}
        controls
        className="w-full h-full object-cover"
        title={title}
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

interface LocationMapProps {
  title: string
  address: string
  mapUrl?: string
}

export function LocationMap({ title, address, mapUrl }: LocationMapProps) {
  return (
    <div className="grid md:grid-cols-2 gap-10 my-16">
      <TextReveal>
        <div className="space-y-4">
          <h3 className="oh-headline text-2xl">{title}</h3>
          <p className="oh-body text-lg whitespace-pre-line">{address}</p>
        </div>
      </TextReveal>
      {mapUrl && (
        <div className="aspect-square w-full bg-[#E8E4DD] overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${title}`}
          />
        </div>
      )}
    </div>
  )
}

interface StaggeredGalleryProps {
  images: Array<{
    src: string
    alt: string
    size?: "small" | "medium" | "large"
  }>
}

export function StaggeredGallery({ images }: StaggeredGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => {
        const sizeClass = {
          small: "row-span-1",
          medium: "row-span-2",
          large: "col-span-2 row-span-2",
        }[image.size || "small"]

        return (
          <div key={index} className={`relative ${sizeClass} aspect-square`}>
            <ImageReveal 
              src={image.src}
              alt={image.alt}
              delay={index * 50}
              className="w-full h-full object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
