'use client'

import { useState } from "react"
import { Calculator } from "@/components/calculator"
import { ContactForm } from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CallRequestForm } from "@/components/call-request-form"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function CalculatorPage() {
  const [callRequestOpen, setCallRequestOpen] = useState(false)
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Рассчитайте стоимость окон</h1>
            <p className="text-muted-foreground">
              Используйте наш калькулятор для расчета примерной стоимости окон. Для получения точной цены и оформления
              заказа свяжитесь с нашими менеджерами.
            </p>
          </div>
          <Calculator />
          <div className="mt-16 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Свяжитесь с нами</h2>
              <p className="text-muted-foreground mt-2">Для получения точного расчета и оформления заказа</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <a href="tel:+79881499989" className="flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  +7 (988) 149-99-89
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full"
                onClick={() => setCallRequestOpen(true)}
              >
                Заказать звонок
              </Button>
            </div>
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
      <CallRequestForm open={callRequestOpen} onOpenChange={setCallRequestOpen} />
    </div>
  )
}
