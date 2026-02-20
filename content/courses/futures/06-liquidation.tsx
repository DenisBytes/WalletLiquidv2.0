import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Liquidation</h1>

      <Callout type="info">
        In this chapter, you will learn what liquidation is, how liquidation prices are calculated, the difference between partial and full liquidation, how liquidation cascades occur, how exchanges handle liquidations through insurance funds, and strategies to avoid getting liquidated.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Is Liquidation?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Liquidation">The forced closure of a leveraged position by the exchange when the trader's margin balance falls below the maintenance margin requirement.</KeyTerm> is the mechanism that protects exchanges and counterparties from losses when a trader's position moves too far against them.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        When you open a leveraged futures position, you only put up a fraction of the total position value as collateral (margin). If the market moves against you enough that your remaining margin can no longer support the position, the exchange will automatically close your position to prevent further losses.
      </p>

      <Callout type="warning">
        Liquidation means you lose your entire margin for that position. With high leverage, even a small price move can trigger liquidation and wipe out your collateral.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Liquidation Price Is Calculated</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Your liquidation price depends on three factors: your entry price, your leverage, and whether you are long or short.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">For a long position:</strong><br />
        Liquidation Price = Entry Price × (1 - 1 / Leverage)
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">For a short position:</strong><br />
        Liquidation Price = Entry Price × (1 + 1 / Leverage)
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Suppose you open a long BTC position at $50,000 with 10x leverage. Your liquidation price would be:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        $50,000 × (1 - 1/10) = $50,000 × 0.90 = $45,000
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This means if BTC drops 10% from your entry, your position gets liquidated and you lose your entire margin.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Now consider the same trade at 50x leverage:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        $50,000 × (1 - 1/50) = $50,000 × 0.98 = $49,000
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        At 50x leverage, just a 2% move against you triggers liquidation.
      </p>

      <Callout type="tip">
        The higher your leverage, the closer your liquidation price is to your entry price. Always check your liquidation price before entering a trade.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Partial vs Full Liquidation</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Exchanges handle liquidation differently depending on their risk engine:
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Full Liquidation</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        The exchange closes 100% of your position once the liquidation price is reached. Your entire margin is lost. This is the simpler and more common mechanism on many platforms.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Partial Liquidation</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Some exchanges use a tiered system where only a portion of your position is closed initially. This reduces your position size and effective leverage, potentially saving the remaining portion if the price stabilizes.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For example, if you have a $10,000 BTC long position approaching liquidation, a partial liquidation system might close $5,000 first. If the price recovers, you keep the remaining $5,000 position. If it continues falling, the rest gets liquidated.
      </p>

      <Callout type="info">
        Partial liquidation is more forgiving and is used by larger exchanges like Binance and Bybit. It gives traders a chance to retain part of their position during volatile moves.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Liquidation Cascades</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Liquidation cascade">A chain reaction where liquidated positions trigger further price movement, causing additional liquidations in the same direction.</KeyTerm> events are among the most dangerous phenomena in crypto futures markets.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Here is how a cascade unfolds:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>BTC drops sharply, liquidating a group of overleveraged long positions.</li>
        <li>These liquidations are market sell orders, which push the price down further.</li>
        <li>The lower price triggers more long liquidations at lower levels.</li>
        <li>Each wave of liquidations creates more selling pressure, accelerating the decline.</li>
      </ol>

      <p className="text-text-secondary leading-relaxed mb-4">
        Cascades can also happen in the opposite direction — a short squeeze occurs when rising prices liquidate short positions, creating forced buy orders that push prices even higher.
      </p>

      <Callout type="warning">
        Liquidation cascades can cause prices to move 10-20% or more in minutes. These events are particularly common during low-liquidity periods like weekends or holidays.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Exchanges Handle Liquidation</h2>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">The Liquidation Engine</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        When a position reaches its liquidation price, the exchange's liquidation engine takes over. It attempts to close the position at the best available price. If the position can be closed at a price better than the bankruptcy price (the price at which margin equals zero), the surplus goes to the insurance fund.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Insurance Funds</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Insurance fund">A reserve of funds maintained by the exchange to cover losses when liquidated positions cannot be closed at a price better than the bankruptcy price.</KeyTerm> pools exist to protect the broader market from socialized losses.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        When the liquidation engine cannot close a position profitably:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>The insurance fund covers the shortfall.</li>
        <li>If the insurance fund is depleted, the exchange may use <strong className="font-semibold text-text-primary">auto-deleveraging (ADL)</strong>, which forcibly reduces the positions of the most profitable traders to cover the loss.</li>
      </ul>

      <Callout type="info">
        Major exchanges publish their insurance fund balances publicly. A healthy insurance fund is a sign of a well-managed exchange and reduces the risk of ADL events affecting profitable traders.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How to Avoid Liquidation</h2>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Use lower leverage.</strong> The simplest way to avoid liquidation is to reduce your leverage. At 3-5x leverage, you have significant room for the market to move against you.</li>
        <li><strong className="font-semibold text-text-primary">Set stop-loss orders.</strong> Close your position at a predetermined loss level before liquidation is reached.</li>
        <li><strong className="font-semibold text-text-primary">Add margin.</strong> If your position is approaching liquidation, you can deposit additional margin to push your liquidation price further away.</li>
        <li><strong className="font-semibold text-text-primary">Use isolated margin.</strong> Isolate each position's margin so that a liquidation in one trade does not affect your other positions or wallet balance.</li>
        <li><strong className="font-semibold text-text-primary">Monitor your positions.</strong> In a 24/7 crypto market, prices can move rapidly while you are away. Use alerts and automated orders.</li>
      </ol>

      <Callout type="tip">
        A good rule of thumb: your stop-loss should always be hit before your liquidation price. If your stop-loss and liquidation price are close together, you are using too much leverage.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Liquidation is the single biggest risk in leveraged trading. Understanding how it works, where your liquidation price sits, and how cascades can amplify losses is essential for survival. Use conservative leverage, always set stop-losses, and never risk more margin than you can afford to lose.
      </p>

      <Quiz
        question="If you open a long BTC position at $40,000 with 20x leverage, approximately where is your liquidation price?"
        answers={["$38,000", "$36,000", "$32,000"]}
        correctIndex={0}
      />
    </>
  )
}
