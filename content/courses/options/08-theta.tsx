import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Theta</h1>

      <Callout type="info">
        In this chapter, you will take a deep dive into Theta — time decay, its impact on options pricing, and how buyers and sellers experience it differently.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Theta</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Theta">Measures the rate of decline in an option&apos;s value due to the passage of time.</KeyTerm> measures the rate of decline in the value of an option due to the passage of time, also known as time decay.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Theta is paid <strong className="font-semibold text-text-primary">daily</strong>. This is important because options have an expiration date, and as that date approaches, the value of the option can decrease rapidly. As the option matures, this erosion of value becomes more pronounced, especially for options that are at or near the money.
      </p>

      <Callout type="info">
        If a call option has a Theta of -0.05, it means the option&apos;s value will decrease by $0.05 per day due to time decay, all else being equal.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Theta: Friend or Foe?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        For those holding a long position in an option, Theta is a constant adversary, chipping away at the option&apos;s value daily.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Conversely, for those who have sold (written) options, Theta works in their favor — they benefit from the option&apos;s decreasing value.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Option buyers:</strong> Theta works against you. Every day that passes costs you money.
      </Callout>

      <Callout type="warning">
        <strong className="font-semibold text-text-primary">Option sellers:</strong> Theta works for you. Every day that passes earns you money (as long as the option stays OTM).
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Theta Acceleration</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Time decay is not linear — it accelerates as expiration approaches. An option loses time value slowly at first, then increasingly faster as the expiration date nears.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">90 days out:</strong> Theta is relatively small. The option loses value slowly.</li>
        <li><strong className="font-semibold text-text-primary">30 days out:</strong> Theta starts to pick up noticeably.</li>
        <li><strong className="font-semibold text-text-primary">Final week:</strong> Theta accelerates dramatically, especially for ATM options.</li>
      </ul>

      <Callout type="warning">
        The last 30 days of an option&apos;s life is where the majority of time decay occurs. This is why many options sellers prefer to sell short-dated options — they benefit from maximum Theta decay.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Theta and Moneyness</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">ATM options</strong> have the highest Theta — they have the most extrinsic value to lose.</li>
        <li><strong className="font-semibold text-text-primary">Deep ITM options</strong> have low Theta — their value is mostly intrinsic.</li>
        <li><strong className="font-semibold text-text-primary">Deep OTM options</strong> have low Theta — they don&apos;t have much value to begin with.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Theta and Vega Interaction</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        An increase in implied volatility (which benefits long Vega positions) often comes with an increase in Theta. This is because options tend to be more expensive when IV is high, meaning more extrinsic value that decays over time.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Traders need to weigh the potential benefits of an increase in implied volatility against the potential costs of increased time decay.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Managing Theta</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        To navigate the challenges posed by Theta, traders often turn to multi-leg options strategies that can be designed to offset or take advantage of time decay. Strategies like calendar spreads explicitly exploit differences in Theta between different expiration dates.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Theta represents time decay and is the constant cost of holding options. It accelerates near expiration, especially for ATM options. Option sellers earn Theta; option buyers pay it. Understanding Theta is essential for managing the time dimension of options positions.
      </p>

      <Quiz
        question="How does Theta behave as expiration approaches?"
        answers={["It decreases linearly", "It accelerates — options lose value faster near expiration", "It remains constant throughout the option's life"]}
        correctIndex={1}
      />
    </>
  )
}
