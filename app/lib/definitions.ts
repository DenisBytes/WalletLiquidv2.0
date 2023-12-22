export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  usdc: number;
  futuresPageLastLogin?: Date;
  options_progress: Array<number>;
  futures_progress: Array<number>;
};


export type FuturesOrder = {
  id: string;
  user_id: string;
  symbol: "BTC" | "ETH";
  type: "MARKET" | "LIMIT";
  status: "OPEN" | "CLOSED" | "PENDING";
  side: "LONG" | "SHORT";
  price: number;
  leverage: number;
  liquidation_price: number;
  usdc_size: number;
  take_profit?: number;
  stop_loss?: number;
  pnl?: number;
  close_price?: number;
  time: Date;
  closed_time?: Date;
}
