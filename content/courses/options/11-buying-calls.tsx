import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Buying Calls</h1>

      <Callout type="info">
        In this chapter, you will learn about buying call options (going long), when to use long calls, practical examples, and the risk/reward profile.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Long and Short Positions</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        You might have heard common terminology thrown around in investing: "long" and "short".
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Going <strong className="font-semibold text-text-primary">long</strong> means purchasing an asset or instrument with the expectation of value increasing. Going <strong className="font-semibold text-text-primary">short</strong> means selling an asset or instrument with the expectation of value decreasing.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Going long</strong> = buying, expecting prices to rise.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Going short</strong> = selling, expecting prices to fall.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Long Call?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="long call">Buying a call option with the expectation that the underlying asset's price will rise above the strike price.</KeyTerm> is when an investor purchases a call option with the hope that the price of the underlying asset will rise above the strike price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If the price increases above the strike price, the holder can exercise or sell back the option to make a profit. If the price doesn't increase above the strike price, the holder can let the option expire and only lose the cost of the premium.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Example: Long Call in Practice</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        John believes that the price of ETH, currently trading at $3,000, will increase in the near future.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Instead of buying ETH outright, John purchases a call option on ETH with a strike price of $3,200, expiring in three months. John pays a premium of $150 for the option.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Three months later, ETH has risen to $3,500. Since John holds a call option with a $3,200 strike price, he can exercise the option and buy ETH at the lower price, then sell it at the market price for a profit.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        John's profit: ($3,500 - $3,200) - $150 premium = <strong className="font-semibold text-text-primary">$150 profit</strong>.
      </p>

      <Callout type="info">
        If the price of the underlying asset <strong className="font-semibold text-text-primary">increases</strong> above the strike price, the holder can exercise or sell back the option to profit.
      </Callout>

      <Callout type="tip">
        If the price <strong className="font-semibold text-text-primary">doesn't</strong> increase above the strike price, the holder lets the option expire and only loses the premium paid. Maximum loss is always limited to the premium.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk/Reward Profile</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Long Call</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Profit</strong></td>
              <td className="py-2 px-3">Unlimited (price can rise indefinitely)</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Loss</strong></td>
              <td className="py-2 px-3">Premium paid</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven</strong></td>
              <td className="py-2 px-3">Strike price + premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Best for</strong></td>
              <td className="py-2 px-3">Bullish outlook</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Buy Calls</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Speculation:</strong> You believe the price will rise significantly before expiration.</li>
        <li><strong className="font-semibold text-text-primary">Leveraged exposure:</strong> You want upside exposure for less capital than buying the underlying directly.</li>
        <li><strong className="font-semibold text-text-primary">Hedging shorts:</strong> If you have a short position, buying calls limits your upside risk.</li>
      </ul>

      <Callout type="warning">
        Long calls have a ticking clock — Theta works against you daily. The underlying needs to move enough to overcome both the strike price difference and the premium paid.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Buying calls is the most basic bullish options strategy. Your maximum risk is limited to the premium paid, while profit potential is theoretically unlimited. The key is getting the direction, magnitude, and timing right.
      </p>

      <Quiz
        question="When a trader enters a 'long call' position, where do they expect the price to go?"
        answers={["Down", "Up", "Sideways"]}
        correctIndex={1}
      />
    </>
  )
}
