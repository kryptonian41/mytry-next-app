import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Navbar from 'components/Navbar'
import { useTheme } from 'utils/hooks/useTheme'
import { useQuery } from 'react-query'
import { getOrders } from 'utils/api-utils'
import { isServer } from 'utils'
import Layout from 'components/Layout'
import OrderList from 'components/Account/Orderlist'

const AccountHome = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return (state as any).user
  })
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery('userorders', getOrders, {
    enabled: Boolean(isAuthenticated),
  })
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    if ((!isAuthenticated || !user) && !isServer()) {
      router.push('/login?redirect=/account')
    }
  }, [isAuthenticated, user])

  if (isServer()) return null
  else if (!isAuthenticated || !user) return null
  return (
    <Layout title="My Account">
      <div
        className="h-full pb-8"
        style={{
          backgroundColor: theme.green,
          overflowY: 'auto',
          color: 'white',
        }}
      >
        <Navbar color="light" />
        <div
          className="userpanel w-11/12 m-auto p-12 mt-20"
          style={{
            backgroundColor: theme.orange,
            borderTopRightRadius: 200,
          }}
        >
          <h1 className="text-5xl" style={{ color: theme.yellow }}>
            <span>Hi there,</span>
            <br />
            <span>{user.first_name}</span>
          </h1>
          <p className="mt-32 text-2xl">{user.email}</p>
        </div>
        <div
          className="userpanel w-11/12 m-auto p-6 sm:p-12 mt-10 sm:mt-20 grid grid-cols-12"
          style={{
            backgroundColor: 'white',
            color: theme.green,
          }}
        >
          <div className="col-span-full sm:col-span-8">
            <h1 className="text-3xl">Previous Orders</h1>
            <div className="mt-8 sm:w-1/2">
              {orders && <OrderList orders={orders} />}
            </div>
          </div>
          {/* <div className="col-span-full mt-8 sm:mt-0 sm:col-span-4">
            <h1 className="text-3xl">Saved Addresses</h1>
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default AccountHome
