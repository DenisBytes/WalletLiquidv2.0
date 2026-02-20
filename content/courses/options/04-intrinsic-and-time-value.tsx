import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Intrinsic and Time Value</h1>

      <Callout type="info">
        In this chapter, you will learn about intrinsic and extrinsic value, moneyness (ITM, OTM, ATM), and what these concepts mean for options traders.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What is Intrinsic Value?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The <KeyTerm term="intrinsic value">The difference between the strike price and the current market price of the underlying asset.</KeyTerm> of an option is the difference between the strike price and the current market price of the underlying asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Extrinsic value</strong> (also known as time value) is the portion of an option&apos;s price that is above its intrinsic value. Extrinsic value reflects the market&apos;s expectation of future volatility, time remaining until expiration, and the cost of carrying the underlying asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For example, if ETH is trading at $3,000, and you hold a call option with a strike price of $2,500, the intrinsic value is $500. If the option has a premium of $800, the extrinsic value would be $300.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Factors Affecting Extrinsic Value</h2>

      <Callout type="tip">
        Higher implied volatility results in higher extrinsic value — the market expects larger price swings, and the option is more likely to become profitable.
      </Callout>

      <Callout type="tip">
        The longer the time remaining until expiration, the more time the option has to become profitable, and the higher the extrinsic value.
      </Callout>

      <Callout type="tip">
        Interest rates can affect extrinsic value. High interest rates increase the cost of carrying the underlying asset, which increases the extrinsic value of call options and decreases the extrinsic value of put options.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Moneyness</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Moneyness">A term describing the relationship between an option&apos;s strike price and the underlying asset&apos;s current price.</KeyTerm> is a term used in options trading that refers to the relationship between an option&apos;s price and the price of the underlying asset. It helps traders determine how close to being profitable an option is.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">In-the-Money (ITM) Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        An option is considered <KeyTerm term="in-the-money">When an option can be exercised for a profit based on the current price of the underlying.</KeyTerm> when it can be exercised for a profit.
      </p>

      <Callout type="info">
        A call option is <strong className="font-semibold text-text-primary">in-the-money</strong> when the strike price is <strong className="font-semibold text-text-primary">lower</strong> than the current market price.
      </Callout>

      <Callout type="tip">
        A put option is <strong className="font-semibold text-text-primary">in-the-money</strong> when the strike price is <strong className="font-semibold text-text-primary">higher</strong> than the current market price.
      </Callout>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Example:</strong> Suppose you bought a call option on ETH with a strike price of $1,600 when ETH was trading at $1,500. At expiration, ETH has risen to $1,700, making your option in-the-money. You can exercise the option to buy ETH at a discount and sell it for a profit — as long as the profit exceeds the premium and fees paid.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Out-of-the-Money (OTM) Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        An option is considered <KeyTerm term="out-of-the-money">When an option has not reached its strike price and cannot currently be exercised for a profit.</KeyTerm> when it has not reached its strike price and cannot be exercised for a profit.
      </p>

      <Callout type="info">
        A call option is <strong className="font-semibold text-text-primary">out-of-the-money</strong> when the strike price is <strong className="font-semibold text-text-primary">higher</strong> than the current market price.
      </Callout>

      <Callout type="tip">
        A put option is <strong className="font-semibold text-text-primary">out-of-the-money</strong> when the strike price is <strong className="font-semibold text-text-primary">lower</strong> than the current market price.
      </Callout>

      <p className="text-text-secondary leading-relaxed mb-4">
        OTM options still have value before expiration — there&apos;s a chance they could become in-the-money if the strike price is reached.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">At-the-Money (ATM) Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        An option is considered <strong className="font-semibold text-text-primary">at-the-money</strong> when its strike price is at or very near the current market price. ATM options have no intrinsic value but may have extrinsic value depending on how much time is left before expiration.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Moneyness is essential when trading options and goes hand-in-hand with intrinsic and extrinsic value. ITM options have intrinsic value and can be exercised for a profit. OTM options cannot currently be exercised profitably but aren&apos;t worthless if time remains. ATM options have no intrinsic value but may have significant extrinsic value.
      </p>

      <Quiz
        question="What is the extrinsic value of an option?"
        answers={["The time value derived from an option's potential of expiring in-the-money before expiry", "The inherent value of an option", "The profit made from exercising the option"]}
        correctIndex={0}
      />
    </>
  )
}
