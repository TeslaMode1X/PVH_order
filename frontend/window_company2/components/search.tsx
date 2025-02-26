"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function Search() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground">
          <SearchIcon className="mr-2 h-4 w-4" />
          Поиск...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Поиск по сайту..." />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup heading="Продукция">
              <CommandItem>ПВХ окна</CommandItem>
              <CommandItem>Алюминиевые окна</CommandItem>
              <CommandItem>Противопожарные окна</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Услуги">
              <CommandItem>Замер</CommandItem>
              <CommandItem>Монтаж</CommandItem>
              <CommandItem>Ремонт</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

