import { Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Контакты</h1>
            <p className="text-muted-foreground">
              Свяжитесь с нами любым удобным способом или оставьте заявку, и мы перезвоним вам
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Телефон</h3>
              <p className="text-center text-muted-foreground">
                <a href="tel:+78001234567" className="hover:text-foreground">
                  8 (800) 123-45-67
                </a>
                <br />
                Ежедневно с 9:00 до 21:00
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-center text-muted-foreground">
                <a href="mailto:info@example.com" className="hover:text-foreground">
                  info@example.com
                </a>
                <br />
                Ответим в течение 24 часов
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Адрес</h3>
              <p className="text-center text-muted-foreground">
                г. Сочи, ул. Примерная, д. 123
                <br />
                Пн-Пт: 9:00-18:00
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ContactForm />
            </div>
            <div className="h-[400px] bg-muted rounded-lg">
              {/* Здесь должна быть карта */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Карта с местоположением
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

