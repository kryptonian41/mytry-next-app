import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooClient = new WooCommerceRestApi({
  url: "http://maitri.local",
  consumerKey: process.env.WCOMM_CONSUMER_KEY,
  consumerSecret: process.env.WCOMM_CONSUMER_SECRET,
  version: "wc/v3"
});