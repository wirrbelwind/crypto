<script setup lang="ts">
import { BinanceSymbolWSS } from '~/utils/binance-ws-stream/BinanceSymbolWSS'

const route = useRoute()
const symbol = Array.isArray(route.params.symbol) ? route.params.symbol[0] : route.params.symbol 

let wss: BinanceSymbolWSS

const aggregateTradeStore = useAggregateTrade()

onMounted(async () => {
  aggregateTradeStore.$patch({
    symbol: symbol,
  })

  wss = new BinanceSymbolWSS(symbol, {
    baseUrl: 'wss://stream.binance.com:9443',
    messageHandlers: {
      aggTrade: [
        (message) => {
          aggregateTradeStore.$patch({
            // @ts-expect-error qwertyyuuuu
            price: message.p,
          })
        },
      ],
    },
  })
  await wss.connect()
  wss.aggTrade()
})

onUnmounted(() => {
  wss?.disconnect()
})

</script>

<template>
  <p>Price {{ aggregateTradeStore.symbol }}: {{ aggregateTradeStore.formattedPrice }}</p>
</template>
