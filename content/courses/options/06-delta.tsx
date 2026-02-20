import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Delta</h1>

      <Callout type="info">
        In this chapter, you will take a deep dive into Delta — how it works for calls and puts, its relationship with other Greeks, and practical applications.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Delta</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Delta">Measures the rate of change in the option price relative to a $1 change in the underlying asset price.</KeyTerm> measures the rate of change in an option&apos;s price with respect to changes in the price of the underlying asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Specifically, Delta measures the sensitivity of an option&apos;s price to a $1 change in the price of the underlying asset, serving as a proxy for the option&apos;s exposure to the underlying price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If you have a Bitcoin option, the Delta tells you how much the price of that option is expected to change for each $1 change in the price of Bitcoin. A Delta of 0.6 for a Bitcoin call option suggests that for every $1 increase in Bitcoin price, the option&apos;s price might increase by approximately $0.60.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Delta for Calls and Puts</h2>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Call Options:</strong> A Delta between 0 and 1 indicates the percentage change in the call option&apos;s price for a $1 increase in the underlying.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Put Options:</strong> A Delta between -1 and 0 represents the percentage change for a $1 decrease in the underlying.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Delta and Moneyness</h2>

      <p className="text-text-secondary leading-relaxed mb-4">Delta is closely related to moneyness:</p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Deep ITM calls</strong> have Deltas approaching 1.0 — they move almost dollar-for-dollar with the underlying.</li>
        <li><strong className="font-semibold text-text-primary">ATM calls</strong> have Deltas near 0.5 — they move roughly half as much as the underlying.</li>
        <li><strong className="font-semibold text-text-primary">Deep OTM calls</strong> have Deltas approaching 0 — they barely move when the underlying changes.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        For puts, the same logic applies but with negative values (-1 for deep ITM puts, -0.5 for ATM, approaching 0 for deep OTM).
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Delta as a Probability Proxy</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Traders often use Delta as a rough estimate of the probability that an option will expire in-the-money. A call option with a Delta of 0.30 has approximately a 30% chance of expiring ITM.
      </p>

      <Callout type="warning">
        This is an approximation, not an exact probability. Delta-based probability estimates are more useful for quick mental models than for precise calculations.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Delta and Gamma Interaction</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Gamma is the rate of change of Delta. For options that are at-the-money, Gamma is typically at its peak. This means that as the underlying price moves, the Delta of ATM options will change more rapidly than those that are deep ITM or OTM.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This can lead to larger position adjustments for traders trying to maintain a <KeyTerm term="Delta-neutral">A strategy where the total Delta of a portfolio is zero, meaning the portfolio is insensitive to small price changes in the underlying.</KeyTerm> strategy.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Delta is the most fundamental Greek — it tells you your directional exposure. Long calls have positive Delta (bullish), long puts have negative Delta (bearish). Understanding Delta helps you size positions and manage directional risk.
      </p>

      <Quiz
        question="What does a Delta of 0.6 on a call option mean?"
        answers={["The option will expire 60% of the time", "For every $1 increase in the underlying, the option price increases by approximately $0.60", "The option has a 60% chance of losing money"]}
        correctIndex={1}
      />
    </>
  )
}
