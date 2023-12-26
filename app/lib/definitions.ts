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
  is_done_first: boolean; 
  is_done_second: boolean;
  is_done_third: boolean;
  is_done_fourth: boolean;
  is_done_fifth: boolean;
  is_done_sixth: boolean;
  is_done_seventh: boolean;
  is_done_eighth: boolean;
  is_done_ninth: boolean;
  is_done_tenth: boolean;
  is_done_eleventh: boolean;
  is_done_twelfth: boolean;
  is_done_thirteenth: boolean;
  is_done_fourteenth: boolean;
  is_done_fifteenth: boolean;
  is_done_sixteenth: boolean;
  is_done_seventeenth: boolean;
  is_done_eighteenth: boolean;
  is_done_nineteenth: boolean;
  is_done_twentieth: boolean
}