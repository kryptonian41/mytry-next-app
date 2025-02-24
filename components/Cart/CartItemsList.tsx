import { CartItem } from 'types'
import CartTile from './CartTile'
import cartStyles from './cart.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CartItemsListProps {
  items: CartItem[]
}

export const CartItemsList: React.FunctionComponent<CartItemsListProps> = ({
  items,
}) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  if (!showContent) return null

  return (
    <div className={cartStyles.itemsContainer}>
      <h1>Cart</h1>
      {items.length > 0 ? (
        items.map((item) => <CartTile key={item.id} product={item} />)
      ) : (
        <div className={cartStyles.emptyCartContainer}>
          <h3>Your cart is currently empty!</h3>
          <button>
            <Link href="/products">Shop Now</Link>
          </button>
        </div>
      )}
    </div>
  )
}
