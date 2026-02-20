import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Going Long and Short</h1>

      <Callout type="info">
        In this chapter, you will learn what it means to go long and short in futures trading, how profit and loss are calculated for each direction, when to use each strategy, and see detailed examples using BTC and ETH.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Two Directions, One Market</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        In spot trading, you can really only profit when prices go up: buy low, sell high. Futures trading removes this limitation entirely. With futures, you can profit from price movements in <strong className="font-semibold text-text-primary">either direction</strong> — up or down.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This is possible because futures contracts are agreements, not ownership. You do not need to own BTC to bet that its price will fall. You simply enter a contract that pays you when the price moves in your predicted direction.
      </p>

      <Callout type="info">
        The ability to profit from both rising and falling markets is one of the most powerful advantages of futures trading over spot trading.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Going Long</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="long position">A trade that profits when the price of the asset increases. The trader buys a contract expecting to sell it later at a higher price.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Going long means you are betting that the price will go <strong className="font-semibold text-text-primary">up</strong>. When you open a long position, you are essentially buying the futures contract at the current price with the expectation of closing it at a higher price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">How long positions profit:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>You enter the trade at a certain price (your entry price)</li>
        <li>If the price rises above your entry, you are in profit</li>
        <li>If the price falls below your entry, you are at a loss</li>
        <li>Your profit or loss is the difference between the exit price and the entry price, multiplied by your position size</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Long Position Example: BTC</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You believe Bitcoin will rise from its current price of $60,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Entry price:</strong> $60,000</li>
        <li><strong className="font-semibold text-text-primary">Position size:</strong> 0.5 BTC ($30,000 notional value)</li>
        <li><strong className="font-semibold text-text-primary">Direction:</strong> Long</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Scenario A — Price rises to $64,000:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Price change: +$4,000 per BTC</li>
        <li>Your profit: $4,000 x 0.5 = <strong className="font-semibold text-text-primary">+$2,000</strong></li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Scenario B — Price drops to $57,000:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Price change: -$3,000 per BTC</li>
        <li>Your loss: $3,000 x 0.5 = <strong className="font-semibold text-text-primary">-$1,500</strong></li>
      </ul>

      <Callout type="tip">
        Think of a long position as the futures equivalent of "buy low, sell high." You enter the trade expecting the price to increase, and you profit from every dollar the price moves upward.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Going Short</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="short position">A trade that profits when the price of the asset decreases. The trader sells a contract expecting to buy it back later at a lower price.</KeyTerm>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Going short means you are betting that the price will go <strong className="font-semibold text-text-primary">down</strong>. When you open a short position, you are selling the futures contract at the current price with the expectation of buying it back (closing it) at a lower price.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This concept can feel counterintuitive at first. How can you sell something you do not own? In futures trading, you are not selling an actual asset — you are entering a contract. The exchange matches you with someone on the other side of the trade. If the price drops, the contract is worth less, and the difference is your profit.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">How short positions profit:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>You enter the trade at a certain price (your entry price)</li>
        <li>If the price falls below your entry, you are in profit</li>
        <li>If the price rises above your entry, you are at a loss</li>
        <li>Your profit or loss is the difference between the entry price and the exit price, multiplied by your position size</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Short Position Example: ETH</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You believe Ethereum will decline from its current price of $3,000.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Entry price:</strong> $3,000</li>
        <li><strong className="font-semibold text-text-primary">Position size:</strong> 5 ETH ($15,000 notional value)</li>
        <li><strong className="font-semibold text-text-primary">Direction:</strong> Short</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Scenario A — Price drops to $2,700:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Price change: -$300 per ETH (in your favor)</li>
        <li>Your profit: $300 x 5 = <strong className="font-semibold text-text-primary">+$1,500</strong></li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Scenario B — Price rises to $3,200:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Price change: +$200 per ETH (against you)</li>
        <li>Your loss: $200 x 5 = <strong className="font-semibold text-text-primary">-$1,000</strong></li>
      </ul>

      <Callout type="tip">
        Think of a short position as "sell high, buy low." You profit when the price falls because you entered the contract at a higher price than where you exit it.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The PnL Formula</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        For both long and short positions, the <KeyTerm term="PnL (Profit and Loss)">The financial gain or loss resulting from a trade, calculated as the difference between entry and exit prices multiplied by position size.</KeyTerm> formula is straightforward:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Long PnL</strong> = (Exit Price - Entry Price) x Position Size
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Short PnL</strong> = (Entry Price - Exit Price) x Position Size
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Notice that the formulas are mirror images of each other. For a long, you want the exit price to be higher. For a short, you want the exit price to be lower.
      </p>

      <Callout type="info">
        These formulas calculate your PnL <strong className="font-semibold text-text-primary">before</strong> leverage. When leverage is applied, the PnL is the same in dollar terms, but it represents a much larger percentage return on your actual margin. We will cover this in detail in the next chapter.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">When to Go Long vs. Short</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Choosing between long and short depends on your market outlook:
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Go long when:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>You expect the price to rise based on your analysis</li>
        <li>There is bullish momentum, positive news, or strong support levels</li>
        <li>The broader market trend is upward</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Go short when:</strong>
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>You expect the price to fall based on your analysis</li>
        <li>There is bearish momentum, negative news, or major resistance levels</li>
        <li>The broader market trend is downward</li>
      </ul>

      <Callout type="warning">
        <strong className="font-semibold text-text-primary">Never trade based on hope or gut feeling alone.</strong> Every long or short position should be backed by a clear thesis — technical analysis, fundamental analysis, or both. Trading without a plan is gambling, and futures leverage makes gambling extremely expensive.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Hedging with Short Positions</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Short positions are not only for speculation. They are also a powerful hedging tool.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Suppose you hold 2 BTC in your spot wallet, currently worth $120,000. You are worried about a potential short-term decline but do not want to sell your BTC (perhaps for tax reasons, or because you are long-term bullish).
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        You can open a short futures position equivalent to 2 BTC. If BTC drops 10%, your spot holdings lose $12,000 — but your short futures position gains approximately $12,000. Your total portfolio value stays roughly the same.
      </p>

      <Callout type="tip">
        Hedging with shorts lets you protect your portfolio during uncertain times without selling your actual holdings. This is one of the most practical uses of futures for long-term investors.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Going long means betting the price will rise; going short means betting it will fall. Both directions use the same PnL mechanics — the difference between entry and exit prices, multiplied by position size. Long positions profit from upward moves, short positions profit from downward moves. Short selling also enables hedging, allowing you to protect spot holdings without selling them. Every position should be backed by analysis, not emotion.
      </p>

      <Quiz
        question="If you open a short position on ETH at $3,000 and close it at $2,600, what happens?"
        answers={["You lose $400 per ETH", "You profit $400 per ETH", "You break even", "The position is automatically liquidated"]}
        correctIndex={1}
      />
    </>
  )
}
