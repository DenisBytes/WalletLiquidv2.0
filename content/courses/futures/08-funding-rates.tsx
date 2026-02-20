import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Funding Rates</h1>

      <Callout type="info">
        In this chapter, you will learn what funding rates are, why they exist in perpetual futures, how funding is calculated, the difference between positive and negative funding, how funding affects your open positions, and how traders use funding rate arbitrage.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Are Funding Rates?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Funding rate">A periodic payment exchanged between long and short traders in perpetual futures contracts, designed to keep the perpetual contract price aligned with the underlying spot price.</KeyTerm> is the mechanism that makes perpetual futures work without an expiration date.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Traditional futures contracts expire on a set date, and their price naturally converges with the spot price at expiration. Perpetual futures never expire, so they need a different mechanism to prevent the contract price from drifting too far from the actual spot market price. That mechanism is the funding rate.
      </p>

      <Callout type="info">
        Funding is not a fee paid to the exchange. It is a peer-to-peer payment between long and short traders. The exchange simply facilitates the transfer.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Funding Rates Exist</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Without funding rates, perpetual futures prices could disconnect significantly from the spot market. If everyone is bullish and buying longs, the perpetual price would rise above the spot price with no natural force pulling it back down.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Funding rates solve this by creating a financial incentive:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>When the perpetual price is <strong className="font-semibold text-text-primary">above</strong> the spot price (premium), longs pay shorts. This discourages going long and encourages shorting, pushing the price back down.</li>
        <li>When the perpetual price is <strong className="font-semibold text-text-primary">below</strong> the spot price (discount), shorts pay longs. This discourages shorting and encourages going long, pushing the price back up.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        This creates a self-correcting mechanism that keeps the perpetual price close to the spot price at all times.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Funding Is Calculated</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Funding rates are typically settled every <strong className="font-semibold text-text-primary">8 hours</strong> — at 00:00, 08:00, and 16:00 UTC on most exchanges. Some exchanges like Drift or dYdX use hourly funding.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The funding payment is calculated as:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Funding Payment = Position Value × Funding Rate</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The funding rate itself is determined by two components:
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Interest Rate Component</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        A fixed baseline rate, usually 0.01% per 8-hour interval (approximately 0.03% per day). This reflects the cost-of-carry difference between holding the crypto asset and holding a USD-denominated contract.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Premium/Discount Component</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        This is the variable part, based on the difference between the perpetual contract price and the spot index price. The larger the deviation, the larger this component.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Funding Rate = Interest Rate + Premium Index</strong>
      </p>

      <Callout type="tip">
        Most exchanges cap the funding rate at ±0.5% to ±1% per interval to prevent extreme payments during volatile periods. Always check the current funding rate before opening a position.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Positive vs Negative Funding</h2>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Positive Funding Rate</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        When the funding rate is positive, the perpetual price is trading above spot (at a premium). This typically occurs during bullish market conditions when demand for long positions is high.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Longs pay shorts</strong> — you pay a fee to maintain a long position</li>
        <li><strong className="font-semibold text-text-primary">Shorts receive payment</strong> — you earn income by holding a short position</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Negative Funding Rate</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        When the funding rate is negative, the perpetual price is trading below spot (at a discount). This usually happens during bearish conditions when there is heavy shorting pressure.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Shorts pay longs</strong> — you pay a fee to maintain a short position</li>
        <li><strong className="font-semibold text-text-primary">Longs receive payment</strong> — you earn income by holding a long position</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        The BTC funding rate is +0.03% (settled every 8 hours). You hold a long position worth $100,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Every 8 hours, you pay: $100,000 × 0.03% = <strong className="font-semibold text-text-primary">$30</strong></li>
        <li>Over 24 hours (3 intervals): <strong className="font-semibold text-text-primary">$90</strong></li>
        <li>Over 7 days: <strong className="font-semibold text-text-primary">$630</strong></li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        If the funding rate were -0.03%, you would instead <strong className="font-semibold text-text-primary">receive</strong> $30 every 8 hours as a long holder.
      </p>

      <Callout type="warning">
        During extreme bull markets, funding rates can spike to 0.1% or higher per 8-hour interval. At that rate, a long position would cost 0.3% per day or over 2% per week — enough to erase profits from a modest price increase.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Funding Affects Open Positions</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Funding payments are deducted from or added to your margin balance at each settlement interval. This has several important implications:
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Margin Erosion</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        If you are on the paying side of funding, your margin gradually decreases. This means your effective leverage increases over time, and your liquidation price moves closer to the current price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For example, you open a long position with $1,000 margin at 10x leverage. After paying $50 in funding over several days, your effective margin is now $950, and your liquidation price has shifted closer to the market price.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Compounding Effect</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Funding payments are based on your position's notional value, which changes as the underlying price moves. If BTC rises and you are long, your position value increases, and you pay more in funding per interval.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Holding Period Considerations</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Funding makes long-term position holding more expensive. A trade that is profitable over a few hours might become a net loss if held for days or weeks while paying high funding rates.
      </p>

      <Callout type="info">
        Always calculate the total expected funding cost before holding a leveraged position for an extended period. If you plan to hold a long position for a week, multiply the current funding rate by 21 intervals (3 per day × 7 days) and apply it to your position size.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Funding Rate Arbitrage</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Funding rate arbitrage">A market-neutral strategy where a trader holds a spot position and an opposite perpetual futures position to collect funding payments while remaining hedged against price movement.</KeyTerm> is one of the most popular low-risk strategies in crypto trading.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">How It Works</h3>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Buy 1 BTC on the spot market at $50,000.</li>
        <li>Open a 1 BTC short perpetual futures position at $50,000.</li>
        <li>Your net market exposure is zero — price movements are hedged.</li>
        <li>If the funding rate is positive, shorts receive funding. You collect payments every 8 hours.</li>
      </ol>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">The Math</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Assume a consistent funding rate of +0.03% per 8 hours:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Daily income: $50,000 × 0.03% × 3 = <strong className="font-semibold text-text-primary">$45</strong></li>
        <li>Monthly income: <strong className="font-semibold text-text-primary">$1,350</strong></li>
        <li>Annualized yield: approximately <strong className="font-semibold text-text-primary">32.85%</strong></li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        This yield comes with minimal directional risk since your spot and futures positions offset each other.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Risks of Funding Arbitrage</h3>

      <Callout type="warning">
        Funding rate arbitrage is not risk-free. The funding rate can flip negative, your short futures position still requires margin and faces liquidation risk during sharp upward moves, and exchange counterparty risk always exists.
      </Callout>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Funding rate reversal:</strong> If the rate turns negative, you start paying instead of receiving.</li>
        <li><strong className="font-semibold text-text-primary">Liquidation risk on the short:</strong> If BTC pumps hard, your short position could approach liquidation even though your spot position offsets the loss. You may need to add margin.</li>
        <li><strong className="font-semibold text-text-primary">Capital inefficiency:</strong> You need capital for both the spot purchase and the futures margin.</li>
        <li><strong className="font-semibold text-text-primary">Exchange risk:</strong> Keeping funds on an exchange carries counterparty risk.</li>
      </ul>

      <Callout type="tip">
        Monitor funding rate trends rather than reacting to a single interval. A consistently positive funding rate above 0.01% is generally favorable for the short side of an arbitrage position. Use funding rate dashboards to compare rates across exchanges and assets.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Funding rates are the invisible hand that keeps perpetual futures prices anchored to spot markets. They create ongoing costs or income for position holders, erode margin over time, and can significantly impact the profitability of longer-duration trades. Understanding whether you are on the paying or receiving side of funding is essential for any perpetual futures strategy.
      </p>

      <Quiz
        question="When the funding rate is positive, who pays whom?"
        answers={["Shorts pay longs", "The exchange pays both sides", "Longs pay shorts"]}
        correctIndex={2}
      />
    </>
  )
}
