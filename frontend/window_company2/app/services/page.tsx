import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Наши услуги</h1>
            <p className="text-muted-foreground">
              Мы предлагаем полный комплекс услуг по производству, установке и обслуживанию окон
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="relative w-full aspect-video mb-4">
                  <Image src="/placeholder.svg" alt="Замер окон" fill className="rounded-lg object-cover" />
                </div>
                <CardTitle>Бесплатный замер</CardTitle>
                <CardDescription>
                  Наш специалист приедет в удобное для вас время, произведет замеры и проконсультирует по всем вопросам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Заказать замер
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative w-full aspect-video mb-4">
                  <Image src="/placeholder.svg" alt="Производство окон" fill className="rounded-lg object-cover" />
                </div>
                <CardTitle>Производство окон</CardTitle>
                <CardDescription>
                  Изготавливаем окна любой сложности на современном оборудовании с использованием качественных
                  материалов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Рассчитать стоимость
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative w-full aspect-video mb-4">
                  <Image src="/placeholder.svg" alt="Монтаж окон" fill className="rounded-lg object-cover" />
                </div>
                <CardTitle>Монтаж окон</CardTitle>
                <CardDescription>
                  Профессиональная установка окон с соблюдением всех технологических требований и ГОСТов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Узнать подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative w-full aspect-video mb-4">
                  <Image src="/placeholder.svg" alt="Отделка откосов" fill className="rounded-lg object-cover" />
                </div>
                <CardTitle>Отделка откосов</CardTitle>
                <CardDescription>Качественная отделка откосов с использованием современных материалов</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Узнать подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative w-full aspect-video mb-4">
                  <Image src="/placeholder.svg" alt="Ремонт окон" fill className="rounded-lg object-cover" />
                </div>
                <CardTitle>Ремонт окон</CardTitle>
                <CardDescription>
                  Ремонт и обслуживание окон любой сложности, замена фурнитуры и уплотнителей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Вызвать мастера
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative w-full aspect-video mb-4">
                  <Image src="/placeholder.svg" alt="Дополнительные услуги" fill className="rounded-lg object-cover" />
                </div>
                <CardTitle>Дополнительные услуги</CardTitle>
                <CardDescription>Установка подоконников, москитных сеток, жалюзи и других аксессуаров</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Узнать подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

