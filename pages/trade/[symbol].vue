<script setup lang="ts">
import { BinanceSymbolWSS } from '~/utils/binance-ws-stream/BinanceSymbolWSS'
import { useSymbolStore } from '../../stores/symbol'

const route = useRoute()
const symbolUrlParam = Array.isArray(route.params.symbol)
  ? route.params.symbol[0]
  : route.params.symbol

let wss: BinanceSymbolWSS

const symbolStore = useSymbolStore()

onMounted(async () => {
  symbolStore.$patch({
    symbol: symbolUrlParam,
  })

  wss = new BinanceSymbolWSS(symbolUrlParam, {
    baseUrl: 'wss://stream.binance.com:9443',
    messageHandlers: {
      aggTrade: [
        (message) => {
          symbolStore.$patch({
            // @ts-expect-error qweqeqeqeqeq
            _price: message.p,
          })
        },
      ],
      kline: [
        (message) => {
          symbolStore.$patch({
            kline: message,
          })
        },
      ],
    },
  })
  await wss.connect()
  wss.aggTrade()
  wss.kline(1, 'M')
})

onUnmounted(() => {
  wss?.disconnect()
})
</script>

<template>
  <div>
    <p>Price {{ symbolStore.symbol }}: {{ symbolStore.price }}</p>

    <p>candles: {{ symbolStore.kline }}</p>
  </div>
</template>
