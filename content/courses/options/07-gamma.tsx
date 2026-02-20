import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Gamma</h1>

      <Callout type="info">
        In this chapter, you will take a deep dive into Gamma — the &quot;acceleration&quot; of an option — and understand how it affects your Delta exposure.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Gamma</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Gamma">Measures the rate of change of Delta for a $1 change in the underlying asset price.</KeyTerm> is often thought of as the &quot;acceleration&quot; of an option.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        It indicates how much the Delta of an option is expected to change for a $1 change in the underlying price. While Delta gives you the speed of the option&apos;s price change, Gamma provides insights into how that speed is changing.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If an option has a Gamma of 0.08, it means that for every $1 increase in the underlying asset price, the option&apos;s Delta will increase by 0.08. Conversely, for a $1 decrease, the Delta will decrease by 0.08.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Gamma Matters</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Gamma is particularly crucial for traders managing portfolios of options or those who want to maintain a Delta-neutral position. Gamma can cause Delta to change rapidly, especially for options that are at-the-money.
      </p>

      <Callout type="warning">
        High Gamma means your Delta exposure can change quickly. A position that was Delta-neutral can suddenly become directional after a price move.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Gamma and Time to Expiration</h2>

      <p className="text-text-secondary leading-relaxed mb-4">Gamma behaves differently depending on how much time is left until expiration:</p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Long-dated options</strong> have relatively low and stable Gamma across all strike prices.</li>
        <li><strong className="font-semibold text-text-primary">Short-dated ATM options</strong> have very high Gamma — their Delta can swing dramatically with small price changes.</li>
        <li>As expiration approaches, Gamma concentrates around the ATM strike.</li>
      </ul>

      <Callout type="info">
        This is why the final days before expiration can be the most volatile for options traders. ATM options can flip between deep ITM and deep OTM very quickly.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Gamma and Volatility</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        When implied volatility is high, Gamma tends to be more evenly distributed across strikes. When IV is low, Gamma concentrates more sharply at the ATM strike.
      </p>

      <Callout type="tip">
        High Gamma can lead to larger potential profits but also larger potential losses. Options with high Gamma are more sensitive to the underlying price, creating both opportunity and risk.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Long vs Short Gamma</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Long Gamma</strong> (buying options): You benefit from large price moves in either direction. Your Delta automatically adjusts favorably — when the price goes up, your Delta increases; when it goes down, your Delta decreases.</li>
        <li><strong className="font-semibold text-text-primary">Short Gamma</strong> (selling options): Large price moves work against you. Your Delta adjusts unfavorably. However, you earn Theta (time decay) as compensation.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Gamma measures how quickly your directional exposure (Delta) changes. High Gamma near expiration for ATM options creates both opportunity and risk. Understanding Gamma helps you anticipate how your position will behave as prices move.
      </p>

      <Quiz
        question="What is one of the key interactions between Delta and Gamma?"
        answers={["High Gamma can lead to larger position adjustments for traders maintaining a Delta-neutral strategy", "Low Gamma will lead to higher Delta, and vice versa", "Both Delta and Gamma being high can lead to slower time decay"]}
        correctIndex={0}
      />
    </>
  )
}
