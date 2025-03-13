import { Spot } from "@binance/connector-typescript";

export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const config = useRuntimeConfig();

    const restClient = new Spot(config.public.apiKey, config.public.secretKey);

    return {
      provide: {
        restClient,
      },
    };
  },
});
