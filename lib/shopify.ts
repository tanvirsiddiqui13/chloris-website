import { createStorefrontClient } from "@shopify/hydrogen-react";

export const { getStorefrontApiUrl, getPublicTokenHeaders } =
  createStorefrontClient({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
    publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    storefrontApiVersion: "2024-01",
  });
