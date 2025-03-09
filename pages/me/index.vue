<script setup lang="ts">
const { data, error } = useFetch("/api/account");
</script>

<template>
    {{ data }}
    <h1>--------</h1>
    {{ error }}
</template>
