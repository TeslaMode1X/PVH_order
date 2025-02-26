'use client'

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      author: "Анна Иванова",
      rating: 5,
      date: "2024-02-15",
      text: "Отличные окна! Установили быстро и качественно. Очень довольна работой компании.",
      image: "/placeholder.svg",
      product: "Rexay Premium",
    },
    {
      id: 2,
      author: "Петр Сидоров",
      rating: 4,
      date: "2024-02-10",
      text: "Хорошее качество окон, но немного задержали сроки доставки. В целом доволен результатом.",
      image: "/placeholder.svg",
      product: "Brusbox Standard",
    },
    {
      id: 3,
      author: "Мария Петрова",
      rating: 5,
      date: "2024-02-05",
      text: "Заказывала окна для всей квартиры. Очень понравилось отношение к клиентам и качество работы.",
      image: "/placeholder.svg",
      product: "Краус Премиум",
    },
    {
      id: 4,
      author: "Александр Николаев",
      rating: 5,
      date: "2024-02-01",
      text: "Профессиональный подход к работе. Замерщик приехал вовремя, все подробно рассказал и посоветовал оптимальный вариант.",
      image: "/placeholder.svg",
      product: "Алютех Премиум",
    },
    {
      id: 5,
      author: "Елена Смирнова",
      rating: 4,
      date: "2024-01-28",
      text: "Качественные окна, хорошая шумоизоляция. Монтаж выполнен аккуратно.",
      image: "/placeholder.svg",
      product: "Rexay Classic",
    },
    {
      id: 6,
      author: "Дмитрий Козлов",
      rating: 5,
      date: "2024-01-25",
      text: "Заказывал противопожарные окна для офиса. Все сертификаты предоставили, монтаж выполнили по регламенту.",
      image: "/placeholder.svg",
      product: "Краус FireStop",
    },
  ]

  return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-12">
            <h1 className="text-4xl font-bold mb-8">Отзывы</h1>
            {/* Ваш код для отображения отзывов */}
          </div>
        </main>
        <SiteFooter />
      </div>
  )
}
