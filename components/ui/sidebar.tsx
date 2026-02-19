'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/lib/stores/ui-store'
import { cn } from '@/lib/utils/cn'

const navigation = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Futures',
    href: '/trade/futures',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 14l4-4 3 3 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 5h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Options',
    href: '/trade/options',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'History',
    href: '/history',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Learn',
    href: '/learn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5A1.5 1.5 0 014.5 3h3A1.5 1.5 0 019 4.5v11a.5.5 0 01-.854.354A2.5 2.5 0 006 15a2.5 2.5 0 00-2.146.854A.5.5 0 013 15.5v-11z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 4.5A1.5 1.5 0 0015.5 3h-3A1.5 1.5 0 0011 4.5v11a.5.5 0 00.854.354A2.5 2.5 0 0114 15a2.5 2.5 0 012.146.854A.5.5 0 0017 15.5v-11z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[240px] flex flex-col',
          'bg-[#0A0A0F]/80 backdrop-blur-xl border-r border-border',
          'transition-transform duration-300 ease-out',
          'lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-border-subtle shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L2 6v6l7 4 7-4V6L9 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2 6l7 4m0 0l7-4m-7 4v7" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-text-primary font-semibold text-[15px] tracking-tight">
            WalletLiquid
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-accent/15 text-white shadow-[0_0_20px_rgba(124,92,252,0.15)]'
                    : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
                )}
              >
                <span
                  className={cn(
                    'shrink-0 transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-text-muted'
                  )}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4">
          <div className="px-3 py-3 rounded-lg bg-surface-overlay/50 border border-border-subtle">
            <p className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
              Paper Trading
            </p>
            <p className="text-[12px] text-text-secondary mt-0.5">
              All trades are simulated
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
