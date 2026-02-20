import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Implied Volatility</h1>

      <Callout type="info">
        In this chapter, you will learn about implied volatility, realized (historical) volatility, and how volatility affects options pricing and trading decisions.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Volatility in Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Volatility</strong> is a measure of how much and how fast the price of an asset can change over a short period of time. In the crypto markets, volatility is especially important as it directly affects the risk and return of options strategies.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        There are two ways to measure volatility: <KeyTerm term="implied volatility">An estimate of how uncertain the price of an asset will be in the future, derived from option prices.</KeyTerm> and <KeyTerm term="realized volatility">The historically recorded price movement of an asset over a specified period.</KeyTerm>.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Implied Volatility</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Implied volatility (IV) is an estimate of how uncertain and unpredictable the price of an asset will be in the future.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        It&apos;s like predicting the weather over the next few months. Just like a weather forecast, IV is based on various factors and conditions.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        When the forecast indicates high volatility, traders may be more likely to purchase options to profit from potential price swings. When the forecast calls for low volatility, traders may prefer strategies more fit for calmer markets, such as selling options.
      </p>

      <Callout type="info">
        If the market implies <strong className="font-semibold text-text-primary">high</strong> volatility for an asset like ETH, the price is expected to <strong className="font-semibold text-text-primary">move a lot</strong> in the future. Options become more expensive.
      </Callout>

      <Callout type="tip">
        If the market implies <strong className="font-semibold text-text-primary">low</strong> volatility, the price is expected to <strong className="font-semibold text-text-primary">move less</strong>. Options become cheaper.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Realized Volatility: Historical Price Movement</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Realized volatility</strong> (also called historical volatility) measures the past price movement of an asset over a specified period.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Realized volatility can be used to find correlations and historical patterns, as well as an indicator of the actual price risk of an underlying asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If implied volatility is higher than realized volatility, it means the markets expect unusually high volatility. Among other implications, this means an option might be overpriced on average, signaling traders to sell premiums.
      </p>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Realized volatility</strong> is an indicator of the <em>actual</em> historically recorded price risk.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Implied volatility</strong> is an indicator of the <em>expected</em> future price risk.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">IV and Options Pricing</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        High implied volatility means that an option is more likely to expire in the money. This results in a higher premium since the buyer has a higher chance of profiting and the seller takes on more risk.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Low IV</strong> → cheaper premiums → good time to buy options</li>
        <li><strong className="font-semibold text-text-primary">High IV</strong> → expensive premiums → good time to sell options</li>
      </ul>

      <Callout type="warning">
        Buying options when IV is extremely high can be risky — even if the underlying moves in your direction, a subsequent drop in IV (called &quot;IV crush&quot;) can reduce your option&apos;s value.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">IV Crush</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        After major events (protocol launches, regulatory announcements, earnings), implied volatility often drops sharply. This is known as <strong className="font-semibold text-text-primary">IV crush</strong>. Options that were expensive before the event can lose significant value even if the underlying price moves favorably.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Understanding implied and realized volatility can help traders make more informed decisions. IV directly affects option pricing — higher IV means more expensive options. Comparing IV to realized volatility can signal whether options are overpriced or underpriced.
      </p>

      <Quiz
        question="What is the difference between implied and realized volatility?"
        answers={["Implied volatility doesn't matter since it's not based on actual data", "Implied volatility is based on what the markets expect, whereas realized volatility is based on historical data", "Realized volatility is real, while implied volatility is merely an analyst's prediction"]}
        correctIndex={1}
      />
    </>
  )
}
