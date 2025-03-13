<script setup lang="ts">
const { $restClient } = useNuxtApp()


const { data: account } = await useAsyncData(
  'account-info',
  () => $restClient.accountInformation({
    omitZeroBalances: true
  })
);


const { data: status } = await useAsyncData(
  'account-status',
  async () => {
    return (await $restClient.accountStatus({})).data
  }
);

</script>

<template>
  <QLayout>
    <q-page-container>

      <div>
        <p>UID</p>
        <p>{{ account?.uid }}</p>
        <p>Status: {{ status }}</p>
      </div>

      <q-banner class="" rounded inline-actions>
        <!-- <p>
          Estimated Balance
        </p> -->

        <template v-slot:action>
          <q-btn flat label="Deposit" />
          <q-btn flat label="Withdraw" />
          <q-btn flat label="Cash In" />
        </template>
      </q-banner>

      <Rates/>

    </q-page-container>
  </QLayout>

</template>
