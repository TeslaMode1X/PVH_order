import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface Breadcrumb {
  title: string
  href?: string
}

interface BreadcrumbsProps {
  items: Breadcrumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link 
        href="/" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Главная</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.title}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
