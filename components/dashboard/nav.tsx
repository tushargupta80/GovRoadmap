'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Target, 
  BookOpen, 
  Users,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface DashboardNavProps {
  user: {
    name: string
    email: string
    exam: string
    joinedDate: string
  }
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    // TODO: Implement logout functionality
    router.push('/')
  }

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Roadmap', href: '/dashboard/roadmap', icon: Target },
    { label: 'Mock Tests', href: '/dashboard/tests', icon: BookOpen },
    { label: 'Coaching', href: '/dashboard/coaching', icon: Users },
  ]

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">ClearTechnique</span>
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.exam}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden space-y-2 pt-4 border-t border-border">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm w-full">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-semibold px-4 mb-2">{user.name}</p>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
