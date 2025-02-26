import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

const categories = [
  {
    id: "pvh",
    title: "ПВХ окна",
    description: "Качественные окна из ПВХ профиля для жилых и коммерческих помещений",
    image: "/placeholder.svg",
    brands: ["Rexay", "Brusbox"],
  },
  {
    id: "aluminum",
    title: "Алюминиевые окна",
    description: "Современные алюминиевые конструкции для фасадов и интерьеров",
    image: "/placeholder.svg",
    brands: ["Краус", "Алютех"],
  },
  {
    id: "fire",
    title: "Противопожарные окна",
    description: "Специализированные противопожарные конструкции для безопасности",
    image: "/placeholder.svg",
    brands: ["Краус FireStop", "Краус FireBlock"],
  },
]

export default function ProductsPage() {
  const breadcrumbs = [{ title: "Продукция" }]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Каталог продукции</h1>
            <p className="text-lg text-muted-foreground">
              Широкий выбор окон и конструкций для любых задач. От классических ПВХ окон до специализированных
              противопожарных решений.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/products/${category.id}`} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Бренды: {category.brands.join(", ")}
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
