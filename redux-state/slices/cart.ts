import { isServer } from 'utils'
import { produce } from 'immer'

export const CART_LOCALSTORAGE_KEY = 'maitri_cart_cache'

export interface CartState {
  itemsCount: number
  items: any[]
  cartTotal: number
  coupon?: {
    applied: boolean
    discount: number
    code: string
  }
}

const DEFAULT_STATE: CartState = {
  itemsCount: 0,
  items: [],
  cartTotal: 0,
}

const getInitialCartState = () => {
  if (typeof window === 'undefined') return DEFAULT_STATE
  const cartDataJson = window.localStorage.getItem(CART_LOCALSTORAGE_KEY)
  return cartDataJson ? (JSON.parse(cartDataJson) as CartState) : DEFAULT_STATE
}

const saveCartState = (newCartState: any) => {
  if (isServer()) return
  window.localStorage.setItem(
    CART_LOCALSTORAGE_KEY,
    JSON.stringify(newCartState)
  )
}

const initialState = getInitialCartState()

const setAddress = (state: any, payload: any) => {
  return state
}

const addNewProduct = (state: CartState, product: { qty: any; price: any }) => {
  return produce(state, (draftState) => {
    draftState.items.push(product)
    draftState.itemsCount += product.qty
    draftState.cartTotal = Number.parseFloat(
      (draftState.cartTotal + product.price).toFixed(2)
    )
  })
}

const getProductIndex = (items: any[], product: { id: any }) => {
  const filteredProducts = items.filter(
    (item: { id: any }) => item.id === product.id
  )
  return items.indexOf(filteredProducts[0])
}

const updateProduct = (
  state: CartState,
  product: { qty: any; price: number },
  index: number
) => {
  return produce(state, (draftState) => {
    const items = (draftState.items[index].qty += product.qty)
    draftState.items[index].totalPrice = Number.parseFloat(
      (items[index].qty * product.price).toFixed(2)
    )
    draftState.itemsCount += product.qty
    draftState.cartTotal = Number.parseFloat(
      (draftState.cartTotal + product.price).toFixed(2)
    )
  })
}

const addItem = (state: CartState, product: any) => {
  if (state.items.length) {
    const index = getProductIndex(state.items, product)
    if (index >= 0) {
      return updateProduct(state, product, index)
    }
    return addNewProduct(state, product)
  }return addNewProduct(state, product)
}

const removeItem = (state: CartState, product: any) => {
  const index = getProductIndex(state.items, product)
  if (index >= 0) {
    if (state.items.length === 1) {
      return DEFAULT_STATE
    }
    return produce(
      state,
      (draftState: { items: any; itemsCount: number; cartTotal: number }) => {
        const items = draftState.items
        const deletedItem = items.splice(index, 1)[0]
        draftState.itemsCount -= deletedItem.qty
        draftState.cartTotal = Number.parseFloat(
          (draftState.cartTotal - product.totalPrice).toFixed()
        )
      }
    )
  }return state
}

const increaseItemQty = (state: CartState, product: any) => {
  const index = getProductIndex(state.items, product)

  if (index >= 0) {
    return produce(
      state,
      (draftState: { items: any; itemsCount: number; cartTotal: number }) => {
        const items = draftState.items
        const item = items[index]
        item.qty += 1
        item.totalPrice = Number.parseFloat((item.qty * product.price).toFixed(2))
        draftState.itemsCount += 1
        draftState.cartTotal = Number.parseFloat(
          (draftState.cartTotal + product.price).toFixed(2)
        )
      }
    )
  }

  return state
}

const decreaseItemQty = (state: CartState, product: any) => {
  const index = getProductIndex(state.items, product)

  if (index >= 0) {
    return produce(
      state,
      (draftState: { items: any; itemsCount: number; cartTotal: number }) => {
        const items = draftState.items
        const index = getProductIndex(items, product)
        const item = items[index]
        item.qty -= 1
        item.totalPrice = Number.parseFloat((item.qty * product.price).toFixed(2))
        draftState.itemsCount -= 1
        draftState.cartTotal = Number.parseFloat(
          (draftState.cartTotal - product.price).toFixed(2)
        )
      }
    )
  }

  return state
}

const applyCoupon = (state: CartState, payload: { couponCode: string }) => {}

export function cartReducer(
  state: CartState,
  action: any
): CartState {
  const newState = reduceCartState(state, action)
  saveCartState(newState)
  return newState
}

const reduceCartState = (
  state: CartState,
  action: { type: any; payload: any }
): CartState => {
  switch (action.type) {
    case 'FETCH_CART':
      return {
        ...state,
        ...action.payload,
      }
    case 'ADD_ITEM':
      return addItem(state, action.payload)
    case 'REMOVE_ITEM':
      return removeItem(state, action.payload)
    case 'INCREASE_ITEM_QTY':
      return increaseItemQty(state, action.payload)
    case 'DECREASE_ITEM_QTY':
      return decreaseItemQty(state, action.payload)
    case 'SET_ADDRESSES':
      return setAddress(state, action.payload)
    case 'APPLY_COUPON':
      return applyCoupon(state, action.payload)
    case 'CLEAR_CART':
      return {
        itemsCount: 0,
        items: [],
        cartTotal: 0,
      }
    default:
      return state
  }
}
