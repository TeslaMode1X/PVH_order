'use client'

import { ServicePageLayout } from "@/components/service-page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle, 
  Settings, 
  Clock, 
  Shield, 
  Wrench,
  FileText,
  AlertCircle,
  Star,
  Hammer
} from "lucide-react"

const features = [
  {
    title: "Профессиональный монтаж",
    description: "Установка окон в соответствии с ГОСТ и современными технологиями монтажа",
  },
  {
    title: "Опытные мастера",
    description: "Работы выполняют сертифицированные специалисты с опытом от 5 лет",
  },
  {
    title: "Гарантия качества",
    description: "Предоставляем гарантию на монтажные работы до 5 лет",
  },
  {
    title: "Комплексный подход",
    description: "Демонтаж старых окон, установка новых, отделка откосов и уборка мусора",
  },
  {
    title: "Современные материалы",
    description: "Использование качественных монтажных материалов от проверенных производителей",
  },
  {
    title: "Чистота и порядок",
    description: "Защита помещения во время работ и уборка после завершения монтажа",
  },
]

const installationSteps = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: "Подготовительные работы",
    description: "Защита помещения, демонтаж старых окон, подготовка оконных проемов"
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: "Монтаж оконной конструкции",
    description: "Установка окна по уровню, крепление анкерными болтами, монтаж подоконника"
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: "Герметизация",
    description: "Заполнение монтажной пеной, установка паро- и гидроизоляционных материалов"
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Отделочные работы",
    description: "Установка откосов, герметизация швов, финишная отделка"
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: "Пусконаладка",
    description: "Регулировка фурнитуры, проверка работы створок, очистка окон"
  }
]

const benefits = [
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    text: "Строгое соблюдение технологии монтажа"
  },
  {
    icon: <Star className="h-6 w-6 text-primary" />,
    text: "Использование качественных материалов"
  },
  {
    icon: <Wrench className="h-6 w-6 text-primary" />,
    text: "Опытные монтажники с профессиональным инструментом"
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    text: "Выполнение работ в согласованные сроки"
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    text: "Официальная гарантия на работы"
  },
  {
    icon: <AlertCircle className="h-6 w-6 text-primary" />,
    text: "Доступные цены"
  }
]

export default function InstallationPage() {
  return (
    <ServicePageLayout
      title="Профессиональная установка окон"
      description="Качественный монтаж окон - залог их долгой службы. Наши специалисты выполнят установку окон любой сложности с соблюдением всех технологических требований и гарантией качества."
      features={features}
      imageUrl="/images/services/installation.jpg"
    >
      <div className="space-y-16">
        {/* Этапы монтажа окон */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Этапы монтажа окон
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {installationSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Соединительная линия между шагами */}
                {index < installationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-muted" />
                )}
                <Card className="relative z-10 h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="mb-4 p-4 bg-primary/10 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Гарантия качества */}
        <section className="bg-muted/30 rounded-2xl p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <Shield className="h-24 w-24 text-primary" />
            </div>
            <div className="md:w-3/4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Гарантия качества
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы предоставляем гарантию на все монтажные работы сроком до 5 лет. В течение гарантийного срока мы бесплатно
                устраним любые недостатки, связанные с качеством монтажа.
              </p>
            </div>
          </div>
        </section>

        {/* Почему выбирают нас */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
            Почему выбирают нас?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <p className="text-base sm:text-lg">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ServicePageLayout>
  )
}
