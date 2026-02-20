import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Buying Puts</h1>

      <Callout type="info">
        In this chapter, you will learn about buying put options (going long puts), when to use them, practical examples, and the risk/reward profile.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Long Put?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="long put">Buying a put option with the expectation that the underlying asset's price will fall below the strike price.</KeyTerm> is when an investor purchases a put option with the hope that the price of the underlying asset will <strong className="font-semibold text-text-primary">fall</strong> below the strike price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If the price decreases below the strike price, the holder can exercise or sell back the option to make a profit. If the price doesn't decrease below the strike price, the holder lets the option expire and only loses the premium.
      </p>

      <Callout type="info">
        A long put is like a long call, but instead of anticipating the price to rise, the trader anticipates the price to <strong className="font-semibold text-text-primary">fall</strong>.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Example: Long Put in Practice</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        John believes that the price of ETH, currently trading at $3,000, will decrease in the near future. Instead of selling his ETH outright, John purchases a put option with a strike price of $2,800 and an expiration date in three months. He pays a premium of $200.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Three months later, ETH has dropped to $2,500. Since John holds a put with a $2,800 strike price, he can exercise the option and sell ETH at the higher price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        John's profit: ($2,800 - $2,500) - $200 premium = <strong className="font-semibold text-text-primary">$100 profit</strong>.
      </p>

      <Callout type="tip">
        If the price <strong className="font-semibold text-text-primary">decreases</strong> below the strike price, the holder can exercise the option for a profit.
      </Callout>

      <Callout type="info">
        If the price <strong className="font-semibold text-text-primary">rises or stagnates</strong>, the holder only loses the premium paid for the option.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk/Reward Profile</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Long Put</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Profit</strong></td>
              <td className="py-2 px-3">Strike price - premium (if price goes to $0)</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Loss</strong></td>
              <td className="py-2 px-3">Premium paid</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven</strong></td>
              <td className="py-2 px-3">Strike price - premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Best for</strong></td>
              <td className="py-2 px-3">Bearish outlook</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Buy Puts</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Speculation on downside:</strong> You believe the price will fall significantly.</li>
        <li><strong className="font-semibold text-text-primary">Portfolio insurance:</strong> You own the underlying and want to protect against a price drop (more on this in the Protective Puts chapter).</li>
        <li><strong className="font-semibold text-text-primary">Hedging:</strong> Buying puts on assets you hold limits your downside risk while preserving upside potential.</li>
      </ul>

      <Callout type="warning">
        Like long calls, long puts face time decay (Theta). The underlying needs to move enough below the strike price to overcome the premium paid. Timing matters.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Buying puts is the most basic bearish options strategy. Your maximum risk is limited to the premium paid, while profit potential is substantial (up to the entire strike price if the asset goes to zero). Long puts are also powerful hedging tools for protecting existing holdings.
      </p>

      <Quiz
        question="When does a trader generally decide to enter a long put position?"
        answers={["Only when they want to speculate on price movements", "When they expect prices to stagnate over the near future", "When they either want insurance for their holdings, or to speculate on prices falling"]}
        correctIndex={2}
      />
    </>
  )
}
