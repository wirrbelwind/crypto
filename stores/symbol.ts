import { defineStore } from 'pinia'

interface AggregateTradeState {
  symbol: string
  _price: string
}

export const useSymbolStore = defineStore('aggregate-trade', {
  state: (): AggregateTradeState => {
    return {
      symbol: '<currency-symbol>',
      _price: '0',
    }
  },
  actions: {
  },
  getters: {
    price: state => {
      return parseFloat(state._price).toFixed(3)
    }
  }
})
