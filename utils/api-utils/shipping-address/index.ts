import { AddressMeta, ContactShippingData, MetaInfo, User } from "types/commons";
import { nanoid } from 'nanoid'
import produce from "immer";

export const SHIPPING_META_KEY = 'SHIPPING_ADDRESSES'

const findMetainfo = (metaData: MetaInfo[], key: string) => {
  return metaData.find(item => item.key === key)
}

export const userHasShippingMeta = (userData: User) => {
  if (!userData?.meta_data) return false
  const addresses = findMetainfo(userData.meta_data, SHIPPING_META_KEY)
  if (addresses) return true
  return false
}

export const getShippingMetaValue = (userData: User) => findMetainfo(userData.meta_data, SHIPPING_META_KEY)

export const getAllShippingAddresses = (userData: User) => {
  if (userHasShippingMeta(userData)) {
    const meta = getShippingMetaValue(userData)
    return JSON.parse(meta.value) as AddressMeta[]
  }
  return null
}

export const getShippingAddressByID = (userData: User, addressId: string) => {
  if (userHasShippingMeta(userData)) {
    const meta = getShippingMetaValue(userData)
    const addresses = JSON.parse(meta.value)
    return addresses.find(address => address.id === addressId) as AddressMeta
  }
  return null
}

export const addShippingAddress = (userData: User, address: ContactShippingData) => {
  const addressID = nanoid()
  const cleanedAddress = produce(address, draftAdd => {
    delete draftAdd.saveAddress
  })
  const add: AddressMeta = {
    id: addressID,
    ...cleanedAddress
  }
  if (userHasShippingMeta(userData)) {
    const meta = getShippingMetaValue(userData)
    const addresses = JSON.parse(meta.value)
    addresses.push(add)
    meta.value = JSON.stringify(addresses)
    return userData.meta_data
  } else {
    return addShippingMetaToUser(userData, SHIPPING_META_KEY, [add])
  }
}

export const deleteShippingAddress = (userData: User, address: AddressMeta) => {
  if (userHasShippingMeta(userData)) {
    const shippingMetaData = getShippingMetaValue(userData)
    const addresses = JSON.parse(shippingMetaData.value) as AddressMeta[]
    const updatedAddressList = produce(addresses, draftAdd => {
      const addIndex = draftAdd.findIndex(add => add.id === address.id)
      draftAdd.splice(addIndex, 1)
    })
    return produce(userData.meta_data, draftMetaData => {
      const metaIndex = draftMetaData.findIndex(meta => meta.key === SHIPPING_META_KEY)
      draftMetaData.splice(metaIndex, 1, {
        key: SHIPPING_META_KEY,
        value: JSON.stringify(updatedAddressList)
      })
    })
  }
  return null
}

const addShippingMetaToUser = (userData: User, key: string, initialValue: any[]) => {
  const meta = {
    key,
    value: JSON.stringify(initialValue || [])
  }
  userData.meta_data.push(meta)
  return userData.meta_data
}


export const isShippingMetaEmpty = (user: User) => {
  const shippingMetaData = getShippingMetaValue(user)
  if (shippingMetaData) {
    const addresses = JSON.parse(shippingMetaData.value) as AddressMeta[]
    return !(addresses.length > 0)
  }
  return true
}