import axios, { AxiosResponse } from 'axios'
import { Product } from 'types/commons'

export const getProducts = async () => {
  const { data } = await axios.get<any, AxiosResponse<Product[]>>('/api/products')
  return data
}

interface ProductFilters {
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

// interface ReviewFilters {
//   id: number
// }

// export const getReview = async (id) => {
//   const { data } = await axios.get('/api/products', {
//     params: {
//       id
//     } as ReviewFilters
//   })
//   if(!data.length) throw Error('Review not found')
//   return data
// } 