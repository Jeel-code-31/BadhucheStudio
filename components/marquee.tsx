export function Marquee() {
  const items = [
    "MONUMENTAL ART",
    "CULTURAL LANDMARKS",
    "PUBLIC INSTALLATIONS",
    "Excellence in Sculptural Art",
    "AIRPORT ART",
    "MUSEUM DESIGN",
    "BRONZE CASTING",
    "SACRED SPACES",
  ]

  return (
    <div className="relative py-16 overflow-hidden bg-[#F5F0E8]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: "var(--gradient-marquee)",
          backgroundSize: "300% 100%",
          animation: "shimmer 10s linear infinite",
        }}
      />
      <div className="animate-marquee whitespace-nowrap flex items-center relative z-10">
        {/* Duplicate for seamless loop */}
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, i) => (
              <div key={`${setIndex}-${i}`} className="flex items-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8B8680] mx-6 text-shimmer">{item}</span>
                {/* Star separator - gold accent */}
                <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#B8963F] mx-2">
                  <path fill="currentColor" d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5z" />
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
