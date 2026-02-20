import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">What Are Futures?</h1>

      <Callout type="info">
        In this chapter, you will learn what futures contracts are, how they differ from spot trading, why traders use them, and how futures evolved from commodities markets to become the dominant instrument in crypto trading.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Understanding Futures Contracts</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="futures contract">A standardized agreement between two parties to buy or sell an asset at a predetermined price at a specified time in the future.</KeyTerm> is one of the oldest financial instruments in existence.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Imagine you are a wheat farmer. You know your harvest will be ready in three months, but you are worried that wheat prices might drop by then. To protect yourself, you agree today to sell your wheat at a fixed price three months from now. The buyer — perhaps a bakery — agrees because they want certainty about their costs. Both sides have locked in a price, regardless of what happens in the market.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This is the essence of a futures contract: an agreement to exchange an asset at a future date for a price decided today.
      </p>

      <Callout type="info">
        Unlike buying an asset outright, a futures contract is a <strong className="font-semibold text-text-primary">derivative</strong> — its value is derived from the price of an underlying asset like BTC or ETH, rather than being the asset itself.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Futures vs. Spot Trading</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        In <KeyTerm term="spot trading">Buying or selling an asset for immediate delivery at the current market price.</KeyTerm>, you buy BTC and own it immediately. If BTC is trading at $60,000, you pay $60,000 and receive 1 BTC in your wallet. Simple.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        With futures trading, you do not buy or sell BTC itself. Instead, you enter a contract that tracks the price of BTC. You are speculating on whether the price will go up or down, without ever taking physical delivery of the asset.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Key difference:</strong> In spot trading, you own the asset. In futures trading, you hold a contract that represents exposure to the asset's price movement.
      </Callout>

      <p className="text-text-secondary leading-relaxed mb-4">
        Here is a practical comparison:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Spot:</strong> You buy 1 BTC at $60,000. BTC rises to $65,000. You sell and profit $5,000.</li>
        <li><strong className="font-semibold text-text-primary">Futures:</strong> You open a long futures contract worth 1 BTC at $60,000. BTC rises to $65,000. You close the contract and profit $5,000 — but you never actually held any BTC.</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        The outcome looks similar, but futures offer several advantages that make them far more powerful (and dangerous) than spot trading.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Traders Use Futures</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Futures contracts unlock capabilities that are simply not available in spot markets.
      </p>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Leverage:</strong> Futures allow you to control a large position with a small amount of capital. Instead of needing $60,000 to get exposure to 1 BTC, you might only need $600 with 100x leverage.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Short selling:</strong> Futures let you profit from falling prices. If you believe ETH will drop from $3,000 to $2,500, you can open a short position and profit from the decline — something that is difficult or impossible in spot markets.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Hedging:</strong> If you hold BTC in your portfolio and are worried about a short-term price drop, you can open a short futures position to offset potential losses without selling your actual BTC.
      </Callout>

      <Callout type="tip">
        <strong className="font-semibold text-text-primary">Capital efficiency:</strong> Because futures require only a fraction of the total position value as collateral (called margin), traders can deploy their capital more efficiently across multiple positions.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">A Brief History: From Grain to Bitcoin</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Futures contracts have been around for centuries. The first organized futures exchange was the Dojima Rice Exchange in Osaka, Japan, established in 1697. Rice merchants and samurai used standardized contracts to trade future rice deliveries, managing the risk of price fluctuations between harvests.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        In the 1800s, the Chicago Board of Trade (CBOT) formalized futures trading for grain and agricultural commodities in the United States. Over the following century, futures expanded to cover oil, gold, currencies, and stock indices.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        When Bitcoin emerged in 2009, it was only a matter of time before futures followed. The Chicago Mercantile Exchange (CME) launched Bitcoin futures in December 2017, bringing crypto into the world of regulated derivatives. Meanwhile, crypto-native exchanges like BitMEX pioneered <strong className="font-semibold text-text-primary">perpetual contracts</strong> — a new type of futures contract without an expiration date — which quickly became the most traded instrument in all of crypto.
      </p>

      <Callout type="info">
        Today, crypto futures trading volume regularly exceeds spot trading volume by a factor of 3 to 5. On major exchanges, billions of dollars in futures contracts change hands every day.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The Risks</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Futures are powerful, but they carry significant risks that spot trading does not.
      </p>

      <Callout type="warning">
        <strong className="font-semibold text-text-primary">Liquidation risk:</strong> Because futures use leverage, a relatively small price movement against your position can wipe out your entire margin. This is called liquidation, and it means you lose all the capital you put into the trade — instantly.
      </Callout>

      <Callout type="warning">
        <strong className="font-semibold text-text-primary">Amplified losses:</strong> Leverage amplifies losses just as much as it amplifies gains. A 10x leveraged position loses 10% of its value for every 1% the price moves against you.
      </Callout>

      <p className="text-text-secondary leading-relaxed mb-4">
        Understanding these risks is essential before trading futures. The chapters that follow will teach you exactly how leverage, margin, and liquidation work so you can manage your risk effectively.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Futures contracts are agreements to buy or sell an asset at a future date for a price set today. They differ from spot trading because you never own the underlying asset — you are trading exposure to its price. Futures offer leverage, short selling, and hedging capabilities, but they also introduce liquidation risk and amplified losses. Originally developed for commodities like rice and wheat, futures are now the dominant trading instrument in crypto markets.
      </p>

      <Quiz
        question="What is the primary difference between spot trading and futures trading?"
        answers={["Spot trading is faster than futures trading", "In spot trading you own the asset; in futures trading you hold a contract tracking its price", "Futures trading has no risk", "Spot trading allows leverage"]}
        correctIndex={1}
      />
    </>
  )
}
