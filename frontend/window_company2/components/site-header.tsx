'use client'

import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Calculator, Menu, Phone, X } from "lucide-react"
import { CallRequestForm } from "@/components/call-request-form"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">МАСШТАБ-СТРОЙ СОЧИ</span>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:block">
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
        </div>

        <div className="flex items-center gap-4">
          {/* Phone number - visible only on desktop */}
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <a href="tel:+79881499989" className="text-sm font-medium hover:text-primary transition-colors">
              +7 (988) 149-99-89
            </a>
          </div>
          
          {/* Call request button - visible only on desktop */}
          <Button variant="ghost" onClick={() => setIsCallFormOpen(true)} className="hidden md:flex">
            Заказать звонок
          </Button>
          
          {/* Mobile menu button - visible only on mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] pt-10">
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Продукция</h3>
                  {productCategories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">{category.title}</h4>
                      <div className="grid gap-1">
                        {category.items.map((item) => (
                          <Link 
                            key={item.title} 
                            href={item.href} 
                            className="text-sm py-1 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Услуги</h3>
                  <div className="grid gap-1">
                    <Link 
                      href="/services/measurement" 
                      className="text-sm py-1 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Замер окон
                    </Link>
                    <Link 
                      href="/services/installation" 
                      className="text-sm py-1 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Установка окон
                    </Link>
                  </div>
                </div>
                
                <Link 
                  href="/calculator" 
                  className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Калькулятор
                </Link>
                
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <a href="tel:+79881499989" className="text-sm font-medium hover:text-primary transition-colors">
                      +7 (988) 149-99-89
                    </a>
                  </div>
                  <Button onClick={() => {
                    setIsOpen(false);
                    setIsCallFormOpen(true);
                  }}>
                    Заказать звонок
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <CallRequestForm open={isCallFormOpen} onOpenChange={setIsCallFormOpen} />
        </div>
      </div>
    </header>
  )
}
