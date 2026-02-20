import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Straddles and Strangles</h1>

      <Callout type="info">
        In this chapter, you will learn about straddles and strangles — volatility strategies that profit from large price moves in either direction, regardless of which way the market goes.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Trading Volatility, Not Direction</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Most strategies we&apos;ve covered so far are directional — they require the price to go up or down. <strong className="font-semibold text-text-primary">Straddles</strong> and <strong className="font-semibold text-text-primary">strangles</strong> are different. They profit from <strong className="font-semibold text-text-primary">large moves in either direction</strong> and lose money when the price stays flat.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        These are <KeyTerm term="volatility strategies">Options strategies that profit from the magnitude of price movement, regardless of direction.</KeyTerm> — you&apos;re betting on <em>how much</em> the price moves, not <em>which way</em>.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Straddle?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="straddle">Buying both a call and a put at the same strike price and expiration date.</KeyTerm> involves buying both a call and a put at the <strong className="font-semibold text-text-primary">same strike price</strong> and <strong className="font-semibold text-text-primary">same expiration date</strong>, typically at the money.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong> ETH is trading at $3,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Buy $3,000 call for $200</li>
        <li>Buy $3,000 put for $180</li>
        <li>Total cost: $380</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">When You Profit</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>If ETH rises above $3,380 — the call profits more than both premiums cost</li>
        <li>If ETH falls below $2,620 — the put profits more than both premiums cost</li>
        <li>The further the price moves from $3,000, the more you profit</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">When You Lose</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>If ETH stays near $3,000, both options lose value to time decay</li>
        <li>Maximum loss: $380 (both premiums) if ETH is exactly at $3,000 at expiration</li>
      </ul>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Max Profit:</strong> Unlimited (price can move indefinitely in either direction).
        <br />
        <strong className="font-semibold text-text-primary">Max Loss:</strong> Total premiums paid ($380 in this example).
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Strangle?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="strangle">Buying a call and a put at different strike prices (both OTM) with the same expiration date.</KeyTerm> is similar to a straddle but uses <strong className="font-semibold text-text-primary">different strike prices</strong> — typically both out-of-the-money.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong> ETH is trading at $3,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Buy $3,200 call (OTM) for $100</li>
        <li>Buy $2,800 put (OTM) for $80</li>
        <li>Total cost: $180</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">When You Profit</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>If ETH rises above $3,380 — the call profits more than both premiums</li>
        <li>If ETH falls below $2,620 — the put profits more than both premiums</li>
        <li>Requires a larger move than a straddle to become profitable</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Advantage Over a Straddle</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Cheaper</strong> — both options are OTM, so premiums are lower</li>
        <li><strong className="font-semibold text-text-primary">Higher probability of partial recovery</strong> — you lose less if the price moves moderately</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Straddle vs Strangle</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Straddle</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Strangle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Cost</strong></td>
              <td className="py-2 px-3">Higher</td>
              <td className="py-2 px-3">Lower</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven range</strong></td>
              <td className="py-2 px-3">Narrower</td>
              <td className="py-2 px-3">Wider</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max loss</strong></td>
              <td className="py-2 px-3">Higher (more premium)</td>
              <td className="py-2 px-3">Lower (less premium)</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Move needed</strong></td>
              <td className="py-2 px-3">Smaller</td>
              <td className="py-2 px-3">Larger</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Use These Strategies</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Before major events:</strong> Protocol launches, regulatory decisions, or macro announcements that could cause sharp moves.</li>
        <li><strong className="font-semibold text-text-primary">Low IV environment:</strong> When implied volatility is cheap and you expect it to spike.</li>
        <li><strong className="font-semibold text-text-primary">Uncertain direction:</strong> You believe a big move is coming but don&apos;t know which way.</li>
      </ul>

      <Callout type="warning">
        The biggest enemy of straddles and strangles is <strong className="font-semibold text-text-primary">time decay</strong>. If the expected move doesn&apos;t happen, Theta will erode the value of both options daily. These strategies work best with short time horizons around catalysts.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Short Straddles and Strangles</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        You can also <strong className="font-semibold text-text-primary">sell</strong> straddles and strangles, betting that the price will stay within a range:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Short straddle:</strong> Sell ATM call + sell ATM put. Profit if price stays near the strike.</li>
        <li><strong className="font-semibold text-text-primary">Short strangle:</strong> Sell OTM call + sell OTM put. Profit if price stays between the two strikes.</li>
      </ul>

      <Callout type="warning">
        Short straddles and strangles have theoretically unlimited risk. They should only be used by experienced traders with proper risk management.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Straddles and strangles are volatility plays — they profit from large price moves regardless of direction. Straddles are more expensive but require smaller moves. Strangles are cheaper but need larger moves. Both suffer from time decay when the underlying stays flat.
      </p>

      <Quiz
        question="What is the key difference between a straddle and a strangle?"
        answers={["A straddle uses calls only, a strangle uses puts only", "A straddle uses the same strike price for both options, a strangle uses different (OTM) strike prices", "A straddle is for bullish markets, a strangle is for bearish markets"]}
        correctIndex={1}
      />
    </>
  )
}
