import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Risk Management</h1>

      <Callout type="info">
        In this chapter, you will learn about risk management for options trading — position sizing, volatility skew, managing Greeks exposure, and common mistakes to avoid.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Risk Management Matters</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options offer leverage, flexibility, and defined-risk profiles — but they can still destroy a portfolio if used carelessly. Successful options trading requires disciplined risk management, not just accurate directional calls.
      </p>

      <Callout type="warning">
        The majority of options expire worthless. Even with the right directional view, poor timing or position sizing can result in consistent losses.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Position Sizing</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The most fundamental risk management rule: <strong className="font-semibold text-text-primary">never risk more than you can afford to lose on a single trade.</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Guidelines for options position sizing:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Option buyers:</strong> Risk no more than 1-5% of your portfolio per trade. Premiums can go to zero.</li>
        <li><strong className="font-semibold text-text-primary">Option sellers:</strong> Ensure you have sufficient collateral to cover the worst-case scenario.</li>
        <li><strong className="font-semibold text-text-primary">Spread traders:</strong> Your max loss is defined — make sure it&apos;s an acceptable amount relative to your portfolio.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Volatility Skew</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Volatility skew">The pattern where options on the same underlying with the same expiration have different implied volatilities based on their strike prices.</KeyTerm> describes the variation in implied volatility across different strike prices.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Types of Skew</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Smile:</strong> IV is higher for both deep OTM and deep ITM options than for ATM options.</li>
        <li><strong className="font-semibold text-text-primary">Skew (forward/reverse):</strong> IV is different on one side of the ATM strike than the other.</li>
        <li><strong className="font-semibold text-text-primary">Reverse Skew:</strong> IV is higher for OTM puts than OTM calls — this is common in crypto and reflects the market pricing in a higher probability of sharp downside moves.</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Why Skew Matters for Risk Management</h3>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Pricing:</strong> Recognizing skew helps identify overpriced or underpriced options based on their implied volatility relative to ATM levels.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Tail risk:</strong> Skew provides insights into market sentiment about extreme moves. Steep put skew suggests the market is worried about crashes.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Hedging costs:</strong> The cost of protective puts varies based on skew — understanding this helps you time your hedges.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Managing Greeks Exposure</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A well-managed portfolio considers all Greeks:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Delta:</strong> Know your net directional exposure. Are you long or short the market?</li>
        <li><strong className="font-semibold text-text-primary">Gamma:</strong> High Gamma near expiration creates instability. Consider closing or rolling positions before the final week.</li>
        <li><strong className="font-semibold text-text-primary">Theta:</strong> If you&apos;re a net buyer, Theta is your enemy. If you&apos;re a net seller, it&apos;s your friend.</li>
        <li><strong className="font-semibold text-text-primary">Vega:</strong> Know your IV exposure. Are you positioned to benefit from or be harmed by changes in IV?</li>
      </ul>

      <Callout type="tip">
        Regularly assess your portfolio&apos;s net Greeks. A position that looked balanced when entered can become skewed as the underlying moves and time passes.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Common Mistakes</h2>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Overleveraging:</strong> Using too much of your portfolio in options positions.</li>
        <li><strong className="font-semibold text-text-primary">Ignoring time decay:</strong> Holding long options too long without the expected move materializing.</li>
        <li><strong className="font-semibold text-text-primary">Fighting the trend:</strong> Repeatedly buying puts in a bull market or calls in a bear market.</li>
        <li><strong className="font-semibold text-text-primary">No exit plan:</strong> Entering trades without defined profit targets and stop-loss levels.</li>
        <li><strong className="font-semibold text-text-primary">Ignoring IV:</strong> Buying options when IV is extremely elevated (before IV crush).</li>
      </ol>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Practical Risk Rules</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Define your max loss before entering</strong> every trade</li>
        <li><strong className="font-semibold text-text-primary">Use spreads</strong> to cap risk when selling options</li>
        <li><strong className="font-semibold text-text-primary">Diversify across expiration dates</strong> — don&apos;t concentrate all positions in one expiry</li>
        <li><strong className="font-semibold text-text-primary">Monitor IV levels</strong> relative to historical ranges before entering</li>
        <li><strong className="font-semibold text-text-primary">Close losing positions</strong> before they reach max loss — preservation of capital is paramount</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Risk management separates profitable options traders from the rest. Position size conservatively, understand your Greeks exposure, respect time decay, and always have an exit plan. No single trade should threaten your portfolio.
      </p>

      <Quiz
        question="What can volatility skew be useful for in options trading?"
        answers={["Volatility skew tells traders how much Theta is expected to change", "Volatility skew can be used to identify under- or overpriced options based on implied volatility", "Volatility skew only applies to futures, not options"]}
        correctIndex={1}
      />
    </>
  )
}
