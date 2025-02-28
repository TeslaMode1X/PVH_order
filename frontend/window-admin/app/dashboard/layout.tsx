"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Phone, Package, Layers, AppWindowIcon as Window, Users, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AuthGuard } from "@/components/auth-guard"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: "Applications",
      href: "/dashboard/applications",
    },
    {
      icon: <Package className="h-4 w-4" />,
      label: "Materials",
      href: "/dashboard/materials",
    },
    {
      icon: <Layers className="h-4 w-4" />,
      label: "Systems",
      href: "/dashboard/systems",
    },
    {
      icon: <Window className="h-4 w-4" />,
      label: "Window Types",
      href: "/dashboard/window-types",
    },
    {
      icon: <Window className="h-4 w-4" />,
      label: "Window Models",
      href: "/dashboard/window-models",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      href: "/dashboard/users",
    },
  ]

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Mobile menu button */}
        <div className="flex h-14 items-center border-b px-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="ml-2 text-lg font-semibold">Window Sales Admin</span>
        </div>

        {/* Sidebar for mobile */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed left-0 top-0 h-full w-3/4 max-w-xs border-r bg-background p-6 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold">Window Sales Admin</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                  />
                ))}
              </nav>

              <div className="absolute bottom-6 left-6 right-6">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // Handle logout
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar for desktop */}
        <div className="hidden w-64 flex-shrink-0 border-r md:block">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <span className="text-lg font-semibold">Window Sales Admin</span>
            </div>
            <div className="flex-1 overflow-auto py-6 px-4">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                  />
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Handle logout
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
