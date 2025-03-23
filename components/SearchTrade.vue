<script lang="ts" setup>
const { $restClient } = useNuxtApp()

const { data: allSymbols } = useAsyncData('symbols', async () => {
  const symbols = await $restClient.exchangeInformation()

  const result = symbols.symbols.map((symbolData) => ({
    label: `${symbolData.baseAsset} -> ${symbolData.quoteAsset}`,
    value: symbolData.symbol,
    href: `/trade/${symbolData.symbol}`,
  }))

  return result
})

const searchTerm = ref('')
const showSearchResults = computed(() => !!searchTerm.value)
const searchResults = ref<null | Array<{
  label: string
  value: string
  href: string
}>>(null)

const initialSuggestions = [
  {
    label: 'BTC -> USDT',
    value: 'btcusdt',
    href: `/trade/btcusdt`,
  },
  {
    label: 'BNB -> USDT',
    value: 'bnbusdt',
    href: `/trade/bnbusdt`,
  },
]

watch(
  [searchTerm, showSearchResults],
  ([term, showSearch]) => {
    if (!showSearch) {
      return
    }

    searchResults.value =
      allSymbols.value?.filter((symbol) => {
        return symbol.value.toLowerCase().includes(term.toLowerCase())
      }) ?? []
  }
)
</script>

<template>
  <div>
    <p>{{ allSymbols?.length }}</p>
    <p></p>
    <q-btn-dropdown color="primary" label="Select a trade">
      <q-input v-model="searchTerm" autofocus>
        <template v-slot:append>
          <q-icon
            v-if="searchTerm !== ''"
            name="close"
            @click="searchTerm = ''"
            class="cursor-pointer"
          />
        </template>

        <template #prepend>
          <q-icon name="search" size="2rem" />
        </template>
      </q-input>

      <template v-if="showSearchResults">
        <template v-if="searchResults?.length">
          <q-list v-for="symbol in searchResults" :key="symbol.value">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  <nuxt-link :href="symbol.href">{{ symbol.label }}</nuxt-link>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
        <template v-else>
          <p class="text-center">Zero results</p>
          <q-separator spaced color="primary" />
        </template>
      </template>

      <template v-if="!showSearchResults || !searchResults?.length">
        <q-list>
          <p class="text-center">Popular trades</p>
          <q-item
            clickable
            v-close-popup
            :key="symbol.value"
            v-for="symbol in initialSuggestions"
          >
            <q-item-section>
              <q-item-label>
                <nuxt-link :to="symbol.href">
                  {{ symbol.label }}
                </nuxt-link>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-btn-dropdown>
  </div>
</template>
