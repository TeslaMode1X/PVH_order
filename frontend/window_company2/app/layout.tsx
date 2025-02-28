import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ООО «МАСШТАБ-СТРОЙ СОЧИ» - Производство и установка окон",
  description: "Производственная монтажная компания по изготовлению и установке металлопластиковых и алюминиевых конструкций, противопожарных конструкций, стеклянных ограждений, роллет и секционных ворот.",
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="antialiased">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}