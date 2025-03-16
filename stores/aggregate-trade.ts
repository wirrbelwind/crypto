import { defineStore } from 'pinia'

interface AggregateTradeState {
  symbol: string
  price: string
}

export const useAggregateTrade = defineStore('aggregate-trade', {
  state: (): AggregateTradeState => {
    return {
      symbol: '<currency-symbol>',
      price: '0',
    }
  },
  actions: {
  },
  getters: {
    formattedPrice: state => {
      return parseFloat(state.price).toFixed(3)
    }
  }
})
