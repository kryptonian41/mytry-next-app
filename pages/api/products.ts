import { wooClient } from '../../api-utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await wooClient.get('products')
  res.json(data)
}