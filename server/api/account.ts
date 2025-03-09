import { defineEventHandler } from "h3";
import crypto from "crypto";

const BASE_URL = "https://api.binance.com";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const timestamp = Date.now().toString();
  const omitZeroBalances = "true"; 

  const params = new URLSearchParams({
    timestamp,
    omitZeroBalances: 'true'
  });

  const signature = crypto
    .createHmac("sha256", config.public.secretKey)
    .update(params.toString())
    .digest("hex");

  try {
    const response = await $fetch(`${BASE_URL}/api/v3/account`, {
      method: "GET",
      headers: {
        "X-MBX-APIKEY": config.public.apiKey,
      },
      query: {
        timestamp,
        omitZeroBalances,
        signature,
      },
    });

    return response;
  } catch (error: any) {
    return { error: error.message };
  }
});
