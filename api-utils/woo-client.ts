import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export let wooClient: WooCommerceRestApi

if (typeof window === 'undefined') {
  wooClient = new WooCommerceRestApi({
    url: "http://maitri.local",
    consumerKey: process.env.WCOMM_CONSUMER_KEY,
    consumerSecret: process.env.WCOMM_CONSUMER_SECRET,
    version: "wc/v3"
  });
}