// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@nuxt/eslint'],

  runtimeConfig: {
    public: {
      apiKey: 'placeholder',
      secretKey: 'placeholder'
    }
  },
  typescript: {
    typeCheck: true
  }
})