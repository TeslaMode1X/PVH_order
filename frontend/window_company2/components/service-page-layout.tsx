'use client'

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { CallRequestForm } from "./call-request-form"

interface ServicePageLayoutProps {
  title: string
  description: string
  features: { title: string; description: string }[]
  imageUrl: string
  children?: React.ReactNode
}

export function ServicePageLayout({ title, description, features, imageUrl, children }: ServicePageLayoutProps) {
  const [isCallFormOpen, setIsCallFormOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
              <p className="text-lg text-muted-foreground mb-8">{description}</p>
              <Button size="lg" onClick={() => setIsCallFormOpen(true)}>
                Заказать услугу
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Content */}
          {children}

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mt-16">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
      <CallRequestForm open={isCallFormOpen} onOpenChange={setIsCallFormOpen} />
    </div>
  )
}
