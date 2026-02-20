import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Selling Puts</h1>

      <Callout type="info">
        In this chapter, you will learn about selling put options (short puts), when to use them, the risks involved, and the risk/reward profile.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Short Put?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Selling a put option is known as taking a <KeyTerm term="short put">Selling a put option, collecting premium, with the obligation to buy the underlying if the option is exercised.</KeyTerm> position.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This position is taken by an investor who believes that the price of the underlying asset will remain the same or increase. By selling a put option, the investor collects the premium and hopes that the option will expire out of the money.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        However, if the price of the underlying asset decreases below the strike price, the investor may be obligated to buy the asset at the higher strike price, resulting in a loss.
      </p>

      <Callout type="info">
        A short put is like a short call, but instead of profiting when the underlying falls or stagnates, you profit if the underlying <strong className="font-semibold text-text-primary">rises or stagnates</strong>.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Example: Short Put in Practice</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Alice wants to earn yield on her portfolio and expects ETH prices to stagnate over the coming weeks. She sells a put option on ETH with a strike price of $2,300, expiring in one month. She collects a premium of $150.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        One month later, ETH remains above $2,300. The option expires worthless. Alice keeps the $150 premium as profit.
      </p>

      <Callout type="tip">
        If the underlying stays <strong className="font-semibold text-text-primary">above</strong> the strike price, the put seller profits from the premium collected.
      </Callout>

      <Callout type="warning">
        If the underlying falls <strong className="font-semibold text-text-primary">below</strong> the strike price, the put seller may have to buy the asset at the higher strike price — resulting in a loss. The maximum loss occurs if the asset goes to zero.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk/Reward Profile</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Short Put</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Profit</strong></td>
              <td className="py-2 px-3">Premium collected</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Loss</strong></td>
              <td className="py-2 px-3">Strike price - premium (if price goes to $0)</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven</strong></td>
              <td className="py-2 px-3">Strike price - premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Best for</strong></td>
              <td className="py-2 px-3">Neutral to bullish outlook</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Sell Puts</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Income generation:</strong> If you expect prices to stay flat or rise, selling puts generates premium income.</li>
        <li><strong className="font-semibold text-text-primary">Acquiring at a discount:</strong> If you want to buy an asset at a lower price, selling puts at your target strike lets you collect premium while waiting. If the price drops to your strike, you buy at the price you wanted.</li>
        <li><strong className="font-semibold text-text-primary">High IV environment:</strong> When IV is elevated, put premiums are rich — selling captures the inflated time value.</li>
      </ul>

      <Callout type="tip">
        Theta works in your favor as a put seller. Time decay erodes the option's value daily, benefiting the seller.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Cash-Secured Puts</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <strong className="font-semibold text-text-primary">cash-secured put</strong> is when you sell a put while holding enough cash to buy the underlying if the option is exercised. This is a more conservative approach than selling naked puts, as you're prepared to take delivery of the asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This strategy is popular among investors who want to:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Earn premium income while waiting</li>
        <li>Acquire assets at a price they're comfortable with</li>
      </ol>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Selling puts collects premium income and works best in neutral-to-bullish environments. Maximum loss is substantial (the full strike price minus premium if the asset goes to zero). Short puts benefit from time decay and drops in IV. Cash-secured puts are a more conservative variation.
      </p>

      <Quiz
        question="What's the biggest risk involved with short puts?"
        answers={["The underlying asset expiring above the strike price", "Losing out on the option premiums", "If the underlying falls, the seller may have to buy at the higher strike price, resulting in potentially large losses"]}
        correctIndex={2}
      />
    </>
  )
}
