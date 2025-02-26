import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ТОО МАСШТАБ-СТРОЙ СОЧИ - Производство и установка окон",
  description: "Качественные ПВХ и алюминиевые окна в Сочи. Производство, продажа и установка.",
  generator: 'v0.dev'
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