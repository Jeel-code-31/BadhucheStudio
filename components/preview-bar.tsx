"use client"

import { usePathname } from "next/navigation"

export function PreviewBar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] bg-[#C2542D] text-[#FAF7F2] py-3 px-6 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#FAF7F2] animate-pulse" />
        <span className="text-sm font-medium">Preview Mode Active</span>
        <span className="text-xs opacity-75">Viewing draft content</span>
      </div>
      <a
        href={`/api/preview/disable?redirect=${pathname}`}
        className="text-sm px-4 py-2 bg-[#FAF7F2] text-[#C2542D] hover:bg-[#FAF7F2]/90 transition-colors duration-200 font-medium"
      >
        Exit Preview
      </a>
    </div>
  )
}



