import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О компании</h3>
            <p className="text-muted-foreground mb-6">
              ТОО "МАСШТАБ-СТРОЙ СОЧИ" - ведущий производитель окон в Сочи. Мы предлагаем широкий выбор ПВХ и
              алюминиевых окон высокого качества.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Продукция</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products/pvh" className="text-muted-foreground hover:text-primary transition-colors">
                  ПВХ окна
                </Link>
              </li>
              <li>
                <Link href="/products/aluminum" className="text-muted-foreground hover:text-primary transition-colors">
                  Алюминиевые окна
                </Link>
              </li>
              <li>
                <Link href="/products/fire" className="text-muted-foreground hover:text-primary transition-colors">
                  Противопожарные окна
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Калькулятор стоимости
                </Link>
              </li>
              <li>
                <Link href="/services/measurement" className="text-muted-foreground hover:text-primary transition-colors">
                  Бесплатный замер
                </Link>
              </li>
              <li>
                <Link href="/services/installation" className="text-muted-foreground hover:text-primary transition-colors">
                  Установка окон
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a href="tel:+78001234567" className="hover:text-primary transition-colors">8 (800) 123-45-67</a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href="mailto:info@windowcompany.ru" className="hover:text-primary transition-colors">
                  info@windowcompany.ru
                </a>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-primary" />
                <span>г. Сочи, ул. Примерная, д. 123</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Window Company. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
