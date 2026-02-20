export function KeyTerm({
  term,
  children,
}: {
  term: string
  children: React.ReactNode
}) {
  return (
    <span className="relative group cursor-help border-b border-dotted border-accent text-accent">
      {term}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs bg-surface-overlay border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 text-text-secondary text-center">
        {children}
      </span>
    </span>
  )
}
