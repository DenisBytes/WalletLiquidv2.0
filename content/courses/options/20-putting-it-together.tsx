import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Putting It All Together</h1>

      <Callout type="info">
        In this final chapter, you will review key concepts, learn about call-put parity and arbitrage, and understand how everything connects to make you a more complete options trader.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Course Recap</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Over the previous 19 chapters, you&apos;ve learned:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Fundamentals:</strong> What options are, calls vs puts, strike price, expiration, and premium</li>
        <li><strong className="font-semibold text-text-primary">Valuation:</strong> Intrinsic and extrinsic value, moneyness (ITM/OTM/ATM), and option pricing</li>
        <li><strong className="font-semibold text-text-primary">The Greeks:</strong> Delta, Gamma, Theta, Vega — how they measure option sensitivity</li>
        <li><strong className="font-semibold text-text-primary">Volatility:</strong> Implied vs realized volatility and how it affects pricing</li>
        <li><strong className="font-semibold text-text-primary">Strategies:</strong> Buying calls/puts, selling calls/puts, covered calls, protective puts, spreads, straddles, and strangles</li>
        <li><strong className="font-semibold text-text-primary">Risk Management:</strong> Position sizing, skew, Greeks management, and common mistakes</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        Now let&apos;s cover two advanced concepts that tie everything together.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Call-Put Parity</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Call-put parity">A fundamental principle that establishes a pricing relationship between calls, puts, and the underlying asset.</KeyTerm> is an essential concept that states: the sum of a long call and a short put with the same strike price and expiration is equivalent to holding the underlying asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The formula:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <em>Call Price - Put Price = Asset Price - Present Value(Strike Price)</em>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Or equivalently:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <em>C - P = S - PV(K)</em>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Where C is the call price, P is the put price, S is the current asset price, and PV(K) is the present value of the strike price.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Why Call-Put Parity Matters</h3>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Pricing validation:</strong> If call and put prices deviate from parity, it may indicate a mispricing opportunity.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Synthetic positions:</strong> Call-put parity allows traders to create synthetic positions. A long call + short put = synthetic long stock. This is useful when direct access to the underlying is limited or expensive.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Arbitrage detection:</strong> If prices violate parity, traders can exploit the difference for risk-free profit by simultaneously buying the underpriced side and selling the overpriced side.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Options Arbitrage</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Arbitrage">Exploiting price differences across markets for the same or related assets to earn risk-free profit.</KeyTerm> is a trading strategy that exploits price differences in different markets for the same or related assets.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        In crypto options, these price differences can occur across different exchanges — both centralized and decentralized.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Suppose a BTC call option with a June expiry and $26,000 strike is priced at $1,307 on one exchange and $1,484 on another. A trader could buy on the cheaper exchange and sell on the more expensive one, capturing the $177 difference.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Prerequisites for Arbitrage</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Access to various exchanges (both CEXs and DEXs)</li>
        <li>Real-time market data to spot opportunities as they arise</li>
        <li>Sufficient capital on multiple exchanges</li>
        <li>Fast trade execution — preferably via API</li>
      </ul>

      <Callout type="warning">
        Arbitrage opportunities are short-lived. As they&apos;re identified, traders rush to exploit them and the price discrepancies quickly disappear.
      </Callout>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Risks of Arbitrage</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Even though arbitrage is often described as "risk-free," several factors can complicate execution:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">System failures:</strong> Technical glitches can prevent trades from executing as planned</li>
        <li><strong className="font-semibold text-text-primary">Market conditions:</strong> Rapid changes can erase opportunities before you exploit them</li>
        <li><strong className="font-semibold text-text-primary">Execution risk:</strong> One side of your trade might not go through as expected</li>
        <li><strong className="font-semibold text-text-primary">Counterparty risk:</strong> The exchange or counterparty might fail to fulfill obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Building Your Trading Framework</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Now that you have the full toolkit, here&apos;s a framework for approaching options trades:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Market view:</strong> What do you expect the underlying to do? (Direction, magnitude, timing)</li>
        <li><strong className="font-semibold text-text-primary">Volatility view:</strong> Is IV high or low relative to history? Do you expect it to change?</li>
        <li><strong className="font-semibold text-text-primary">Strategy selection:</strong> Choose a strategy that matches your views and risk tolerance</li>
        <li><strong className="font-semibold text-text-primary">Position sizing:</strong> How much are you willing to risk on this trade?</li>
        <li><strong className="font-semibold text-text-primary">Entry criteria:</strong> At what price/IV level will you enter?</li>
        <li><strong className="font-semibold text-text-primary">Exit plan:</strong> Define profit targets and stop-loss levels before entering</li>
        <li><strong className="font-semibold text-text-primary">Monitor and adjust:</strong> Track your Greeks, roll positions if needed, and close when your thesis is invalidated</li>
      </ol>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options trading is a skill that combines market analysis, probability thinking, and disciplined risk management. The concepts in this course — from basic calls and puts to Greeks, volatility, and multi-leg strategies — form a comprehensive foundation. Practice with paper trading to build experience before committing real capital.
      </p>

      <Quiz
        question="What does call-put parity help traders identify?"
        answers={["Whether an asset is fundamentally underpriced", "Profitable price differences between options with identical terms — arbitrage opportunities", "The optimal time to exercise an option"]}
        correctIndex={1}
      />
    </>
  )
}
