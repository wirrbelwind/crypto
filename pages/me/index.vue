<script setup lang="ts">
const { $restClient } = useNuxtApp()

const { data: account } = await useAsyncData('account-info', () =>
  $restClient.accountInformation({
    omitZeroBalances: true,
  })
)

const { data: status } = await useAsyncData('account-status', async () => {
  return (await $restClient.accountStatus({})).data
})

</script>

<template>
  <p></p>
</template>
