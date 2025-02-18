import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image src={product.image || "/placeholder.svg"} alt={product.name} width={300} height={200} className="w-full" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${product.price}</span>
          <Link href={`/catalog/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

