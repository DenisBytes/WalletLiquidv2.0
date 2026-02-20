import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">The Greeks: Overview</h1>

      <Callout type="info">
        In this chapter, you will learn about &quot;The Greeks&quot; — Delta, Gamma, Theta, Vega, and Rho — and how they&apos;re used to understand options behavior.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Are &quot;The Greeks&quot;?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The Greeks provide traders with valuable insights into the behavior and risk of options contracts. They are a set of parameters that help quantify the sensitivity of an option&apos;s price to various factors such as changes in the underlying asset price, time decay, implied volatility, and interest rates.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        There are five main options Greeks: <strong className="font-semibold text-text-primary">Delta</strong>, <strong className="font-semibold text-text-primary">Gamma</strong>, <strong className="font-semibold text-text-primary">Theta</strong>, <strong className="font-semibold text-text-primary">Vega</strong>, and <strong className="font-semibold text-text-primary">Rho</strong>. Each represents a different aspect of an option&apos;s nature and plays a crucial role in understanding how options behave.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Delta</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Delta">Measures how much an option&apos;s price changes for a $1 move in the underlying asset.</KeyTerm> measures the rate of change in the option price relative to changes in the underlying asset price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Simply put, Delta tells us how much the option&apos;s value will change for a $1 move in the underlying asset price.
      </p>

      <Callout type="info">
        If a call option has a Delta of 0.6, it means that for every $1 movement in the underlying asset price, the option&apos;s price will move by approximately $0.60.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Gamma</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Gamma">Measures the rate of change of Delta relative to the underlying asset price.</KeyTerm> measures the rate of change in an option&apos;s Delta relative to changes in the underlying asset price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Gamma indicates how much Delta itself will change for a $1 increase in the underlying asset price. Delta gauges the sensitivity of an option&apos;s price, while Gamma gauges the sensitivity of Delta.
      </p>

      <Callout type="info">
        A higher Gamma means the option&apos;s price becomes more sensitive to changes in the underlying asset price. If an option has a Gamma of 0.08, the option&apos;s Delta will increase by 0.08 for every $1 increase in the underlying.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Theta</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Theta">Measures the rate of time decay in an option&apos;s value.</KeyTerm> measures the rate of time decay in an option&apos;s value.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Theta gauges how much the price of an option will decrease as it moves closer to expiry. As time passes and an OTM option moves closer to expiration, the chances of it expiring ITM become lower. The option becomes less valuable with time, assuming everything else stays equal.
      </p>

      <Callout type="info">
        If a call option has a Theta of -0.05, it means the option&apos;s value will decrease by $0.05 per day due to time decay.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Vega</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Vega">Measures the sensitivity of an option&apos;s price to changes in implied volatility.</KeyTerm> measures the sensitivity of an option&apos;s price relative to changes in implied volatility.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Vega tells us how much the option&apos;s price will change for a 1% increase in implied volatility.
      </p>

      <Callout type="info">
        If an option has a Vega of 0.10, the option&apos;s price will increase by $0.10 for every 1% increase in implied volatility.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Rho</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Rho">Measures the sensitivity of an option&apos;s price to changes in interest rates.</KeyTerm> measures the sensitivity of an option&apos;s price to changes in interest rates.
      </p>

      <Callout type="info">
        If a call option has a Rho of 0.04, the option&apos;s price will increase by $0.04 for every 1% increase in interest rates.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Summary</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options Greeks provide valuable insights into options behavior. Understanding them thoroughly is <em>crucial</em> to trading options successfully.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Delta</strong> — sensitivity to underlying price changes</li>
        <li><strong className="font-semibold text-text-primary">Gamma</strong> — sensitivity of Delta to underlying price changes</li>
        <li><strong className="font-semibold text-text-primary">Theta</strong> — rate of time decay</li>
        <li><strong className="font-semibold text-text-primary">Vega</strong> — sensitivity to implied volatility changes</li>
        <li><strong className="font-semibold text-text-primary">Rho</strong> — sensitivity to interest rate changes</li>
      </ul>

      <Quiz
        question="What does Theta measure?"
        answers={["How much an option's price changes for a $1 move in the underlying", "The rate of change of Delta relative to the underlying", "The rate of time decay in an option's value"]}
        correctIndex={2}
      />
    </>
  )
}
