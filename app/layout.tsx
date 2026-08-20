import type React from "react"
import type { Viewport } from "next"
import { Marcellus, Jost, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
