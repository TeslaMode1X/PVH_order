'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  author: string
  image: string
  category: string
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    // Имитация загрузки данных
    const mockPost: BlogPost = {
      id: params.id,
      title: "Как выбрать окна для квартиры",
      content: `
        <p>Выбор окон для квартиры - ответственный процесс, от которого зависит комфорт вашего дома на долгие годы. В этой статье мы рассмотрим основные критерии выбора окон и поможем вам принять правильное решение.</p>
        
        <h2>1. Тип профиля</h2>
        <p>Первое, на что стоит обратить внимание - это материал профиля. Наиболее популярные варианты:</p>
        <ul>
          <li>ПВХ профиль - самый распространенный вариант</li>
          <li>Алюминиевый профиль - для панорамного остекления</li>
          <li>Деревянный профиль - для ценителей натуральных материалов</li>
        </ul>

        <h2>2. Стеклопакет</h2>
        <p>От количества камер в стеклопакете зависит теплоизоляция окна:</p>
        <ul>
          <li>Однокамерный - для теплых регионов</li>
          <li>Двухкамерный - оптимальный вариант для большинства случаев</li>
          <li>Трехкамерный - для регионов с суровым климатом</li>
        </ul>
      `,
      date: "2024-02-20",
      author: "Иван Петров",
      image: "/placeholder.svg",
      category: "Советы",
    }

    setPost(mockPost)
  }, [params.id])

  if (!post) {
    return (
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="container py-12">
              <div className="max-w-3xl mx-auto">
                <div className="animate-pulse">
                  <div className="h-8 w-32 bg-muted rounded mb-6" />
                  <div className="aspect-video bg-muted rounded-lg mb-8" />
                  <div className="h-4 w-full bg-muted rounded mb-4" />
                  <div className="h-4 w-3/4 bg-muted rounded mb-8" />
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-5/6 bg-muted rounded" />
                    <div className="h-4 w-4/6 bg-muted rounded" />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <SiteFooter />
        </div>
    )
  }

  return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <article className="container py-12">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад к блогу
                </Button>
              </Link>

              <div className="relative aspect-video mb-8">
                <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="rounded-lg object-cover"
                    priority
                />
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString("ru-RU")}</span>
                <span>•</span>
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight mb-8">{post.title}</h1>

              <div
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </main>
        <SiteFooter />
      </div>
  )
}