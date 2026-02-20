import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Covered Calls</h1>

      <Callout type="info">
        In this chapter, you will learn about the covered call strategy — one of the most popular options income strategies — how it works, when to use it, and its trade-offs.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is a Covered Call?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="covered call">An options strategy where you sell a call option against an asset you already own, generating premium income.</KeyTerm> is a strategy where an investor <strong className="font-semibold text-text-primary">owns</strong> an asset and <strong className="font-semibold text-text-primary">sells</strong> a call option against it with a strike price above the current market price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The investor collects the premium from selling the call. If the price stays below the strike, the option expires worthless and the investor keeps both the asset and the premium. If the price rises above the strike, the investor must sell the asset at the strike price — capturing the premium but forfeiting additional upside.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">How It Works</h2>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Own the underlying asset</strong> (e.g., 1 ETH at $3,000)</li>
        <li><strong className="font-semibold text-text-primary">Sell a call option</strong> with a strike price above the current price (e.g., $3,500 strike)</li>
        <li><strong className="font-semibold text-text-primary">Collect the premium</strong> (e.g., $100)</li>
      </ol>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario A: Price stays below $3,500</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        The option expires worthless. You keep your ETH and the $100 premium. Net result: +$100 income.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario B: Price rises above $3,500</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        The option is exercised. You sell your ETH at $3,500. Net result: ($3,500 - $3,000) + $100 premium = +$600, but you miss any gains above $3,500.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario C: Price drops significantly</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You still own the ETH (now worth less), but the $100 premium provides a small buffer against the loss.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk/Reward Profile</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary"></th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Covered Call</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Profit</strong></td>
              <td className="py-2 px-3">(Strike price - purchase price) + premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Max Loss</strong></td>
              <td className="py-2 px-3">Purchase price - premium (if asset goes to $0)</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Breakeven</strong></td>
              <td className="py-2 px-3">Purchase price - premium</td>
            </tr>
            <tr>
              <td className="py-2 px-3"><strong className="font-semibold text-text-primary">Best for</strong></td>
              <td className="py-2 px-3">Neutral to mildly bullish outlook</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        Covered calls generate income from premiums collected but cap your upside potential. This is the trade-off: consistent income in exchange for limited gains on rallies.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Use Covered Calls</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Low volatility expectations:</strong> You don't expect significant upside in the near term.</li>
        <li><strong className="font-semibold text-text-primary">Income generation:</strong> You want to earn yield on assets you already hold.</li>
        <li><strong className="font-semibold text-text-primary">Partial profit-taking:</strong> You're willing to sell at the strike price and want to earn extra premium along the way.</li>
      </ul>

      <Callout type="warning">
        Covered calls don't protect against significant downside. If the underlying drops sharply, the premium collected provides only a minor cushion. Consider combining with protective puts for fuller protection.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Choosing the Strike Price</h2>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Higher strike</strong> — Lower premium, but more upside room. Less likely to be called away.</li>
        <li><strong className="font-semibold text-text-primary">Lower strike</strong> — Higher premium, but your upside is capped sooner. More likely to be called away.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        Most covered call writers aim for strikes that are OTM (above current price) by 5-15%, balancing premium income against the probability of being exercised.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Covered calls are one of the most popular and beginner-friendly options strategies. They generate consistent income from assets you already hold, at the cost of capping your upside. Best suited for neutral to mildly bullish markets with low volatility expectations.
      </p>

      <Quiz
        question="What is the covered calls strategy based on?"
        answers={["Buying and selling a call simultaneously", "Reducing risk by buying put options as a hedge", "Selling call options for assets you already hold to generate income"]}
        correctIndex={2}
      />
    </>
  )
}
