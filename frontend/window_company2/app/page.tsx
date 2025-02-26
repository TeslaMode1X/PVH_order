import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Качественные окна для вашего дома
                </h1>
                <p className="text-lg text-muted-foreground mt-6 max-w-[600px]">
                  Создайте комфортное пространство с нашими современными окнами. Широкий выбор материалов и
                  профессиональный монтаж.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <Link href="/calculator">
                      Рассчитать стоимость
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/products">Каталог продукции</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative w-full aspect-square max-w-[500px]">
                <Image
                  src="/placeholder.svg"
                  alt="Window showcase"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/50 py-16 sm:py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Качественные материалы",
                  description: "Используем только сертифицированные профили и фурнитуру от ведущих производителей",
                },
                {
                  title: "Профессиональный монтаж",
                  description: "Опытные специалисты выполнят установку окон с соблюдением всех технологий",
                },
                {
                  title: "Гарантия качества",
                  description: "Предоставляем гарантию на все виды работ и материалы до 5 лет",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-background">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Готовы обсудить ваш проект?
                </h2>
                <p className="text-lg mb-8 text-primary-foreground/90">
                  Наши специалисты помогут подобрать оптимальное решение под ваши задачи и бюджет
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="tel:+78001234567" className="flex items-center">
                      <Phone className="mr-2 h-5 w-5" />
                      8 (800) 123-45-67
                    </a>
                  </Button>
                  <Button size="lg" variant="secondary">
                    Заказать звонок
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
