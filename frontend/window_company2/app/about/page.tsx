import Image from "next/image"
import { Award, CheckCircle2, Users } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Обновляем информацию о компании
export default function AboutPage() {
  const companyInfo = {
    founded: 2010,
    employees: 50,
    completedProjects: 5000,
    windowsInstalled: 15000,
    certifications: [
      {
        title: "ISO 9001:2015",
        description: "Сертификат системы менеджмента качества",
      },
      {
        title: "ГОСТ Р 56926-2016",
        description: "Сертификат соответствия на окна и двери",
      },
      {
        title: "ПБ 01-2014",
        description: "Сертификат пожарной безопасности",
      },
      {
        title: "EAC",
        description: "Сертификат соответствия Таможенного союза",
      },
    ],
    advantages: [
      {
        title: "Собственное производство",
        description: "Полный контроль качества на всех этапах производства",
      },
      {
        title: "Профессиональный монтаж",
        description: "Сертифицированные специалисты с опытом работы от 5 лет",
      },
      {
        title: "Гарантия качества",
        description: "Предоставляем гарантию до 5 лет на продукцию и монтаж",
      },
    ],
    partners: ["Rexay", "Brusbox", "Краус", "Алютех", "Rehau", "VEKA"],
    history: [
      {
        year: 2010,
        event: "Основание компании",
      },
      {
        year: 2012,
        event: "Открытие собственного производства",
      },
      {
        year: 2015,
        event: "Получение сертификата ISO 9001",
      },
      {
        year: 2018,
        event: "Расширение производственных мощностей",
      },
      {
        year: 2020,
        event: "Запуск производства противопожарных конструкций",
      },
      {
        year: 2023,
        event: "Открытие нового демонстрационного зала",
      },
    ],
  }
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-6">О компании ТОО "МАСШТАБ-СТРОЙ СОЧИ"</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Мы являемся ведущим производителем и установщиком окон в Сочи, предлагая широкий выбор ПВХ и
                  алюминиевых конструкций высокого качества.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">10+</div>
                    <div className="text-sm text-muted-foreground">Лет на рынке</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                    <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">15000+</div>
                    <div className="text-sm text-muted-foreground">Установленных окон</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg"
                  alt="О компании"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Качество</h3>
                <p className="text-muted-foreground">
                  Используем только сертифицированные материалы и комплектующие от проверенных производителей
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Профессионализм</h3>
                <p className="text-muted-foreground">
                  Наши специалисты регулярно проходят обучение и имеют большой опыт работы
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Гарантия</h3>
                <p className="text-muted-foreground">Предоставляем гарантию на все наши изделия и выполненные работы</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Наши сертификаты</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] relative">
                  <Image src="/placeholder.svg" alt={`Сертификат ${i}`} fill className="rounded-lg object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

