import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Navbar from 'components/Navbar'
import { useTheme } from 'utils/color-map'
import { isArray } from 'lodash'

interface Props {

}

const AccountHome = (props: Props) => {
  const { isAuthenticated, user } = useSelector((state) => {
    return (state as any).user
  })
  const router = useRouter()
  const theme = useTheme()

  const { name, email } = useMemo(() => {
    if (!isAuthenticated) return {}
    const { first_name, last_name, email } = user
    return {
      name: `${first_name} ${last_name}`,
      email,
    }
  }, [user, isAuthenticated])

  if (!isAuthenticated) return router.push('/login')
  return (
    <div className="h-full" style={{
      backgroundColor: theme.green,
      color: 'white'
    }}>
      <Navbar color="light" />

      <div className="userpanel w-11/12 m-auto p-12 mt-20" style={{
        backgroundColor: theme.orange,
        borderTopRightRadius: 200
      }}>
        <h1 className="text-5xl" style={{ color: theme.yellow }}>
          <span>Hi there,</span>
          <br />
          <span>{user.first_name}</span>
        </h1>

        <p className="mt-32 text-2xl">{email}</p>
      </div>

      <div className="userpanel w-11/12 m-auto p-12 mt-20 grid grid-cols-12" style={{
        backgroundColor: 'white',
        color: theme.green
      }}>
        <div className="col-span-8">
          <h1 className="text-3xl">Previous Orders</h1>
        </div>
        <div className="col-span-4">
          <h1 className="text-3xl">Saved Addresses</h1>
        </div>
      </div>
    </div>
  )
}

export default AccountHome
