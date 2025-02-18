import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone, Calculator, MapPin, ChevronDown, ArrowLeft } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Москва</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-sm hover:text-blue-600">
                Покупателям
              </Link>
              <Link href="#" className="text-sm hover:text-blue-600">
                Партнёрам и дилерам
              </Link>
              <Link href="#" className="text-sm hover:text-blue-600">
                Дизайнерам и архитекторам
              </Link>
              <Link href="#" className="text-sm hover:text-blue-600">
                VEKA и экология
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              VEKA
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="text-sm text-gray-500">Круглосуточно, бесплатно</div>
                <div className="text-xl font-semibold">8 (800) 302-20-05</div>
              </div>

              <button className="hidden md:flex items-center space-x-2 px-4 py-2 border rounded hover:bg-gray-50">
                <Calculator className="h-5 w-5" />
                <span>Калькулятор</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <Phone className="h-5 w-5" />
                <span>Заказать звонок</span>
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-6 mt-4">
            <Link href="#" className="flex items-center text-sm hover:text-blue-600">
              Решения для загородного дома
              <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
            <Link href="#" className="flex items-center text-sm hover:text-blue-600">
              Комплектующие
              <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
            <Link href="#" className="flex items-center text-sm hover:text-blue-600">
              Помощь покупателю
              <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
            <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Где купить
            </Link>
            <Link href="#" className="flex items-center text-sm hover:text-blue-600">
              О компании
              <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="VEKA windows"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-8">
            Покупайте окна и двери у официальных партнеров компании VEKA
          </h1>
          <button className="bg-blue-600 text-white px-8 py-3 rounded w-fit hover:bg-blue-700">Где купить</button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
            <ArrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Продукция VEKA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative h-80 mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Пластиковые окна VEKA"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Пластиковые окна VEKA</h3>
              <Link href="#" className="text-blue-600 group-hover:text-blue-700">
                Подробнее
              </Link>
            </div>
            <div className="group">
              <div className="relative h-80 mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Решения для загородного дома"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Решения для загородного дома</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Панорамные двери
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Раздвижные окна для веранды и террасы
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    E-Slide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Подъёмно-раздвижные двери VEKАMOTION
                  </Link>
                </li>
              </ul>
            </div>
            <div className="group">
              <div className="relative h-80 mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Входные двери VEKA"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Входные двери VEKA</h3>
              <Link href="#" className="text-blue-600 group-hover:text-blue-700">
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VEKA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему выбирают VEKA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Новости и статьи</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <Link href={item.link} className="text-blue-600 hover:text-blue-700">
                    Читать далее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Наши партнеры</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="relative h-20">
                  <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const advantages = [
  {
    title: "Качество",
    description: "Профиль высшего качества класса А",
  },
  {
    title: "Надежность",
    description: "Более 50 лет на рынке",
  },
  {
    title: "Гарантия",
    description: "10 лет гарантии на профиль",
  },
  {
    title: "Экологичность",
    description: "Безопасные материалы",
  },
]

const news = [
  {
    title: "Новая система окон VEKA",
    date: "15.02.2024",
    excerpt: "Представляем инновационную систему окон с улучшенными характеристиками...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/news/1",
  },
  {
    title: "Экологическая инициатива VEKA",
    date: "10.02.2024",
    excerpt: "VEKA запускает программу по переработке старых окон...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/news/2",
  },
  {
    title: "Расширение производства",
    date: "05.02.2024",
    excerpt: "Открытие нового производственного комплекса VEKA в России...",
    image: "/placeholder.svg?height=200&width=300",
    link: "/news/3",
  },
]

const partners = [
  { name: "Partner 1", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Partner 2", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Partner 3", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Partner 4", logo: "/placeholder.svg?height=100&width=200" },
]

