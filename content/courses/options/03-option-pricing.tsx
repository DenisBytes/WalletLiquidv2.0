import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Option Pricing Basics</h1>

      <Callout type="info">
        In this chapter, you will learn about the components of options, basic terminology, and key definitions including the strike price, expiration date, and premium.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Options Components</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options are financial instruments that give the buyer the right, but not the obligation, to buy or sell an underlying asset at a specified price (the <KeyTerm term="strike price">The predetermined price at which an option can be exercised.</KeyTerm>) and date (the <KeyTerm term="expiration date">The last day an option can be exercised or traded.</KeyTerm>).
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        From the strike price to the premium, understanding the key components of an option is essential for using options successfully.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Call Options</strong> give their buyer the right to <strong className="font-semibold text-text-primary">buy</strong> the underlying asset at the specified strike price and expiration date. Calls are typically bought when expecting prices to increase.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Put Options</strong> give their buyer the right to <strong className="font-semibold text-text-primary">sell</strong> the underlying asset at the specified strike price and expiration date. Puts are typically bought when expecting prices to decrease.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Strike Price</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The <strong className="font-semibold text-text-primary">strike price</strong> is the predetermined price at which an option gives its holder the right to buy (call) or sell (put) the underlying asset. The strike price is agreed upon by both the buyer and the seller when the option is created.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Call Options</strong> give their holder the right to <strong className="font-semibold text-text-primary">buy</strong> an asset at the strike price.</li>
        <li><strong className="font-semibold text-text-primary">Put Options</strong> give their holder the right to <strong className="font-semibold text-text-primary">sell</strong> an asset at the strike price.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Expiration Date</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The <strong className="font-semibold text-text-primary">expiration date</strong> is the last day an option can be exercised or traded.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        After the expiration date, the option becomes worthless, and the buyer loses the right to buy or sell the underlying asset at the strike price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options can have various expiration dates, ranging from days to months or even years. In general, the longer the time until expiration, the more expensive the option premium will be — the buyer has more time for the asset&apos;s price to move in their favor.
      </p>

      <Callout type="info">
        A call option with an expiration date one year from now is generally more expensive than a call option with an expiration date only one month from now.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Option Premium</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The <KeyTerm term="premium">The price the buyer pays to acquire an option contract.</KeyTerm> is the price the buyer pays to acquire the option contract.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The premium is determined by various factors, including the current market price of the underlying asset, the strike price, the time until expiration, and the implied volatility.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options with longer expiration dates or higher implied volatility generally have higher premiums.
      </p>

      <Callout type="tip">
        The premium for an option becomes more expensive as the likelihood of reaching the strike price increases.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Option Size</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Option size</strong> (position size) is the amount of assets that an option represents.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The contract size is generally defined in terms of the asset, such as 0.1 ETH, 0.5 ETH, 1 ETH, and so on.
      </p>

      <Callout type="info">
        A call option on ETH with a contract size of 10 ETH gives you the right to buy 10 ETH at the strike price.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">European vs American Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        There are two main exercise styles: <strong className="font-semibold text-text-primary">European</strong> and <strong className="font-semibold text-text-primary">American</strong>.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">European options</strong> can only be exercised at the expiration date.</li>
        <li><strong className="font-semibold text-text-primary">American options</strong> can be exercised at any time before the expiration date.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        American options generally have a higher premium than equivalent European options, as the ability to exercise at any time offers additional flexibility to the buyer.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Understanding the key components of options is essential. The likelier an option is to make a profit for its buyer, the more expensive it is. Options with longer expiration dates, higher implied volatility, and larger sizes generally have higher premiums.
      </p>

      <Quiz
        question="What is the strike price?"
        answers={["The price of an option", "The date an option can be exercised", "The price at which an option gives you the right to buy or sell the underlying asset"]}
        correctIndex={2}
      />
    </>
  )
}
