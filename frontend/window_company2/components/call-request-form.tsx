'use client'

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CallRequestFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CallRequestForm({ open, onOpenChange }: CallRequestFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically send the data to your backend
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setName("")
    setPhone("")
    setIsSubmitting(false)
    onOpenChange(false)
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Заказать звонок</DialogTitle>
          <DialogDescription>
            Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Номер телефона</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 999-99-99"
              required
              pattern="\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
            />
            <p className="text-sm text-muted-foreground">
              Формат: +7 (999) 999-99-99
            </p>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
