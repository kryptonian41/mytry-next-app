import { wooClient } from '../../api-utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getProductsServerSide = async () => await wooClient.get('products')

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await getProductsServerSide()
  res.json(data)
}