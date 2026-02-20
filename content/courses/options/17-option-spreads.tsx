import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Option Spreads</h1>

      <Callout type="info">
        In this chapter, you will learn about option spreads — strategies that combine buying and selling options to create defined-risk positions with specific risk/reward profiles.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Spread?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        An <KeyTerm term="option spread">A strategy involving simultaneous buying and selling of options on the same underlying asset with different strike prices or expiration dates.</KeyTerm> involves simultaneously buying and selling options on the same underlying asset. Spreads limit both potential profit and potential loss, creating a defined-risk position.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Spreads are popular because they:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Reduce the cost of entering an options position (the sold option offsets part of the bought option&apos;s premium)</li>
        <li>Create defined-risk trades (you know your max loss upfront)</li>
        <li>Allow you to profit from specific price ranges</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Bull Call Spread</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <strong className="font-semibold text-text-primary">bull call spread</strong> is created by:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Buying</strong> a call option at a lower strike price</li>
        <li><strong className="font-semibold text-text-primary">Selling</strong> a call option at a higher strike price (same expiration)</li>
      </ol>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong> ETH is trading at $3,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Buy $3,000 call for $200</li>
        <li>Sell $3,200 call for $80</li>
        <li>Net cost: $120</li>
      </ul>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Max Profit:</strong> ($3,200 - $3,000) - $120 = $80 (if ETH is above $3,200 at expiration)
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Max Loss:</strong> $120 (net premium paid, if ETH is below $3,000 at expiration)
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Bear Put Spread</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <strong className="font-semibold text-text-primary">bear put spread</strong> is created by:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Buying</strong> a put option at a higher strike price</li>
        <li><strong className="font-semibold text-text-primary">Selling</strong> a put option at a lower strike price (same expiration)</li>
      </ol>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong> ETH is trading at $3,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Buy $3,000 put for $200</li>
        <li>Sell $2,800 put for $80</li>
        <li>Net cost: $120</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        Max profit: ($3,000 - $2,800) - $120 = $80 (if ETH is below $2,800). Max loss: $120 (if ETH is above $3,000).
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Credit Spreads</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        In a <strong className="font-semibold text-text-primary">credit spread</strong>, you receive a net premium when entering the position:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Bull put spread:</strong> Sell a higher-strike put, buy a lower-strike put. You profit if the price stays above the sold strike.</li>
        <li><strong className="font-semibold text-text-primary">Bear call spread:</strong> Sell a lower-strike call, buy a higher-strike call. You profit if the price stays below the sold strike.</li>
      </ul>

      <Callout type="tip">
        Credit spreads benefit from time decay (Theta) and decreasing implied volatility. They are popular income strategies.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Use Spreads?</h2>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Defined risk:</strong> Unlike naked options, spreads have a known maximum loss. You always know the worst-case scenario before entering the trade.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Lower cost:</strong> Selling one leg reduces the premium paid for the other, making the position cheaper than a single option.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Targeted profit zone:</strong> Spreads let you profit from a specific price range rather than requiring a large directional move.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Choosing Spread Width</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Narrow spreads</strong> (small difference between strikes) — Lower max profit and loss, higher probability of max profit.</li>
        <li><strong className="font-semibold text-text-primary">Wide spreads</strong> (large difference between strikes) — Higher max profit and loss, lower probability of max profit.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Option spreads combine buying and selling options to create defined-risk positions. They reduce cost, limit risk, and allow traders to express specific market views. Spreads are versatile building blocks that form the foundation of more complex multi-leg strategies.
      </p>

      <Quiz
        question="What is the main advantage of using an option spread over a single option?"
        answers={["Spreads have unlimited profit potential", "Spreads create defined-risk positions with known maximum loss", "Spreads don't have any time decay"]}
        correctIndex={1}
      />
    </>
  )
}
