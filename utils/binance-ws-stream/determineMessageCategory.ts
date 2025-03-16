import type { AggTradeResponse, KlineResponse, PartialBookDepth } from './types'

export function determineMessageCategory(message: string) {
  const data = JSON.parse(message)
  // as Responses[keyof Responses]

  if(data.error) {
    throw new Error(data.error.msg)
  }

  if (data.e === 'aggTrade') {
    return data as AggTradeResponse
  }

  if (data.e === 'kline') {
    return data as KlineResponse
  }

  if (data.lastUpdateId && data.bids && data.asks) {
    return {
      ...data,
      e: 'partialBookDepth',
    } as PartialBookDepth
  }

  return null
}
