import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">О компании VEKA</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Мировой лидер в производстве ПВХ-профиля</h2>
          <p className="mb-4">
            VEKA AG – один из крупнейших в мире производителей оконных и дверных систем из ПВХ. Компания была основана в
            1969 году Генрихом Лауманном в городе Зенденхорст, Германия.
          </p>
          <p className="mb-4">
            Сегодня VEKA представлена в более чем 40 странах мира и имеет производственные площадки в Германии, России,
            США, Великобритании, Франции, Польше, Китае, Индии и Испании.
          </p>
        </div>
        <div className="relative h-[300px]">
          <Image
            src="/placeholder.svg?height=300&width=500"
            alt="VEKA производство"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {advantages.map((advantage, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
            <p>{advantage.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const advantages = [
  {
    title: "Качество",
    description:
      "Все профильные системы VEKA соответствуют самым высоким стандартам качества и имеют все необходимые сертификаты.",
  },
  {
    title: "Инновации",
    description:
      "Компания постоянно инвестирует в разработку новых технологий и совершенствование существующих продуктов.",
  },
  {
    title: "Экология",
    description: "VEKA заботится об окружающей среде и использует экологически чистые технологии производства.",
  },
]

