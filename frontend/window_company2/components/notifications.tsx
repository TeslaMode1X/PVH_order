"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
          <span className="sr-only">Уведомления</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Уведомления</h4>
            <Button variant="ghost" size="sm">
              Отметить все как прочитанные
            </Button>
          </div>
          <div className="space-y-2">
            <Card className="p-4">
              <p className="text-sm font-medium">Ваш заказ готов</p>
              <p className="text-sm text-muted-foreground">Заказ #12345 готов к доставке</p>
              <p className="text-xs text-muted-foreground mt-2">2 часа назад</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-medium">Новая акция</p>
              <p className="text-sm text-muted-foreground">Скидка 20% на все окна до конца месяца</p>
              <p className="text-xs text-muted-foreground mt-2">1 день назад</p>
            </Card>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

