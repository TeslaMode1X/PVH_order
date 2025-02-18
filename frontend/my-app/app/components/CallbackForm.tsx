"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"

export default function CallbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Here would be the API call to submit the form
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    setIsSubmitting(false)
    // Reset form and show success message
    setFormData({ name: "", phone: "" })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Phone className="h-5 w-5 mr-2" />
          Заказать звонок
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Заказать звонок</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

