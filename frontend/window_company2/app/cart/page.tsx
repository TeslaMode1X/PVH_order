"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CartPage() {
  const [quantity, setQuantity] = useState("1")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Корзина</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Пример товара в корзине */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24">
                        <Image src="/placeholder.svg" alt="Окно" fill className="rounded-lg object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold">Окно Rexay Classic</h3>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Размер: 1500x1500 мм</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setQuantity((prev) => Math.max(1, Number.parseInt(prev) - 1).toString())}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setQuantity((prev) => (Number.parseInt(prev) + 1).toString())}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="font-semibold">15 000 ₽</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Оформление заказа</CardTitle>
                  <CardDescription>Заполните данные для оформления заказа</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Товары:</span>
                      <span>15 000 ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка:</span>
                      <span>1 000 ₽</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Итого:</span>
                      <span>16 000 ₽</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Оформить заказ</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

