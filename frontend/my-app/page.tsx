import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold">Window Sales</span>
          <ul className="flex space-x-4">
            <li>
              <Link href="/catalog">Catalog</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-12">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Window Sales</h1>
            <p className="text-xl mb-8">High-quality PVC and aluminum windows for your home and office</p>
            <div className="flex justify-center space-x-4">
              <Link href="/catalog" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                View Catalog
              </Link>
              <Link href="#calculator" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                Calculate Price
              </Link>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Quality"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">High Quality</h2>
              <p>Our windows are made from the finest materials for durability and energy efficiency.</p>
            </div>
            <div className="text-center">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Installation"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">Professional Installation</h2>
              <p>Our expert team ensures perfect installation for optimal performance.</p>
            </div>
            <div className="text-center">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Warranty"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">10-Year Warranty</h2>
              <p>We stand behind our products with a comprehensive 10-year warranty.</p>
            </div>
          </section>

          <section id="calculator">
            <h2 className="text-2xl font-bold mb-4">Calculate Your Window Price</h2>
            <p>Price calculator will be implemented here.</p>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>123 Window Street, City, Country</p>
              <p>Phone: +1 234 567 8900</p>
              <p>Email: info@windowsales.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/catalog">Catalog</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-300">
                  Facebook
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  Twitter
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Window Sales Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

