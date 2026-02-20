'use client'

import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useUIStore } from '@/lib/stores/ui-store'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils/cn'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/trade/futures': 'Futures Trading',
  '/trade/options': 'Options Trading',
  '/history': 'Trade History',
  '/learn/options': 'Options Course',
  '/learn/futures': 'Futures Course',
}

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (pathname.startsWith('/learn/options/')) return 'Options Course'
  if (pathname.startsWith('/learn/futures/')) return 'Futures Course'
  return ''
}

function formatBalance(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function Topbar() {
  const pathname = usePathname()
  const { user } = useUser()
  const { toggleSidebar } = useUIStore()
  const title = getPageTitle(pathname)

  const balance = 100_000

  return (
    <header
      className={cn(
        'h-16 shrink-0 flex items-center justify-between px-4 lg:px-6',
        'bg-surface border-b border-border'
      )}
    >
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {title && (
          <h1 className="text-[15px] font-semibold text-text-primary">{title}</h1>
        )}
      </div>

      {/* Right: theme toggle + balance + avatar + logout */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border" />

        {/* Balance */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[11px] uppercase tracking-wider text-text-muted leading-none mb-1">
            Balance
          </span>
          <span className="font-numbers text-sm text-text-primary leading-none">
            {formatBalance(balance)}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border" />

        {/* User section */}
        <div className="flex items-center gap-3">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-8 h-8 rounded-full ring-2 ring-border object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full ring-2 ring-border bg-surface-overlay flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.5 14c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/auth/logout"
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-colors"
            title="Log out"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 15.75H3.75a1.5 1.5 0 01-1.5-1.5V3.75a1.5 1.5 0 011.5-1.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 12.75L15.75 9 12 5.25M6.75 9h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
