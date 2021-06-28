import { useRouter } from 'next/router'
import React from 'react'
import Navbar from 'components/Navbar'
import { useTheme } from 'utils/color-map'
interface Props {

}

const OrderSuccess = (props: Props) => {
  const { query } = useRouter()
  const theme = useTheme()
  return (
    <div className="h-full flex flex-col" style={{
      backgroundColor: theme.green
    }}>
      <Navbar color="light" />
      <div className="min-h-0 flex-1 grid place-items-center">
        <div style={{
          width: 550
        }}>
          <h1 style={{
            color: theme.yellow
          }} className="text-center text-5xl">Your order has been placed !</h1>
          <p className="text-white text-2xl text-center mt-4">Shipping details will be in your inbox</p>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
