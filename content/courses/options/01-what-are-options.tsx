import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">What Are Options?</h1>

      <Callout type="info">
        In this chapter, you will learn about options, call and put options, and what options are used for.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options are a type of financial derivative that give their buyer the right, but not the obligation, to buy or sell an asset like ETH at a certain time and price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For example, an option could give you the right to buy 1 ETH at a price of $2,000 next Sunday.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        There are two main types of options: <strong className="font-semibold text-text-primary">call options</strong> and <strong className="font-semibold text-text-primary">put options</strong>.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Investors typically buy call options when they anticipate prices to rise, and put options when they anticipate prices to fall.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Call Options</strong> grant their holder the right to buy an asset at a specified price and date.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Put Options</strong> grant their holder the right to sell an asset at a specified price and date.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Call Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="call option">An option that gives the holder the right to buy an asset at a specified price.</KeyTerm> is similar to reserving a table at a popular restaurant.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        You call ahead and pay a fee to the restaurant to reserve a table for a specific date and time. This way, you secure a spot at the restaurant and can enjoy a nice meal, but you&apos;re not obligated to show up if something comes up.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If you do show up, you have the option to order from the menu and pay the listed prices. But if you don&apos;t show up, the restaurant keeps the reservation fee you paid.
      </p>

      <Callout type="info">
        Buying a <strong className="font-semibold text-text-primary">call option</strong> is similar to paying upfront for a table at a restaurant — even though you&apos;ve secured the table, you only lose what you paid for the reservation if you decide not to go.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Put Options</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="put option">An option that gives the holder the right to sell an asset at a specified price.</KeyTerm> is like having a home insurance policy.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        When you buy a home insurance policy, you pay a premium to the insurance company to protect your home from potential damage or loss. If your home is damaged or destroyed, you can file a claim and the insurance company will pay out the agreed-upon amount to cover your losses.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If nothing happens to your home, you&apos;ll still lose what you paid for the insurance, but you can sleep well knowing you&apos;re protected.
      </p>

      <Callout type="info">
        Buying a <strong className="font-semibold text-text-primary">put option</strong> is similar to paying upfront for insurance — you&apos;re protected if something goes wrong.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Are Options Useful For?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options are inherently flexible and cheap in comparison to simply buying or selling assets, and their unique properties unlock multiple avenues of utilization.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Leverage:</strong> Options allow traders to control a larger amount of an asset with a relatively small initial investment, potentially amplifying gains but also increasing potential loss.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Risk Management:</strong> Options can be used to provide some protection to your existing holdings and positions without having to sell your assets.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Income Generation:</strong> Investors can use different options strategies to generate additional income from their existing holdings.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Speculation:</strong> Options can be used to speculate on the price of an asset and its potential price range. Traders can profit from both upward and downward market movements.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Options are the most versatile and flexible tool for investing. By understanding the fundamentals of options thoroughly, traders gain a powerful weapon for their portfolio.
      </p>

      <Quiz
        question="What are the two main types of basic options?"
        answers={["Long calls and short calls", "Calls and puts", "Straddles and spreads"]}
        correctIndex={1}
      />
    </>
  )
}
