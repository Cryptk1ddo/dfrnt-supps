import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Supplements', href: '/products?category=supplements' },
    { name: 'Blue-Light Glasses', href: '/products?category=blue-light-glasses' },
    { name: 'Nootropics', href: '/products?category=nootropics' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Science', href: '/science' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Terms', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@dfrnt.co', icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-neutral-50">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block group">
              <span className="font-sans text-2xl font-extrabold uppercase tracking-brand text-neutral-50 group-hover:text-accent transition-colors">
                DFRNT
              </span>
            </Link>
            <p className="mt-6 text-sm text-neutral-400 leading-relaxed max-w-xs">
              Empower high-drive individuals to be different with dignity. Science-backed systems for power and autonomy.
            </p>
            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="rounded-lg p-2.5 text-neutral-400 hover:bg-brand-jet-graphite hover:text-accent transition-all duration-200 border border-transparent hover:border-neutral-700"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5 stroke-[2]" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-wide text-accent">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-wide text-accent">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-wide text-accent">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 border-t border-neutral-800 pt-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="mb-3 font-display text-2xl font-bold text-neutral-50">
              Join the DFRNT Community
            </h3>
            <p className="mb-6 text-sm text-neutral-400">
              Exclusive insights, early access to new products, and members-only content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg bg-brand-jet-graphite border border-neutral-700 px-4 py-3 text-sm text-neutral-50 placeholder:text-neutral-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-accent-hover transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} DFRNT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
