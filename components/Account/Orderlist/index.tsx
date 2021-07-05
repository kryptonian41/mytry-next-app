import React from 'react'
import { Order } from 'types/commons'
import { useTheme } from 'utils/color-map'

interface OrderListProps {
  orders: Order[]
}

interface OrdeTileProps {
  order: Order
}

const OrderTile = ({ order }: OrdeTileProps) => {
  const theme = useTheme()
  return <div className="grid grid-cols-12 border border-gray-500">
    <div className="col-span-4 text-white grid place-items-center" style={{
      background: theme.green
    }}>
      <h1 className="text-2xl"># {order.id}</h1>
    </div>
    <div className="col-span-8 p-8">
      <p className="text-xl">{order.currency_symbol} {order.total}</p>
      <p>{order.line_items.map(item => <span className="block mt-2">{item.name} x {item.quantity}</span>)}</p>
    </div>
  </div>
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-4">
      {orders.map(order => <OrderTile order={order} />)}
    </div>
  )
}

export default OrderList
