import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Услуги</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="relative h-[200px]">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <Link href={service.link} className="text-blue-600 hover:text-blue-700 font-semibold">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const services = [
  {
    title: "Замер окон",
    description: "Профессиональный замер окон с учетом всех особенностей помещения и ваших пожеланий.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/services/measurement",
  },
  {
    title: "Монтаж окон",
    description: "Качественная установка окон в соответствии с технологией и стандартами VEKA.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/services/installation",
  },
  {
    title: "Сервисное обслуживание",
    description: "Регулярное обслуживание и ремонт окон для продления срока их службы.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/services/maintenance",
  },
  {
    title: "Консультации",
    description: "Профессиональные консультации по выбору оконных систем и дополнительных опций.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/services/consultation",
  },
]

