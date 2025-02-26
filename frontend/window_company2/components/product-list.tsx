'use client'

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  description: string
  price: string
  features: string[]
}

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader className="flex-none">
            <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg">
              <Image 
                src="/placeholder.svg" 
                alt={product.name} 
                fill 
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
            <CardDescription className="text-base">{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4 mt-auto">
                <p className="text-lg font-semibold text-primary">{product.price}</p>
                <Button size="sm">
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
