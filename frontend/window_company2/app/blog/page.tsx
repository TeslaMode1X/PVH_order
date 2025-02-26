'use client'

import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function BlogPage() {

    const posts = [
        {
            id: 1,
            title: "Как выбрать окна для квартиры",
            description: "Полное руководство по выбору окон: материалы, характеристики, цены",
            date: "2024-02-20",
            image: "/placeholder.svg",
            category: "Советы",
        },
        {
            id: 2,
            title: "Преимущества алюминиевых окон",
            description: "Разбираем основные преимущества алюминиевых окон перед ПВХ",
            date: "2024-02-15",
            image: "/placeholder.svg",
            category: "Технологии",
        },
        {
            id: 3,
            title: "Уход за окнами зимой",
            description: "Советы по уходу за окнами в холодное время года",
            date: "2024-02-10",
            image: "/placeholder.svg",
            category: "Обслуживание",
        },
        {
            id: 4,
            title: "Энергоэффективные окна: что это такое",
            description: "Разбираемся в технологиях энергосбережения современных окон",
            date: "2024-02-05",
            image: "/placeholder.svg",
            category: "Технологии",
        },
        {
            id: 5,
            title: "Как правильно проветривать помещение",
            description: "Рекомендации по организации правильной вентиляции в доме",
            date: "2024-02-01",
            image: "/placeholder.svg",
            category: "Советы",
        },
        {
            id: 6,
            title: "Противовзломная фурнитура для окон",
            description: "Обзор современных систем безопасности для окон",
            date: "2024-01-25",
            image: "/placeholder.svg",
            category: "Безопасность",
        },
        {
            id: 7,
            title: "Шумоизоляция окон: основные способы",
            description: "Как улучшить звукоизоляцию окон в городской квартире",
            date: "2024-01-20",
            image: "/placeholder.svg",
            category: "Технологии",
        },
        {
            id: 8,
            title: "Выбор москитной сетки",
            description: "Виды москитных сеток и их особенности",
            date: "2024-01-15",
            image: "/placeholder.svg",
            category: "Аксессуары",
        },
        {
            id: 9,
            title: "Как подготовить окна к зиме",
            description: "Пошаговая инструкция по подготовке окон к холодному сезону",
            date: "2024-01-10",
            image: "/placeholder.svg",
            category: "Обслуживание",
        },
    ]



    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <div className="container py-12">
                    <h1 className="text-4xl font-bold mb-8">Блог</h1>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.id}`}>
                                <article className="group cursor-pointer">
                                    <div className="relative aspect-video mb-4">
                                        <Image
                                            src={post.image || "/placeholder.svg"}
                                            alt={post.title}
                                            fill
                                            className="rounded-lg object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <span>{new Date(post.date).toLocaleDateString("ru-RU")}</span>
                                        <span>•</span>
                                        <span>{post.category}</span>
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
