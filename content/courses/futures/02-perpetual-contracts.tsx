import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Perpetual Contracts</h1>

      <Callout type="info">
        In this chapter, you will learn what perpetual futures contracts are, how they differ from traditional futures, why they have no expiration date, how they track the spot price through funding rates, and why they dominate crypto derivatives trading.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Traditional Futures vs. Perpetual Contracts</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        In traditional finance, futures contracts have a fixed <KeyTerm term="expiration date">The predetermined date on which a futures contract settles and ceases to exist.</KeyTerm>. For example, a CME Bitcoin quarterly future might expire on the last Friday of March. When that date arrives, the contract settles — meaning all open positions are closed at the settlement price, and traders must open new contracts if they want to maintain exposure.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This creates friction. Traders must constantly "roll" their positions from expiring contracts to new ones, paying fees and dealing with price differences between contract months.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="perpetual contract">A type of futures contract with no expiration date, allowing traders to hold positions indefinitely as long as they maintain sufficient margin.</KeyTerm> solves this problem entirely.
      </p>

      <Callout type="info">
        A perpetual contract (often called a "perp") works exactly like a futures contract, except it <strong className="font-semibold text-text-primary">never expires</strong>. You can hold your position for seconds, hours, days, or months — there is no settlement date forcing you to close.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Perpetual Contracts Work</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        When you open a perpetual contract position, you are essentially making a bet on the future price direction of an asset like BTC or ETH. You choose to go long (betting the price will rise) or short (betting the price will fall), select your leverage, and put up margin as collateral.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The contract tracks the price of the underlying asset in real time. Your profit or loss is calculated continuously based on the difference between your entry price and the current market price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Here is an example:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>You open a long perpetual contract on BTC at $60,000 with $1,000 margin and 10x leverage, giving you $10,000 of exposure.</li>
        <li>BTC rises to $62,000 — a 3.33% increase. Your position gains 3.33% x $10,000 = $333.</li>
        <li>You can close the position at any time. There is no expiration forcing your hand.</li>
      </ul>

      <Callout type="tip">
        Because perps never expire, you have complete control over when to enter and exit your trades. This flexibility is one of the main reasons they are so popular among crypto traders.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The Price Tracking Problem</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Here is the challenge with perpetual contracts: if a contract never expires and never settles against the actual spot price, how do you prevent it from drifting far away from the real price of the asset?
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Traditional futures naturally converge to the spot price at expiration because the contract physically (or financially) settles at the spot price. Perpetual contracts do not have this mechanism.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Without some corrective force, a perpetual BTC contract could trade at $65,000 while BTC actually trades at $60,000 on spot markets. This would make the contract unreliable and useless as a trading instrument.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The solution is an elegant mechanism called the <strong className="font-semibold text-text-primary">funding rate</strong>.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Funding Rates: Keeping the Price in Check</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The <KeyTerm term="funding rate">A periodic payment exchanged between long and short traders on a perpetual contract, designed to keep the contract price aligned with the spot price.</KeyTerm> is a small payment exchanged between long and short position holders at regular intervals, typically every 8 hours.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The logic is straightforward:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">When the perp price is above the spot price</strong> (more demand to go long), the funding rate is positive. Long traders pay short traders. This incentivizes traders to close longs or open shorts, pushing the perp price back down toward spot.</li>
        <li><strong className="font-semibold text-text-primary">When the perp price is below the spot price</strong> (more demand to go short), the funding rate is negative. Short traders pay long traders. This incentivizes traders to close shorts or open longs, pushing the perp price back up toward spot.</li>
      </ul>

      <Callout type="info">
        Funding payments are made <strong className="font-semibold text-text-primary">peer-to-peer</strong> between traders, not to or from the exchange. The exchange simply facilitates the transfer. If you are on the paying side, the cost is deducted from your margin. If you are on the receiving side, the payment is added to your margin.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Funding Rate Example</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Suppose the funding rate is +0.01% and it is charged every 8 hours. You hold a long position worth $10,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Every 8 hours, you pay 0.01% x $10,000 = <strong className="font-semibold text-text-primary">$1.00</strong> to the short traders.</li>
        <li>Over 24 hours (3 funding periods), you pay $3.00.</li>
        <li>Over a month, you pay approximately $90.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        This might seem small, but funding rates can spike dramatically during volatile markets. During strong bull runs, funding rates have reached 0.1% or higher per 8 hours, which translates to 0.3% per day or roughly 9% per month.
      </p>

      <Callout type="warning">
        <strong className="font-semibold text-text-primary">Funding rates can eat into your profits significantly.</strong> If you hold a leveraged long position during a period of consistently high positive funding, the accumulated payments can be substantial. Always check the current funding rate before opening a position and factor it into your trade plan.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Perpetual Contracts Dominate Crypto</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Perpetual contracts were first introduced by BitMEX in 2016, and they quickly became the most traded instrument in crypto. Today, perps account for the vast majority of all crypto derivatives volume.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">No expiration management:</strong> Traders never need to worry about rolling positions or contract settlement dates.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">High leverage:</strong> Perpetual contracts typically offer leverage up to 100x or even 125x, far more than spot margin trading.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Deep liquidity:</strong> Because all traders are concentrated in a single contract per asset (rather than spread across multiple expiration months), perps tend to have the tightest spreads and deepest order books.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">24/7 markets:</strong> Unlike traditional futures exchanges that have trading hours, crypto perpetual contracts trade around the clock, every day of the year.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Perpetual contracts are futures contracts without an expiration date. They use a funding rate mechanism — periodic payments between long and short traders — to keep the contract price aligned with the spot price. Their simplicity, flexibility, high leverage, and deep liquidity have made them the most popular trading instrument in crypto. However, traders must be aware of funding costs, which can accumulate over time and impact profitability.
      </p>

      <Quiz
        question="What mechanism keeps perpetual contract prices aligned with the spot price?"
        answers={["Automatic liquidation of all positions every 24 hours", "The funding rate — periodic payments between long and short traders", "The exchange manually adjusting the contract price", "A fixed premium set by the exchange"]}
        correctIndex={1}
      />
    </>
  )
}
