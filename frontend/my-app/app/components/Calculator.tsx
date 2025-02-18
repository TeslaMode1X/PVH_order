"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Calculator() {
  const [dimensions, setDimensions] = useState({
    width: "",
    height: "",
  })
  const [windowType, setWindowType] = useState("")
  const [profile, setProfile] = useState("")

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the calculation logic
    console.log("Calculating for:", { dimensions, windowType, profile })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Калькулятор стоимости окон</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Ширина (мм)</Label>
              <Input
                id="width"
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions((prev) => ({ ...prev, width: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="height">Высота (мм)</Label>
              <Input
                id="height"
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions((prev) => ({ ...prev, height: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="windowType">Тип окна</Label>
            <Select onValueChange={(value) => setWindowType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип окна" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Одностворчатое</SelectItem>
                <SelectItem value="double">Двустворчатое</SelectItem>
                <SelectItem value="triple">Трехстворчатое</SelectItem>
                <SelectItem value="balcony">Балконный блок</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="profile">Профильная система</Label>
            <Select onValueChange={(value) => setProfile(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите профиль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="euroline">VEKA EUROLINE</SelectItem>
                <SelectItem value="softline">VEKA SOFTLINE</SelectItem>
                <SelectItem value="whs">VEKA WHS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Рассчитать стоимость
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

