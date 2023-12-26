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
  is_done11: boolean;
  is_done12: boolean;
  is_done13: boolean;
  is_done14: boolean;
  is_done15: boolean;
  is_done16: boolean;
  is_done17: boolean;
  is_done18: boolean;
  is_done19: boolean;
  is_done20: boolean;
}