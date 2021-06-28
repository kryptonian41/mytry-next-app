import axios, { AxiosResponse } from 'axios'
import { Order, Product } from 'types/commons'

export const getProducts = async () => {
  const { data } = await axios.get<any, AxiosResponse<Product[]>>('/api/products')
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

export const createOrder = async (order: Order) => {
  const { data } = await axios.post("/api/order/create", order)
  return data
}