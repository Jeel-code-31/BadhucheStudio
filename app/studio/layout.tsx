import type { ReactNode } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import "../globals.css"

// Override root layout - studio gets its own minimal HTML structure
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
