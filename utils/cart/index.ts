import { Product } from "types/commons";

export interface CartProduct {
  id: number,
  name: string,
  image: string,
  price: number,
  descQty: number,
  qty: number,
  totalPrice: number,
}

export const createCartState = (products: Product[], qtyMap: Map<number, number>) => {
  const cartItems = products.map(product => {
    const productQuantity = qtyMap.get(product.id)
    return {
      id: product.id,
      name: product.name,
      image: product.images[0].src,
      price: parseFloat(product.price),
      qty: productQuantity,
      totalPrice: parseInt(product.price) * productQuantity,
    }
  })
  debugger
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0)
  return {
    items: cartItems,
    itemsCount: totalQty,
    cartTotal: totalPrice
  }
}