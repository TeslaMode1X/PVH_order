'use client'

import { ServicePageLayout } from "@/components/service-page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Ruler, Clock, User, Calculator, FileText } from "lucide-react"

const features = [
  {
    title: "Профессиональный замер",
    description: "Точные измерения всех параметров окон с учетом особенностей проема и фасада здания",
  },
  {
    title: "Бесплатная консультация",
    description: "Подробная консультация по выбору профиля, стеклопакета и дополнительных опций",
  },
  {
    title: "Расчет стоимости",
    description: "Предварительный расчет стоимости окон и монтажных работ на месте",
  },
  {
    title: "Выезд в удобное время",
    description: "Замерщик приедет в удобное для вас время, включая выходные дни",
  },
  {
    title: "Учет всех нюансов",
    description: "Оценка состояния проемов, особенностей монтажа и необходимых подготовительных работ",
  },
  {
    title: "Документальное оформление",
    description: "Составление официального замерного листа для производства окон",
  },
]

const measurementSteps = [
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Согласование времени",
    description: "Согласование удобного для вас времени визита специалиста"
  },
  {
    icon: <User className="h-6 w-6 text-primary" />,
    title: "Выезд специалиста",
    description: "Наш специалист приезжает на объект в назначенное время"
  },
  {
    icon: <Ruler className="h-6 w-6 text-primary" />,
    title: "Проведение измерений",
    description: "Тщательное измерение всех необходимых параметров"
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Консультация",
    description: "Профессиональная консультация по выбору оптимального решения"
  },
  {
    icon: <Calculator className="h-6 w-6 text-primary" />,
    title: "Расчет стоимости",
    description: "Предварительный расчет стоимости изделий и монтажа"
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Оформление документов",
    description: "Составление подробного замерного листа"
  }
]

export default function MeasurementPage() {
  return (
    <ServicePageLayout
      title="Профессиональный замер окон"
      description="Точные замеры - основа качественной установки окон. Наши специалисты проведут профессиональный замер с учетом всех особенностей вашего помещения и предоставят подробную консультацию по выбору оптимального решения."
      features={features}
      imageUrl="/images/services/measurement.jpg"
    >
      <div className="space-y-12">
        {/* Почему важен профессиональный замер */}
        <section className="bg-muted/30 rounded-2xl p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-center">
            Почему важен профессиональный замер?
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Профессиональный замер окон - это не просто измерение габаритов оконного проема. Это комплексная услуга,
              включающая в себя оценку состояния проема, особенностей фасада, типа здания и множества других факторов,
              влияющих на выбор конструкции и способ монтажа.
            </p>
          </div>
        </section>

        {/* Как проходит замер */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-center">
            Как проходит замер?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {measurementSteps.map((step, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Заключение */}
        <section className="bg-primary/5 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed">
              После проведения замера вы получите полную информацию о подходящих вариантах окон и их стоимости. 
              Это поможет вам принять взвешенное решение о покупке.
            </p>
          </div>
        </section>
      </div>
    </ServicePageLayout>
  )
}
