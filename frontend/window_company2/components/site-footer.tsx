import { AlertCircle, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">О компании</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              ООО «МАСШТАБ-СТРОЙ СОЧИ», является производственной монтажной компанией по изготовлению и установке металлопластиковых и алюминиевых конструкций, противопожарных конструкций, стеклянных ограждений, роллет и секционных ворот.
            </p>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                      <span className="sr-only">Социальные сети</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Социальные сети компании пока недоступны</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Продукция</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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
                  Противопожарные конструкции
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Стеклянные ограждения
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Роллеты и ворота
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Услуги</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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
                  Установка конструкций
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Контакты</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary flex-shrink-0" />
                <a href="tel:+79881499989" className="hover:text-primary transition-colors">+7 (988) 149-99-89</a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary flex-shrink-0" />
                <a href="mailto:mashtabss@mail.ru" className="hover:text-primary transition-colors break-all">
                  mashtabss@mail.ru
                </a>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-1 text-primary flex-shrink-0" />
                <span>г. Сочи, р-н Хостинский, ул. Дорога на Большой Ахун, 16, кв. 88</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            {new Date().getFullYear()} ООО «МАСШТАБ-СТРОЙ СОЧИ». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
