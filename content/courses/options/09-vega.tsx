import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Vega</h1>

      <Callout type="info">
        In this chapter, you will take a deep dive into Vega — understanding volatility sensitivity, its relationship with other Greeks, and practical implications for traders.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Vega</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        In the often turbulent crypto market, <KeyTerm term="Vega">Measures the change in an option&apos;s price for a 1% change in implied volatility.</KeyTerm> stands as a beacon for understanding volatility.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Vega measures the change in an option&apos;s price for a 1% change in implied volatility. As implied volatility represents the market&apos;s expectation of future volatility, a rise in this expectation can inflate the option&apos;s price, benefiting those holding long positions. Conversely, a drop can deflate the option&apos;s value.
      </p>

      <Callout type="info">
        If an option has a Vega of 0.15, the option&apos;s price will increase by $0.15 for every 1% increase in implied volatility, and decrease by $0.15 for every 1% decrease.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Long Vega vs Short Vega</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Long Vega</strong> (buying options): You benefit when implied volatility increases. If the market expects more turbulence, your options become more valuable.</li>
        <li><strong className="font-semibold text-text-primary">Short Vega</strong> (selling options): You benefit when implied volatility decreases. Calm markets reduce the value of the options you sold.</li>
      </ul>

      <Callout type="tip">
        Buying options before major events (earnings, protocol launches, regulatory announcements) is a long Vega play — you&apos;re betting that uncertainty will increase.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Vega and Time to Expiration</h2>

      <p className="text-text-secondary leading-relaxed mb-4">Vega is highest for longer-dated options and decreases as expiration approaches:</p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Long-dated options</strong> are very sensitive to changes in implied volatility. A shift in IV can dramatically change their price.</li>
        <li><strong className="font-semibold text-text-primary">Short-dated options</strong> are less affected by IV changes because there&apos;s less time for volatility to play out.</li>
      </ul>

      <Callout type="info">
        This is why LEAPS (long-dated options) can see massive price swings from IV changes alone, even if the underlying price hasn&apos;t moved much.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Vega and Moneyness</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">ATM options</strong> have the highest Vega. They are the most sensitive to changes in implied volatility.</li>
        <li><strong className="font-semibold text-text-primary">Deep ITM and OTM options</strong> have lower Vega — their prices are less affected by volatility changes.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Vega and Gamma Interaction</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        When implied volatility is high, Gamma also tends to increase, especially for ATM options. This means options can become more sensitive to changes in the underlying price as IV increases.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For traders, this creates a double effect: high IV environments make options more expensive (Vega) and more responsive to price moves (Gamma).
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Practical Applications</h2>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Volatility Trading</h3>

      <p className="text-text-secondary leading-relaxed mb-4">Some traders focus primarily on Vega, trading the direction of implied volatility rather than the underlying price:</p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Buy options</strong> when you think IV is too low and will increase</li>
        <li><strong className="font-semibold text-text-primary">Sell options</strong> when you think IV is too high and will decrease</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Event Trading</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Major protocol events, regulatory decisions, or market-wide catalysts can cause IV to spike. Traders can position themselves in advance by buying options (going long Vega) before the event.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Vega measures your exposure to implied volatility changes. It&apos;s highest for ATM, long-dated options. In the volatile crypto market, Vega can be one of the most impactful Greeks. Understanding Vega allows you to position for or against market uncertainty.
      </p>

      <Quiz
        question="When is Vega highest for an option?"
        answers={["For short-dated, deep OTM options", "For long-dated, ATM options", "For short-dated, ATM options"]}
        correctIndex={1}
      />
    </>
  )
}
