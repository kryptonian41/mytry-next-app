import { Address, AddressMeta, MetaInfo, User } from "types/commons";
import { nanoid } from 'nanoid'

export const SHIPPING_META_KEY = 'SHIPPING_ADDRESSES'

const findMetainfo = (metaData: MetaInfo[], key: string) => {
  return metaData.find(item => item.key === key)
}

export const userHasShippingMeta = (userData: User) => {
  const addresses = findMetainfo(userData.meta_data, SHIPPING_META_KEY)
  if (addresses) return true
  return false
}

export const getShippingMetaValue = (userData: User) => findMetainfo(userData.meta_data, SHIPPING_META_KEY)


export const getShippingAddressByID = (userData: User, addressId: string) => {
  if (userHasShippingMeta(userData)) {
    const meta = getShippingMetaValue(userData)
    const addresses = JSON.parse(meta.value)
    const { id, ...address } = addresses.find(address => address.id === addressId) as AddressMeta
    return address
  }
  return null
}

export const addShippingAddress = (userData: User, address: Address) => {
  const addressID = nanoid()
  const add: AddressMeta = {
    id: addressID,
    ...address
  }
  if (userHasShippingMeta(userData)) {
    const meta = getShippingMetaValue(userData)
    const addresses = JSON.parse(meta.value)
    addresses.push(add)
    meta.value = JSON.stringify(addresses)
    return userData
  } else {
    return addShippingMetaToUser(userData, SHIPPING_META_KEY, [add])
  }
}

const addShippingMetaToUser = (userData: User, key: string, initialValue: any[]) => {
  const meta = {
    key,
    value: JSON.stringify(initialValue || [])
  }
  userData.meta_data.push(meta)
  return userData
}
