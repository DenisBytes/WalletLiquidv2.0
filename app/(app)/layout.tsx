import { auth0 } from '@/lib/auth0'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/ui/sidebar'
import { Topbar } from '@/components/ui/topbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth0.getSession()
  if (!session) redirect('/auth/login')

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
