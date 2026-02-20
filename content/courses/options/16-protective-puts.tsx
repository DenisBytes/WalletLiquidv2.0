import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Protective Puts</h1>

      <Callout type="info">
        In this chapter, you will learn about the protective put strategy — how to use puts as insurance for your portfolio, when it makes sense, and the trade-offs involved.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Protective Put?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="protective put">An options strategy where you buy a put option on an asset you already own to limit downside risk.</KeyTerm> is a strategy where an investor <strong className="font-semibold text-text-primary">owns</strong> an asset and <strong className="font-semibold text-text-primary">buys</strong> a put option on it to protect against a decline in price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Think of it as buying insurance for your crypto holdings. You pay a premium for the protection, and if the price drops below the strike, the put option offsets your losses.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How It Works</h2>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Own the underlying asset</strong> (e.g., 10 ETH at $1,500 each = $15,000)</li>
        <li><strong className="font-semibold text-text-primary">Buy a put option</strong> with a strike price at or near the current price (e.g., $1,500 strike)</li>
        <li><strong className="font-semibold text-text-primary">Pay the premium</strong> (e.g., $200 per ETH = $2,000 total)</li>
      </ol>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario A: Price drops to $1,200</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Without the put, you&apos;d lose $3,000 (10 ETH x $300 drop). With the put, you can exercise and sell at $1,500. Your only loss is the $2,000 premium.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario B: Price rises to $1,800</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Your ETH is worth $18,000 — a $3,000 gain. The put expires worthless, so your net profit is $3,000 - $2,000 premium = $1,000.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario C: Price stays at $1,500</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        The put expires worthless. You lose only the $2,000 premium. Your ETH holdings are unchanged.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk/Reward Profile</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Protective Put</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Profit</strong></td>
              <td className="py-2 px-3">Unlimited (underlying can rise indefinitely)</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Loss</strong></td>
              <td className="py-2 px-3">(Purchase price - strike price) + premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven</strong></td>
              <td className="py-2 px-3">Purchase price + premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Best for</strong></td>
              <td className="py-2 px-3">Bullish long-term, worried about short-term downside</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        If the price drops below the strike, the put option will give you the right to sell your asset at the strike price, effectively limiting your losses.
      </Callout>

      <Callout type="info">
        If the price rises, you still profit from your holdings — having only paid the option premium to protect your assets.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Use Protective Puts</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Before major events:</strong> Protocol upgrades, regulatory announcements, or macro events that could cause sharp drops.</li>
        <li><strong className="font-semibold text-text-primary">Locking in gains:</strong> If your asset has appreciated significantly and you want to protect unrealized profits.</li>
        <li><strong className="font-semibold text-text-primary">Long-term holding with short-term concern:</strong> You&apos;re bullish overall but worried about near-term volatility.</li>
      </ul>

      <Callout type="warning">
        The cost of protection (premium) reduces your returns. If the price doesn&apos;t drop, you&apos;ve paid for insurance you didn&apos;t need. Consider whether the premium cost is justified by the risk.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Choosing the Strike Price</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">ATM strike</strong> — Maximum protection, highest premium cost. You&apos;re fully insured from the current price.</li>
        <li><strong className="font-semibold text-text-primary">Slightly OTM strike</strong> — Cheaper premium, but you absorb the initial loss between current price and strike. Like a deductible on an insurance policy.</li>
        <li><strong className="font-semibold text-text-primary">Deep OTM strike</strong> — Very cheap, but only protects against catastrophic drops.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Protective Put vs Stop-Loss</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A common alternative to protective puts is placing a stop-loss order. But they have key differences:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Protective puts</strong> guarantee your exit price. Even in a flash crash, you can sell at the strike.</li>
        <li><strong className="font-semibold text-text-primary">Stop-loss orders</strong> can be slipped in fast-moving markets. You might get filled well below your intended exit.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Protective puts are the options equivalent of portfolio insurance. They preserve unlimited upside while capping downside at the strike price. The trade-off is the premium cost, which is a drag on returns if the protection isn&apos;t needed. Best used selectively around high-risk events or to lock in significant gains.
      </p>

      <Quiz
        question="What is the maximum loss when using a protective put?"
        answers={["The entire value of the underlying asset", "The difference between purchase price and strike price, plus the premium paid", "Only the premium paid"]}
        correctIndex={1}
      />
    </>
  )
}
