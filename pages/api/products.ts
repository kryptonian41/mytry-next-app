import { wooClient } from '../../api-utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getProductsServerSide = async (queryParams = {}) => await wooClient.get('products', queryParams)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await getProductsServerSide(req.query)
  res.json(data)
}