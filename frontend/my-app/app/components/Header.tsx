import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Window Sales
        </Link>
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
  )
}

