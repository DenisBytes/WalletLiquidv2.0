import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Margin Requirements</h1>

      <Callout type="info">
        In this chapter, you will learn what margin is in futures trading, the difference between initial margin and maintenance margin, how cross margin and isolated margin modes work, what the margin ratio means, how margin calls happen, and how margin and leverage are fundamentally connected.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Is Margin?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="margin">The collateral a trader deposits to open and maintain a leveraged futures position. It acts as a security deposit that guarantees the trader can cover potential losses.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        When you open a leveraged futures position, you do not need to put up the full value of the position. Instead, you deposit a fraction of the total value as collateral. This collateral is called margin.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Think of margin as a security deposit on an apartment. The landlord does not ask you to pay the full value of the apartment upfront — they ask for a deposit that covers potential damages. Similarly, the exchange asks for margin that covers potential losses on your leveraged position.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If your losses grow too large relative to your margin, the exchange closes your position to prevent the losses from exceeding what you deposited. This is liquidation, which we will cover in depth in the next chapter.
      </p>

      <Callout type="info">
        Margin is not a fee or a cost. It is your own capital locked up as collateral for the duration of the trade. When you close your position, your remaining margin (plus or minus any PnL) is returned to your available balance.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Initial Margin vs. Maintenance Margin</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        There are two critical margin thresholds every futures trader must understand.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Initial Margin</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="initial margin">The minimum amount of collateral required to open a new futures position. Calculated as the position size divided by the leverage multiplier.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Initial margin is the amount you must deposit to open a position. The formula is straightforward:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Initial Margin = Position Size / Leverage</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For example, to open a $50,000 BTC long position with 10x leverage:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Initial Margin = $50,000 / 10 = <strong className="font-semibold text-text-primary">$5,000</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        You need at least $5,000 in your account to open this trade.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Maintenance Margin</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="maintenance margin">The minimum amount of margin that must remain in the account to keep a position open. If the margin falls below this level, the position is liquidated.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Maintenance margin is the minimum collateral required to <strong className="font-semibold text-text-primary">keep</strong> your position open. It is always lower than the initial margin — typically between 0.4% and 2% of the position size, depending on the exchange and the asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For our $50,000 BTC position, if the maintenance margin rate is 0.5%:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Maintenance Margin = $50,000 x 0.5% = <strong className="font-semibold text-text-primary">$250</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This means your position will be liquidated when your remaining margin drops to $250. Any further losses would exceed what you have deposited, so the exchange steps in to close the position.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Initial margin</strong> is the entry fee to open a trade. <strong className="font-semibold text-text-primary">Maintenance margin</strong> is the minimum balance you must maintain to avoid liquidation. The gap between them is your buffer zone — the amount of loss the position can absorb before being forcibly closed.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Margin Changes During a Trade</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Your margin is not static. It fluctuates in real time as the price of the underlying asset moves.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Consider this example:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Position:</strong> Long 1 BTC at $60,000 with 10x leverage</li>
        <li><strong className="font-semibold text-text-primary">Initial margin:</strong> $6,000</li>
        <li><strong className="font-semibold text-text-primary">Maintenance margin:</strong> $300 (0.5% of $60,000)</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">If BTC rises to $62,000:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Unrealized PnL: +$2,000</li>
        <li>Effective margin: $6,000 + $2,000 = $8,000</li>
        <li>You are well above maintenance margin</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">If BTC drops to $55,500:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Unrealized PnL: -$4,500</li>
        <li>Effective margin: $6,000 - $4,500 = $1,500</li>
        <li>Still above maintenance margin, but getting close</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">If BTC drops to $59,700:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Unrealized PnL: -$5,700</li>
        <li>Effective margin: $6,000 - $5,700 = $300</li>
        <li>You have hit maintenance margin — <strong className="font-semibold text-text-primary">liquidation</strong></li>
      </ul>

      <Callout type="warning">
        Your margin erodes with every tick against your position. There is no grace period or second chance. When your margin hits the maintenance threshold, liquidation is immediate and automatic.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Cross Margin vs. Isolated Margin</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Exchanges offer two margin modes that fundamentally change how your positions interact with your account balance.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Isolated Margin</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="isolated margin">A margin mode where only the margin allocated to a specific position is at risk. If the position is liquidated, only the assigned margin is lost, not the entire account balance.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        In isolated margin mode, each position has its own dedicated margin. The margin you assign to a trade is the maximum you can lose on that trade.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Account balance: $20,000</li>
        <li>You open a long BTC position with $2,000 isolated margin at 10x leverage ($20,000 position)</li>
        <li>If the position is liquidated, you lose only the $2,000 assigned to it</li>
        <li>Your remaining $18,000 is untouched</li>
      </ul>

      <Callout type="tip">
        Isolated margin is like compartmentalizing your risk. Each trade has a firewall around it. One bad trade cannot drain your entire account. This is the recommended mode for beginners.
      </Callout>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Cross Margin</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="cross margin">A margin mode where the entire available account balance is used as collateral for all open positions. This provides more buffer against liquidation but puts the full balance at risk.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        In cross margin mode, your entire available account balance serves as collateral for all your open positions. This means:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Positions have more margin buffer and are harder to liquidate</li>
        <li>But if a position is liquidated, it can consume your entire account balance</li>
        <li>Profits from one position can automatically support another losing position</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Account balance: $20,000</li>
        <li>You open a long BTC position at 10x leverage ($200,000 position)</li>
        <li>The full $20,000 is available as margin for this position</li>
        <li>The position can withstand a 10% drop ($20,000 loss) before liquidation</li>
        <li>But if it is liquidated, you lose everything — all $20,000</li>
      </ul>

      <Callout type="warning">
        Cross margin is a double-edged sword. It gives your positions more room to breathe, but a single catastrophic trade can wipe out your entire account. Use cross margin only when you fully understand the risks and have strict risk management in place.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Margin Ratio</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The <KeyTerm term="margin ratio">The ratio of maintenance margin to the current margin balance, expressed as a percentage. When it reaches 100%, liquidation occurs.</KeyTerm> tells you how close you are to liquidation at any given moment.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Margin Ratio = (Maintenance Margin / Current Margin Balance) x 100%</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Margin ratio at 10%:</strong> You are far from liquidation. Plenty of buffer.</li>
        <li><strong className="font-semibold text-text-primary">Margin ratio at 50%:</strong> Getting concerning. The position has absorbed significant losses.</li>
        <li><strong className="font-semibold text-text-primary">Margin ratio at 80%:</strong> Danger zone. A small further move could trigger liquidation.</li>
        <li><strong className="font-semibold text-text-primary">Margin ratio at 100%:</strong> Liquidation. The exchange closes your position.</li>
      </ul>

      <Callout type="info">
        Most exchanges display your margin ratio in real time on the trading interface. Monitoring it constantly is one of the most basic but important risk management practices. Some exchanges will issue a <strong className="font-semibold text-text-primary">margin call</strong> warning when your ratio crosses a certain threshold (like 80%), giving you a chance to add margin or close the position.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The Relationship Between Margin and Leverage</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Margin and leverage are two sides of the same coin. They are inversely related:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Leverage = Position Size / Margin</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Margin = Position Size / Leverage</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Higher leverage means less margin is required, but also means less buffer against liquidation. Lower leverage means more margin is required, but provides a larger safety net.
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Leverage</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Margin Required for $100,000 Position</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Buffer Before Liquidation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">2x</td>
              <td className="py-2 px-3">$50,000</td>
              <td className="py-2 px-3">~50%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">5x</td>
              <td className="py-2 px-3">$20,000</td>
              <td className="py-2 px-3">~20%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">10x</td>
              <td className="py-2 px-3">$10,000</td>
              <td className="py-2 px-3">~10%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">25x</td>
              <td className="py-2 px-3">$4,000</td>
              <td className="py-2 px-3">~4%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">50x</td>
              <td className="py-2 px-3">$2,000</td>
              <td className="py-2 px-3">~2%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">100x</td>
              <td className="py-2 px-3">$1,000</td>
              <td className="py-2 px-3">~1%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        When choosing your leverage, you are really choosing your margin — and therefore choosing how much room your position has to absorb losses before liquidation. Always think about margin in terms of risk tolerance, not just capital efficiency.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Adding Margin to Avoid Liquidation</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        If your position is approaching liquidation in isolated margin mode, you can often add more margin to the position. This increases your buffer and pushes your liquidation price further away.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Long BTC at $60,000, $2,000 isolated margin, 10x leverage</li>
        <li>BTC drops to $59,000. Your margin is down to $1,000. Liquidation is close.</li>
        <li>You add $3,000 more margin to the position, bringing total margin to $4,000</li>
        <li>Your liquidation price moves further away, giving the position more room</li>
      </ul>

      <Callout type="warning">
        Adding margin to a losing position is sometimes called "averaging down on a losing trade." While it can save you from liquidation, it also increases your total capital at risk. Only add margin if you genuinely believe the trade will recover — do not throw good money after bad out of desperation.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Margin is the collateral you deposit to open and maintain leveraged positions. Initial margin is the amount needed to open a trade; maintenance margin is the minimum required to keep it open. Isolated margin limits your risk to the amount assigned to each position, while cross margin uses your entire balance as collateral. The margin ratio tells you how close you are to liquidation — at 100%, your position is forcibly closed. Margin and leverage are inversely related: higher leverage means less margin and less room for error.
      </p>

      <Quiz
        question="What happens when your margin ratio reaches 100%?"
        answers={["Your leverage is automatically reduced", "Additional margin is borrowed from the exchange", "Your position is liquidated", "Trading is paused for 24 hours"]}
        correctIndex={2}
      />
    </>
  )
}
