'use client'

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductList } from "@/components/product-list"

const categories = {
  pvh: {
    title: "ПВХ окна",
    description: "Качественные окна из ПВХ профиля",
    products: [
      {
        id: "rexay-classic",
        name: "Rexay Classic",
        description: "Надежные окна для типовых помещений",
        price: "от 5000 ₽/м²",
        features: ["5-камерный профиль", "Двухкамерный стеклопакет", "Базовая фурнитура"],
      },
      {
        id: "rexay-premium",
        name: "Rexay Premium",
        description: "Премиальные окна с повышенной шумоизоляцией",
        price: "от 7000 ₽/м²",
        features: ["6-камерный профиль", "Энергосберегающий стеклопакет", "Противовзломная фурнитура"],
      },
      {
        id: "brusbox-standard",
        name: "Brusbox Standard",
        description: "Экономичное решение для любых помещений",
        price: "от 4500 ₽/м²",
        features: ["4-камерный профиль", "Однокамерный стеклопакет", "Базовая фурнитура"],
      },
      {
        id: "brusbox-premium",
        name: "Brusbox Premium",
        description: "Премиальные окна с энергосбережением",
        price: "от 6500 ₽/м²",
        features: ["6-камерный профиль", "Двухкамерный стеклопакет", "Улучшенная фурнитура"],
      },
    ],
  },
  aluminum: {
    title: "Алюминиевые окна",
    description: "Современные алюминиевые конструкции",
    products: [
      {
        id: "kraus-standard",
        name: "Краус Стандарт",
        description: "Надежные алюминиевые окна",
        price: "от 7000 ₽/м²",
        features: ["Холодный профиль", "Однокамерный стеклопакет", "Базовая фурнитура"],
      },
      {
        id: "kraus-premium",
        name: "Краус Премиум",
        description: "Премиальные алюминиевые конструкции",
        price: "от 9000 ₽/м²",
        features: ["Теплый профиль", "Двухкамерный стеклопакет", "Премиальная фурнитура"],
      },
      {
        id: "alutech-eco",
        name: "Алютех Эконом",
        description: "Доступные алюминиевые решения",
        price: "от 6500 ₽/м²",
        features: ["Холодный профиль", "Однокамерный стеклопакет", "Стандартная фурнитура"],
      },
      {
        id: "alutech-premium",
        name: "Алютех Премиум",
        description: "Премиальные окна с термомостом",
        price: "от 8500 ₽/м²",
        features: ["Теплый профиль с термомостом", "Двухкамерный стеклопакет", "Противовзломная фурнитура"],
      },
    ],
  },
  fire: {
    title: "Противопожарные окна",
    description: "Алюминиевые противопожарные конструкции",
    products: [
      {
        id: "kraus-firestop",
        name: "Краус FireStop",
        description: "Противопожарные окна с классом EI-30",
        price: "от 12000 ₽/м²",
        features: ["Огнестойкость 30 минут", "Специальный противопожарный профиль", "Огнеупорный стеклопакет"],
      },
      {
        id: "kraus-fireblock",
        name: "Краус FireBlock",
        description: "Противопожарные окна с классом EI-60",
        price: "от 15000 ₽/м²",
        features: [
          "Огнестойкость 60 минут",
          "Усиленный противопожарный профиль",
          "Многослойный огнеупорный стеклопакет",
        ],
      },
    ],
  },
}

export default function ProductCategoryPage({ params }: { params: { category: string } }) {
  const category = categories[params.category as keyof typeof categories]

  if (!category) {
    return <div>Категория не найдена</div>
  }

  const breadcrumbs = [{ title: "Продукция", href: "/products" }, { title: category.title }]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{category.title}</h1>
            <p className="text-lg text-muted-foreground">{category.description}</p>
          </div>

          <ProductList products={category.products} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
