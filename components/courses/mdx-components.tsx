import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils/cn'
import { Quiz } from './quiz'
import { PayoffDiagram } from './payoff-diagram'
import { PriceSimulator } from './price-simulator'
import { GreeksVisualizer } from './greeks-visualizer'

function Callout({
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

function KeyTerm({
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

export const mdxComponents: MDXComponents = {
  PayoffDiagram,
  PriceSimulator,
  GreeksVisualizer,
  Quiz,
  Callout,
  KeyTerm,
  h1: (props) => (
    <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-semibold text-text-primary mt-6 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-medium text-text-primary mt-4 mb-2"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-surface-overlay px-1.5 py-0.5 rounded text-accent"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-overlay rounded-xl p-4 overflow-x-auto mb-4 text-sm"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent/50 pl-4 italic text-text-muted my-4"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  a: (props) => (
    <a className="text-accent hover:text-accent-hover underline" {...props} />
  ),
}
