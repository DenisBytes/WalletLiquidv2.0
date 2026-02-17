export interface Analytics {
  winRate: number
  profitFactor: number
  maxDrawdown: number
  sharpeRatio: number
  totalTrades: number
  winningTrades: number
  losingTrades: number
}

interface TradeInput {
  pnl: string | null
  action: string
  executedAt: Date
}

const CLOSED_ACTIONS = ['CLOSE', 'LIQUIDATION', 'STOP_LOSS', 'TAKE_PROFIT', 'EXERCISE']
const STARTING_BALANCE = 100000

function getClosedTrades(trades: TradeInput[]): { pnl: number }[] {
  return trades
    .filter((t) => CLOSED_ACTIONS.includes(t.action) && t.pnl != null)
    .map((t) => ({ pnl: parseFloat(t.pnl!) }))
}

export function calculateWinRate(trades: TradeInput[]): number {
  const closed = getClosedTrades(trades)
  if (closed.length === 0) return 0
  const wins = closed.filter((t) => t.pnl > 0).length
  return wins / closed.length
}

export function calculateProfitFactor(trades: TradeInput[]): number {
  const closed = getClosedTrades(trades)
  if (closed.length === 0) return 0

  const grossProfit = closed.reduce((sum, t) => sum + (t.pnl > 0 ? t.pnl : 0), 0)
  const grossLoss = closed.reduce((sum, t) => sum + (t.pnl < 0 ? Math.abs(t.pnl) : 0), 0)

  if (grossLoss === 0) return grossProfit > 0 ? Infinity : 0
  return grossProfit / grossLoss
}

export function calculateMaxDrawdown(
  trades: TradeInput[],
  startingBalance = STARTING_BALANCE
): number {
  const closed = getClosedTrades(trades)
  if (closed.length === 0) return 0

  let equity = startingBalance
  let peak = startingBalance
  let maxDrawdown = 0

  for (const trade of closed) {
    equity += trade.pnl
    if (equity > peak) peak = equity
    const drawdown = peak - equity
    if (drawdown > maxDrawdown) maxDrawdown = drawdown
  }

  return maxDrawdown
}

export function calculateSharpeRatio(
  trades: TradeInput[],
  riskFreeAnnual = 0.05
): number {
  const closed = getClosedTrades(trades)
  if (closed.length < 2) return 0

  const returns = closed.map((t) => t.pnl)
  const mean = returns.reduce((s, r) => s + r, 0) / returns.length
  const variance =
    returns.reduce((s, r) => s + (r - mean) ** 2, 0) / (returns.length - 1)
  const stddev = Math.sqrt(variance)

  if (stddev === 0) return 0

  const periodsPerYear = 250
  const riskFreePerPeriod = riskFreeAnnual / periodsPerYear
  const excessReturn = mean - riskFreePerPeriod

  return (excessReturn / stddev) * Math.sqrt(periodsPerYear)
}

export function calculateAnalytics(
  trades: TradeInput[],
  startingBalance = STARTING_BALANCE
): Analytics {
  const closed = getClosedTrades(trades)
  const wins = closed.filter((t) => t.pnl > 0).length
  const losses = closed.filter((t) => t.pnl <= 0).length

  return {
    winRate: calculateWinRate(trades),
    profitFactor: calculateProfitFactor(trades),
    maxDrawdown: calculateMaxDrawdown(trades, startingBalance),
    sharpeRatio: calculateSharpeRatio(trades),
    totalTrades: closed.length,
    winningTrades: wins,
    losingTrades: losses,
  }
}
