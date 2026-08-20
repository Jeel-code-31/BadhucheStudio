"use client"

export function HeroGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(184, 150, 63, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(194, 84, 45, 0.04) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 0% 100%, rgba(139, 105, 20, 0.03) 0%, transparent 30%),
            linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 40%, #FAF7F2 70%, #F5F0E8 100%)
          `,
        }}
      />

      {/* Subtle animated warm glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(184, 150, 63, 0.3) 0%, transparent 70%)",
          animationDuration: "10s",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px] animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(194, 84, 45, 0.25) 0%, transparent 70%)",
          animationDuration: "12s",
          animationDelay: "3s",
        }}
      />

      {/* Additional subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
