import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Calls and Puts</h1>

      <Callout type="info">
        In this chapter, you will learn about financial derivatives, why and when derivatives are used, and the differences between options and futures.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Are Derivatives?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Financial derivatives are a versatile alternative to traditional investing. They provide a way for investors to manage risk, protect their investments, and potentially profit from market movements without directly owning the underlying asset.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The value of a financial <KeyTerm term="derivative">A financial contract whose value is derived from an underlying asset.</KeyTerm> is generally derived from an asset or a group of assets, such as ETH or a liquidity pool.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Different types of derivatives (such as perpetual futures and options) vary greatly, and each of them serve a specific purpose.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">What Are Derivatives Useful For?</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        There are several reasons why traders and investors may choose to use financial derivatives instead of simply buying an asset.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Leverage:</strong> Financial derivatives often allow traders to use leverage — controlling a larger amount of an asset with a relatively small initial investment. Using leverage amplifies potential gains, while also increasing potential losses.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Speculation:</strong> Traders can use derivatives to make bets about what might happen in the future. If a trader believes ETH will go up in price, they could use a call option or a perpetual futures contract.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Hedging:</strong> Derivatives can be used to hedge existing positions — reducing the potential risks of an asset or investment without having to sell the asset.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Flexibility:</strong> Derivatives offer more flexibility compared to traditional investments. They can be customized to fit various strategies, timeframes, and risk appetites.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Derivatives in Practice</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Futures:</strong> Bob believes that the price of ETH will fall in the near-term. Bob enters a &quot;short&quot; position that locks him into selling ETH at the current price in the future. If ETH falls in price, Bob profits. If ETH rises, Bob takes a loss.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Options:</strong> Bob just entered a short position on ETH. To protect himself, he buys ETH call options that give him the right to buy ETH at a certain price. If ETH falls, Bob profits from his short and only loses the call premium. If ETH rises, the calls offset his short losses.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Differences Between Futures and Options</h2>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Nature of the Contract:</strong> Futures are <em>agreements</em> to buy or sell an asset at a fixed price and time, while options give their buyer the <em>choice</em> to buy or sell.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Profit Potential:</strong> Futures offer theoretically unlimited profit <em>and</em> loss potential, while options have limited loss potential (the premium paid).
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Risk and Reward:</strong> Futures are riskier because they are binding — the buyer is <em>obligated</em> to fulfill the contract. Options provide the buyer with a <em>choice</em>.
      </Callout>

      <Callout type="info">
        <strong className="font-semibold text-text-primary">Pricing:</strong> Futures generally have a fixed price determined by the market, while option prices are determined with complex pricing models like Black-Scholes.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Financial derivatives are an alternative and powerful investment tool. Derivatives can enable investors and traders to manage risk, protect their investments, and potentially profit from market movements without directly owning an asset.
      </p>

      <Quiz
        question="Where does a derivative generally get its value from?"
        answers={["A real-life asset like oil or gold", "An asset or group of assets such as ETH or a liquidity pool", "An option's strike price"]}
        correctIndex={1}
      />
    </>
  )
}
