"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Calculator() {
  const [windowType, setWindowType] = useState("single")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [profile, setProfile] = useState("")
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  const calculatePrice = () => {
    // Здесь должна быть реальная логика расчета цены
    const basePrice = 5000
    const widthNum = Number.parseFloat(width)
    const heightNum = Number.parseFloat(height)

    if (isNaN(widthNum) || isNaN(heightNum)) return

    const area = (widthNum * heightNum) / 10000 // перевод в м²
    let price = basePrice * area

    // Коэффициенты в зависимости от типа окна
    const typeMultiplier =
      {
        single: 1,
        double: 1.5,
        triple: 2,
      }[windowType] || 1

    // Коэффициенты в зависимости от профиля
    const profileMultiplier =
      {
        economy: 1,
        standard: 1.2,
        premium: 1.5,
      }[profile] || 1

    price *= typeMultiplier * profileMultiplier

    setTotalPrice(Math.round(price))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Калькулятор стоимости окон</CardTitle>
        <CardDescription>
          Рассчитайте примерную стоимость окон. Для получения точной цены, пожалуйста, свяжитесь с нашими менеджерами.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Тип окна</Label>
          <RadioGroup value={windowType} onValueChange={setWindowType} className="grid grid-cols-3 gap-4">
            <Label
              htmlFor="single"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="single" id="single" className="sr-only" />
              <span>Одностворчатое</span>
            </Label>
            <Label
              htmlFor="double"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="double" id="double" className="sr-only" />
              <span>Двустворчатое</span>
            </Label>
            <Label
              htmlFor="triple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="triple" id="triple" className="sr-only" />
              <span>Трехстворчатое</span>
            </Label>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Ширина (см)</Label>
            <Input
              id="width"
              type="number"
              placeholder="Например: 100"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Высота (см)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Например: 150"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile">Профиль</Label>
          <Select value={profile} onValueChange={setProfile}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите профиль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Эконом</SelectItem>
              <SelectItem value="standard">Стандарт</SelectItem>
              <SelectItem value="premium">Премиум</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculatePrice} className="w-full">
          Рассчитать стоимость
        </Button>

        {totalPrice && (
          <div className="text-center pt-4">
            <p className="text-lg font-semibold">Примерная стоимость:</p>
            <p className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</p>
            <p className="text-sm text-muted-foreground mt-2">
              * Окончательная цена может отличаться в зависимости от дополнительных опций и условий монтажа
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

