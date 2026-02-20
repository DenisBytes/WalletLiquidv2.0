import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Understanding Leverage</h1>

      <Callout type="info">
        In this chapter, you will learn what leverage is, how it works in futures trading, how it amplifies both gains and losses, what margin requirements look like at different leverage levels, and why high leverage is one of the most dangerous tools available to traders.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Is Leverage?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="leverage">A mechanism that allows traders to control a position larger than their actual capital by borrowing the difference from the exchange. Expressed as a multiplier like 2x, 10x, or 100x.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Leverage lets you control a large position with a small amount of your own money. If you have $1,000 and use 10x leverage, you can open a position worth $10,000. The exchange essentially lets you trade as if you had 10 times more capital than you actually do.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Think of it like a down payment on a house. You put down $50,000 of your own money to control a $500,000 property — that is 10x leverage. If the house increases in value by 10%, you gain $50,000, which is a 100% return on your $50,000 down payment. But if the house decreases by 10%, you lose your entire down payment.
      </p>

      <Callout type="info">
        In crypto futures trading, leverage typically ranges from <strong className="font-semibold text-text-primary">1x</strong> (no leverage — equivalent to spot trading) all the way up to <strong className="font-semibold text-text-primary">125x</strong> on some exchanges. The amount of leverage you choose directly determines how much margin you need and how quickly you can be liquidated.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How Leverage Works</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The relationship between leverage, margin, and position size is simple:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Position Size = Margin x Leverage</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Or equivalently:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Required Margin = Position Size / Leverage</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Here is a practical example with BTC at $60,000:
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Leverage</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Your Margin</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Position Size</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">BTC Exposure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">1x</td>
              <td className="py-2 px-3">$60,000</td>
              <td className="py-2 px-3">$60,000</td>
              <td className="py-2 px-3">1 BTC</td>
            </tr>
            <tr>
              <td className="py-2 px-3">5x</td>
              <td className="py-2 px-3">$12,000</td>
              <td className="py-2 px-3">$60,000</td>
              <td className="py-2 px-3">1 BTC</td>
            </tr>
            <tr>
              <td className="py-2 px-3">10x</td>
              <td className="py-2 px-3">$6,000</td>
              <td className="py-2 px-3">$60,000</td>
              <td className="py-2 px-3">1 BTC</td>
            </tr>
            <tr>
              <td className="py-2 px-3">50x</td>
              <td className="py-2 px-3">$1,200</td>
              <td className="py-2 px-3">$60,000</td>
              <td className="py-2 px-3">1 BTC</td>
            </tr>
            <tr>
              <td className="py-2 px-3">100x</td>
              <td className="py-2 px-3">$600</td>
              <td className="py-2 px-3">$60,000</td>
              <td className="py-2 px-3">1 BTC</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-text-secondary leading-relaxed mb-4">
        In every row, you control the same $60,000 position (1 BTC of exposure). The only thing that changes is how much of your own money you put up as collateral.
      </p>

      <Callout type="tip">
        Lower leverage means more margin is required, but your position can withstand larger price swings before liquidation. Higher leverage means less margin is needed, but even small price movements can liquidate you.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Leverage Amplifies Gains</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Leverage multiplies your returns relative to your margin. Here is a long position example:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">BTC price:</strong> $60,000</li>
        <li><strong className="font-semibold text-text-primary">Your margin:</strong> $1,000</li>
        <li><strong className="font-semibold text-text-primary">Leverage:</strong> 10x</li>
        <li><strong className="font-semibold text-text-primary">Position size:</strong> $10,000</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        BTC rises 5% to $63,000. Your position gains 5% x $10,000 = <strong className="font-semibold text-text-primary">$500</strong>.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        But $500 is a <strong className="font-semibold text-text-primary">50% return</strong> on your $1,000 margin. Without leverage, a 5% move gives you a 5% return. With 10x leverage, a 5% move gives you a 50% return.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">The formula:</strong> Return on Margin = Price Change % x Leverage
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">BTC Move</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Without Leverage</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">With 10x Leverage</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">With 50x Leverage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">+1%</td>
              <td className="py-2 px-3">+1%</td>
              <td className="py-2 px-3">+10%</td>
              <td className="py-2 px-3">+50%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">+5%</td>
              <td className="py-2 px-3">+5%</td>
              <td className="py-2 px-3">+50%</td>
              <td className="py-2 px-3">+250%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">+10%</td>
              <td className="py-2 px-3">+10%</td>
              <td className="py-2 px-3">+100%</td>
              <td className="py-2 px-3">+500%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info">
        This is why leverage is so attractive. Small, common price movements can generate outsized returns. A 2% move in BTC — which happens multiple times per day — yields a 20% return with 10x leverage.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Leverage Amplifies Losses</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Here is the part that destroys most traders. Leverage amplifies losses with exactly the same multiplier.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Using the same position:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Your margin:</strong> $1,000</li>
        <li><strong className="font-semibold text-text-primary">Leverage:</strong> 10x</li>
        <li><strong className="font-semibold text-text-primary">Position size:</strong> $10,000</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        BTC drops 5% to $57,000. Your position loses 5% x $10,000 = <strong className="font-semibold text-text-primary">$500</strong>.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        That $500 loss is <strong className="font-semibold text-text-primary">50% of your margin</strong>. And here is the critical point — if BTC drops just 10%, your loss equals $1,000, which is <strong className="font-semibold text-text-primary">100% of your margin</strong>. Your position is liquidated. You lose everything.
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">BTC Move</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Loss with 10x</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Loss with 50x</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Loss with 100x</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">-1%</td>
              <td className="py-2 px-3">-10% of margin</td>
              <td className="py-2 px-3">-50% of margin</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
            </tr>
            <tr>
              <td className="py-2 px-3">-2%</td>
              <td className="py-2 px-3">-20% of margin</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
            </tr>
            <tr>
              <td className="py-2 px-3">-5%</td>
              <td className="py-2 px-3">-50% of margin</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
            </tr>
            <tr>
              <td className="py-2 px-3">-10%</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
              <td className="py-2 px-3">-100% (liquidated)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        <strong className="font-semibold text-text-primary">At 100x leverage, a mere 1% price movement against you wipes out your entire margin.</strong> BTC routinely moves 1% within minutes. High leverage turns normal market volatility into a liquidation machine.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The Liquidation Price</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Your <KeyTerm term="liquidation price">The price at which your remaining margin can no longer support the position, causing the exchange to forcibly close it and seize your margin.</KeyTerm> is directly determined by your leverage.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The approximate distance to liquidation:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Distance to Liquidation ~ 1 / Leverage</strong>
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Leverage</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Approximate Price Move to Liquidation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">2x</td>
              <td className="py-2 px-3">50%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">5x</td>
              <td className="py-2 px-3">20%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">10x</td>
              <td className="py-2 px-3">10%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">25x</td>
              <td className="py-2 px-3">4%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">50x</td>
              <td className="py-2 px-3">2%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">100x</td>
              <td className="py-2 px-3">1%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">125x</td>
              <td className="py-2 px-3">0.8%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        At 125x leverage, a price movement of less than 1% against your position will liquidate you. This is not a theoretical risk — it happens constantly to real traders.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Choosing Your Leverage</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Professional traders rarely use leverage above 10x-20x. Most beginners are drawn to high leverage because it promises massive gains from small price movements, but the math works both ways.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Start with low leverage (2x-5x).</strong> This gives you room to be wrong. A 2x leveraged position can survive a 50% drawdown before liquidation. A 100x position cannot survive a 1% hiccup.
      </Callout>

      <p className="text-text-secondary leading-relaxed mb-4">
        Consider this perspective:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">1x-3x leverage:</strong> Conservative. Suitable for swing trades held over days or weeks. Wide room for error.</li>
        <li><strong className="font-semibold text-text-primary">5x-10x leverage:</strong> Moderate. Suitable for shorter-term trades with clear entry and exit points. Requires good risk management.</li>
        <li><strong className="font-semibold text-text-primary">20x-50x leverage:</strong> Aggressive. Only for experienced traders with tight stop-losses and strict discipline.</li>
        <li><strong className="font-semibold text-text-primary">50x-125x leverage:</strong> Extreme. Functionally equivalent to gambling for most traders. Used primarily by professionals for very short-term scalping with strict risk controls.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">A Cautionary Example</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Trader A and Trader B both start with $10,000 and open long BTC positions when BTC is at $60,000.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Trader A</strong> uses 3x leverage: $30,000 position. BTC drops 10% to $54,000. Loss: $3,000 (30% of margin). Trader A still has $7,000 and can wait for a recovery.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Trader B</strong> uses 50x leverage: $500,000 position. BTC drops just 2% to $58,800. Loss: $10,000 (100% of margin). Trader B is liquidated and has nothing left. Even though BTC later recovers to $65,000, Trader B cannot participate because the position is gone.
      </p>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">The most important lesson about leverage:</strong> Being right about the direction is not enough. You also need to survive the volatility along the way. High leverage robs you of that ability.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Leverage allows you to control positions larger than your capital by using margin as collateral. It amplifies both gains and losses by the same multiplier. Higher leverage requires less margin but brings your liquidation price dangerously close to your entry price. The approximate distance to liquidation is 1 divided by the leverage multiplier. Professional traders favor low to moderate leverage (2x-10x) and treat high leverage with extreme caution.
      </p>

      <Quiz
        question="If you use 50x leverage on a long BTC position, approximately how much does BTC need to drop to liquidate you?"
        answers={["10%", "5%", "2%", "0.5%"]}
        correctIndex={2}
      />
    </>
  )
}
