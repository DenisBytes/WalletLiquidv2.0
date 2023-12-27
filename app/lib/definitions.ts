export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  usdc: number;
  futures_page_last_login?: Date;
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


export type FuturesLearn = {
  id: string;
  user_id: string;
  is_done1: boolean; 
  is_done2: boolean;
  is_done3: boolean;
  is_done4: boolean;
  is_done5: boolean;
  is_done6: boolean;
  is_done7: boolean;
  is_done8: boolean;
  is_done9: boolean;
  is_done10: boolean;
}

export type OptionsLearn = {
  id: string;
  user_id: string;
  chapter1: boolean;
  chapter2: boolean;
  chapter3: boolean;
  chapter4: boolean;
  chapter5: boolean;
  chapter6: boolean;
  chapter7: boolean;
  chapter8: boolean;
  chapter9: boolean;
  chapter10: boolean;
  chapter11: boolean;
  chapter12: boolean;
  chapter13: boolean;
  chapter14: boolean;
  chapter15: boolean;
  chapter16: boolean;
  chapter17: boolean;
  chapter18: boolean;
  chapter19: boolean;
  chapter20: boolean
}