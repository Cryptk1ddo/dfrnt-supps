'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/domains/cart/stores/useCartStore'
import { useAuthStore } from '@/domains/auth/stores/useAuthStore'
import { Button } from '@/components/ui/Button'

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Supplements', href: '/products?category=supplements' },
  { name: 'Blue-Light Glasses', href: '/products?category=blue-light-glasses' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemCount = useCartStore((state) => state.itemCount())
  const openCart = useCartStore((state) => state.openCart)
  const { user, signOut, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-black/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo - DFRNT Wordmark */}
        <Link href="/" className="flex items-center group">
          <span className="font-sans text-2xl font-extrabold uppercase tracking-brand text-neutral-50 transition-colors group-hover:text-accent">
            DFRNT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide text-neutral-300 transition-colors hover:text-accent"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* User Icon - unified for signed in and signed out states */}
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="hidden lg:flex text-neutral-300 hover:text-accent hover:bg-brand-jet-graphite"
          >
            <Link href={user ? "/account" : "/auth/login"} aria-label={user ? "Account" : "Sign in"}>
              <User className="h-5 w-5 stroke-[2]" />
            </Link>
          </Button>

          <button
            onClick={openCart}
            className="relative rounded-lg p-2 text-neutral-300 hover:bg-brand-jet-graphite hover:text-accent transition-all duration-200"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5 stroke-[2]" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-md p-2 text-neutral-300 hover:bg-brand-jet-graphite hover:text-accent"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 stroke-[2]" /> : <Menu className="h-6 w-6 stroke-[2]" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-brand-jet-graphite">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:bg-black hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* User account link */}
            <Link
              href={user ? "/account" : "/auth/login"}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:bg-black hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-5 w-5 stroke-[2]" />
              {user ? "Account" : "Sign In"}
            </Link>
            
            {user && (
              <button
                onClick={() => {
                  signOut()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:bg-black hover:text-accent"
              >
                <LogOut className="h-5 w-5 stroke-[2]" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
