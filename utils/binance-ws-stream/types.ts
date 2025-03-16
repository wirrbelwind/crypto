export interface BinanceMessage {
  e: string
  s: string
}

export interface AggTradeResponse extends BinanceMessage {
  e: 'aggTrade'
  E: number
  a: number
  p: string
  q: string
  f: number
  l: number
  T: number
  m: boolean
  M: boolean
}

// export interface TradeResponse {
//   e: 'trade'
//   E: number
//   s: string
//   t: number
//   p: string
//   q: string
//   T: number
//   m: boolean
//   M: boolean
// }

export interface KlineResponse extends BinanceMessage {
  e: 'kline'
  E: number
  k: {
    t: number
    T: number
    s: string
    i: string
    f: number
    L: number
    o: string
    c: string
    h: string
    l: string
    v: string
    n: number
    x: false
    q: string
    V: string
    Q: string
    B: string
  }
}

export interface PartialBookDepth extends BinanceMessage {
  e: 'partialBookDepth'
  lastUpdateId: number // Last update ID
  bids: Array<[string, string]>
  asks: Array<[string, string]>
}

export type HandlerKey = string