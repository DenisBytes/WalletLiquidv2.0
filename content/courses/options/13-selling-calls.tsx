import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Selling Calls</h1>

      <Callout type="info">
        In this chapter, you will learn about selling call options (short calls), when to use them, the risks involved, and the risk/reward profile.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Short Call?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Selling a call option is known as taking a <KeyTerm term="short call">Selling a call option, collecting premium, with the obligation to sell the underlying if the option is exercised.</KeyTerm> position.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This position is taken by an investor who believes that the price of the underlying asset will remain the same or decrease. By selling a call option, the investor collects the premium and hopes that the option will expire out of the money, allowing them to keep the premium collected.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        However, if the price of the underlying asset increases above the strike price, the investor may be obligated to sell the asset at the lower strike price, resulting in a loss.
      </p>

      <Callout type="warning">
        Short call positions carry theoretically unlimited risk — if the underlying price rises dramatically, losses can be severe. These are considered advanced strategies.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Example: Short Call in Practice</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Alice owns 1 ETH, currently trading at $3,000, and she doesn't expect the price to increase significantly in the near future.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Alice decides to sell a call option on her ETH with a strike price of $3,700, expiring in one month. She collects a premium of $100.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        One month later, the price of ETH remains below $3,700, and the option expires worthless. Alice keeps the $100 premium as profit.
      </p>

      <Callout type="info">
        If the option expires while the underlying asset is <strong className="font-semibold text-text-primary">below</strong> the strike price, the seller profits from the premium collected.
      </Callout>

      <Callout type="warning">
        If the option expires while the underlying asset is <strong className="font-semibold text-text-primary">above</strong> the strike price, the seller might have to sell the asset at the lower strike price — resulting in a loss.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk/Reward Profile</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Short Call (Naked)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Profit</strong></td>
              <td className="py-2 px-3">Premium collected</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Loss</strong></td>
              <td className="py-2 px-3">Unlimited</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven</strong></td>
              <td className="py-2 px-3">Strike price + premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Best for</strong></td>
              <td className="py-2 px-3">Neutral to bearish outlook</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Sell Calls</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Income generation:</strong> If you don't expect significant upside, selling calls generates premium income.</li>
        <li><strong className="font-semibold text-text-primary">Covered position:</strong> Selling calls against assets you already own (covered calls — next chapter) is a popular income strategy.</li>
        <li><strong className="font-semibold text-text-primary">Overpriced options:</strong> When IV is high and you believe options are overpriced, selling calls captures elevated premiums.</li>
      </ul>

      <Callout type="tip">
        Theta works in your favor as a call seller. Every day that passes without the underlying reaching your strike price earns you money through time decay.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Naked vs Covered</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Naked short call:</strong> You sell a call without owning the underlying. This carries unlimited risk.</li>
        <li><strong className="font-semibold text-text-primary">Covered call:</strong> You sell a call while owning the underlying. Risk is limited because you can deliver the asset if the option is exercised.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        We'll cover covered calls in detail in the next chapter.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Selling calls collects premium income but exposes you to potentially unlimited losses if the underlying price rises sharply. Short calls benefit from time decay (Theta) and drops in implied volatility (Vega). Always understand the risk before selling naked calls.
      </p>

      <Quiz
        question="What is the maximum profit for a short call position?"
        answers={["Unlimited", "The premium collected", "The strike price minus the current price"]}
        correctIndex={1}
      />
    </>
  )
}
