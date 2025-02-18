import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "PVC Window Classic",
    description: "Standard PVC window for residential use",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Aluminum Sliding Window",
    description: "Modern aluminum sliding window",
    price: 499,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Energy Efficient Window",
    description: "High-performance window for energy savings",
    price: 599,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Catalog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Window Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={200}
              className="w-full"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price}</span>
                <Link
                  href={`/catalog/${product.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

