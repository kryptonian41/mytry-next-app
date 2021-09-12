import clsx from 'clsx';
import { useFormikContext } from 'formik';
import produce from 'immer';
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER } from 'redux-utils/actions/types';
import { User } from 'types/commons';
import { updateUser } from 'utils/api-utils';
import { deleteShippingAddress, getAllShippingAddresses, userHasShippingMeta } from 'utils/api-utils/shipping-address';
import { useTheme } from 'utils/color-map';
import styles from './styles.module.scss'


interface Props {
  onSelect: () => any
}

export const AddressList: React.FC<Props> = ({ onSelect }) => {
  const { user } = useSelector((state) => (state as any).user);
  const { setValues } = useFormikContext()
  const theme = useTheme()
  const reduxDispatch = useDispatch()
  const addressList = useMemo(() => {
    if (userHasShippingMeta(user)) {
      return getAllShippingAddresses(user)
    }
    return []
  }, [user])

  const createUseBtnClickHandle = (shippingFormInfo): React.MouseEventHandler<HTMLButtonElement> => (e) => {
    e.preventDefault()
    setValues(shippingFormInfo)
    onSelect()
  }

  const createDeleteBtnClickHandler = useCallback((shippingFormInfo): React.MouseEventHandler<HTMLButtonElement> => async (e) => {
    e.preventDefault()
    const updatedUserMetaData = deleteShippingAddress(user, shippingFormInfo)
    if (!updatedUserMetaData) return
    const updatedUserData = await updateUser({ meta_data: updatedUserMetaData })
    reduxDispatch({
      type: LOAD_USER,
      payload: updatedUserData
    })
  }, [user])

  return (
    <div>
      <h1
        className="text-4xl my-8"
        style={{
          color: theme.green,
        }}
      >
        Saved Shipping Addresses
      </h1>

      {addressList.map(address => {
        const { flatAddress, city, state, saveAddressAs } = address
        return <div key={address.id} className={clsx("flex mt-6 first:mt-0", styles.addressCard)}>
          <div className="flex-1">
            <h4 className="uppercase">{saveAddressAs}</h4>
            <p className="mt-3">
              {flatAddress}<br />
              {city}<br />
              {state}<br />
            </p>
          </div>
          <div className="flex flex-col">
            <button
              className="btn px-6 py-2 uppercase block no-outline"
              onClick={createUseBtnClickHandle(address)}
            >
              Use
            </button>
            <button
              className="btn px-6 py-2 mt-3 uppercase block no-outline"
              onClick={createDeleteBtnClickHandler(address)}
            >
              Delete
            </button>
          </div>
        </div>
      })}
    </div>
  )
}
