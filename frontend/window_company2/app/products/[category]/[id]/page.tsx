import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  // В реальном приложении данные будут загружаться из API
  const product = {
    id: params.id,
    name: "Окно Rexay Classic",
    description: "Надежные окна для типовых помещений с отличными характеристиками теплосбережения и шумоизоляции.",
    price: "от 5000 ₽/м²",
    features: ["Профиль класса А", "Энергосберегающий стеклопакет", "Фурнитура премиум-класса", "Гарантия 5 лет"],
    specifications: {
      profile: "5-камерный профиль",
      glass: "Двухкамерный стеклопакет 40 мм",
      soundproofing: "до 32 дБ",
      thermalResistance: "0.72 м²°С/Вт",
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <Link href={`/products/${params.category}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к каталогу
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">{product.price}</p>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full">
                  Заказать
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  Рассчитать стоимость
                </Button>
              </div>

              <Card className="mt-8">
                <CardContent className="p-6">
                  <Tabs defaultValue="specs">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="specs">Характеристики</TabsTrigger>
                      <TabsTrigger value="delivery">Доставка</TabsTrigger>
                    </TabsList>
                    <TabsContent value="specs" className="mt-4">
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Профиль</dt>
                          <dd className="font-medium">{product.specifications.profile}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Стеклопакет</dt>
                          <dd className="font-medium">{product.specifications.glass}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Шумоизоляция</dt>
                          <dd className="font-medium">{product.specifications.soundproofing}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Сопротивление теплопередаче</dt>
                          <dd className="font-medium">{product.specifications.thermalResistance}</dd>
                        </div>
                      </dl>
                    </TabsContent>
                    <TabsContent value="delivery" className="mt-4">
                      <div className="space-y-4">
                        <p>Доставка осуществляется по всему региону.</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Бесплатная доставка при заказе от 50 000 ₽</li>
                          <li>Срок доставки: 3-5 рабочих дней</li>
                          <li>Подъем на этаж оплачивается отдельно</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

