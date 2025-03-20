<script setup lang="ts">
import { BinanceSymbolWSS } from '~/utils/binance-ws-stream/BinanceSymbolWSS'
import { useSymbolStore } from '../../stores/symbol'

const symbolStore = useSymbolStore()

const route = useRoute()
const symbolUrlParam = Array.isArray(route.params.symbol)
  ? route.params.symbol[0]
  : route.params.symbol

let wss: BinanceSymbolWSS

const chartData = ref({
  series: [
    {
      data: [],
    },
  ],
  chartOptions: {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  },
})

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
          const k = message.k 

          const candle = {
            x: new Date(message.E), 
            y: [
              parseFloat(k.o), // Open
              parseFloat(k.h), // High
              parseFloat(k.l), // Low
              parseFloat(k.c), // Close
            ],
          }

          chartData.value.series[0].data.push(candle)

          if (chartData.value.series[0].data.length > 100) {
            chartData.value.series[0].data.shift()
          }
        },
      ],
    },
  })
  await wss.connect()
  wss.aggTrade()
  wss.kline(5, 'm')
})

onUnmounted(() => {
  wss?.disconnect()
})
</script>

<template>
  <div>
    <apexchart
      type="candlestick"
      height="350"
      :options="chartData.chartOptions"
      :series="chartData.series"
    />
    <p>Price {{ symbolStore.symbol }}: {{ symbolStore.price }}</p>

    <p>candles: {{ symbolStore.kline }}</p>

    <button @click="() => wss?.disconnect()">disconnect</button>
  </div>
</template>
