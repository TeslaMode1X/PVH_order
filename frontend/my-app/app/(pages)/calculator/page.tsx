import Calculator from "@/app/components/Calculator"

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Калькулятор стоимости окон VEKA</h1>
      <div className="max-w-2xl mx-auto">
        <Calculator />
      </div>
    </div>
  )
}

