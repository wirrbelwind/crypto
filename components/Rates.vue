<script setup lang="ts">
const config = useRuntimeConfig()

const exchange = ref<string>('')
let ws: WebSocket

onMounted(() => {
  ws = new WebSocket('wss://stream.binance.com:9443/ws/BNBBTC@aggTrade')

  ws.onopen = (event) => {
    console.info('Open', event)

    ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: ['btcusdt@aggTrade'],
        id: 2,
      })
    )
  }
  ws.onmessage = (event) => {
    console.log('new data')
    exchange.value = parseFloat(JSON.parse(event.data).p).toFixed(3)
  }
  ws.onerror = (event) => {
    console.error('Error', event)
  }

  ws.onclose = (event) => {
    console.log('Closed', event)
  }

  console.log('client', ws)
})

onUnmounted(() => {
  ws.close()
})

// const wsClient = new WebsocketAPI(
//   config.public.apiKey,
//   config.public.secretKey,
//   {
//     callbacks: {
//       open: (client: WebsocketAPI) => client.exchangeInfo(),
//       close: () => console.debug("Disconnected from WebSocket server"),
//       message: (data: string) => {
//         exchange.value = data
//       },
//     },
//   }
// );
</script>

<template>
  <p>BTC to USDT: ${{ exchange }}</p>
</template>
