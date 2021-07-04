import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Order, Product } from 'types/commons'
import { axios } from 'utils/axios'

export const getProducts = async (config: AxiosRequestConfig = null) => {
  const { data } = await axios.get<any, AxiosResponse<Product[]>>('/api/products', config)
  return data
}

export interface ProductFilters {
  id?: number
  slug?: string
}

export const getProduct = async (slug: string) => {
  const { data } = await axios.get<any, AxiosResponse<Product[]>>('/api/products', {
    params: {
      slug
    } as ProductFilters
  })
  if (data.length === 0) throw Error('Product not found')
  return data[0]
}

export const getReviews = async () => {
  const { data } = await axios.get('/api/reviews')
  return data
}

export enum CheckoutType {
  COD = "cod",
  Razorpay = "razorpay"
}

export const createOrder = async (order: Order, checkoutType: CheckoutType) => {
  const { data } = await axios.post(`/api/order/create/${checkoutType}`, order)
  return data
}

export const applyCoupon = async (userId, cartTotal, code, onSuccess, onError, setCouponState) => {
  try {
    const body = JSON.stringify({ customer_id: userId, code, cartTotal });
    const res = await axios.post("/api/order/apply-coupon", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCouponState(true, res.data);
    onSuccess();
  } catch (error) {
    if (error.response.data.message) onError(error.response.data.message);
    else onError("Error applying coupon code");
  }
};