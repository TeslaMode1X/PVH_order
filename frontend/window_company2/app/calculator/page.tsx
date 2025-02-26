import { Calculator } from "@/components/calculator"
import { ContactForm } from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CalculatorPage() {
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
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

