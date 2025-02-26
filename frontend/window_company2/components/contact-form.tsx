"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Здесь должен быть API запрос
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Имитация запроса
      toast({
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      })
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Свяжитесь с нами</CardTitle>
        <CardDescription>Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Сообщение</Label>
            <Textarea id="message" name="message" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

