'use client'

import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Calculator, Phone } from "lucide-react"
import { CallRequestForm } from "@/components/call-request-form"
import { useState } from "react"

const productCategories = [
  {
    title: "ПВХ окна",
    items: [
      {
        title: "Rexay",
        href: "/products/pvh", // Изменено с /products/pvh/rexay
        description: "Премиальные окна с высокой энергоэффективностью",
      },
      {
        title: "Brusbox",
        href: "/products/pvh", // Изменено с /products/pvh/brusbox
        description: "Надежные окна для любых помещений",
      },
    ],
  },
  {
    title: "Алюминиевые окна",
    items: [
      {
        title: "Краус",
        href: "/products/aluminum", // Изменено с /products/aluminum/kraus
        description: "Современные алюминиевые окна",
      },
      {
        title: "Алютех",
        href: "/products/aluminum", // Изменено с /products/aluminum/alutech
        description: "Премиальные алюминиевые системы",
      },
    ],
  },
  {
    title: "Противопожарные окна",
    items: [
      {
        title: "Краус Противопожарный",
        href: "/products/fire", // Изменено с /products/fire/kraus
        description: "Алюминиевые противопожарные системы",
      },
    ],
  },
]

export function SiteHeader() {
  const [isCallFormOpen, setIsCallFormOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Window Company</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 px-4">Продукция</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    {productCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="mb-2 text-sm font-medium leading-none">{category.title}</h3>
                        <div className="grid gap-2">
                          {category.items.map((item) => (
                            <Link key={item.title} href={item.href} legacyBehavior passHref>
                              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                              </NavigationMenuLink>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 px-4">Услуги</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    <Link href="/services/measurement" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Замер окон</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Профессиональный замер с учетом всех особенностей помещения
                        </p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/services/installation" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Установка окон</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Качественный монтаж окон с гарантией до 5 лет
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/calculator" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Calculator className="mr-2 h-4 w-4" />
                    Калькулятор
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <a href="tel:+78001234567" className="text-sm font-medium hover:text-primary transition-colors">
              8 (800) 123-45-67
            </a>
          </div>
          <Button variant="ghost" onClick={() => setIsCallFormOpen(true)}>
            Заказать звонок
          </Button>
          <CallRequestForm open={isCallFormOpen} onOpenChange={setIsCallFormOpen} />
        </div>
      </div>
    </header>
  )
}
