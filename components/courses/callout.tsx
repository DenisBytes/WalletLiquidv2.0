import { cn } from '@/lib/utils/cn'

export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'tip'
  children: React.ReactNode
}) {
  const styles = {
    info: 'border-accent/50 bg-accent/5',
    warning: 'border-danger/50 bg-danger/5',
    tip: 'border-success/50 bg-success/5',
  }
  const labels = { info: 'Info', warning: 'Warning', tip: 'Tip' }

  return (
    <div className={cn('border-l-2 rounded-r-lg px-4 py-3 my-4', styles[type])}>
      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
        {labels[type]}
      </span>
      <div className="mt-1 text-text-secondary text-sm">{children}</div>
    </div>
  )
}
