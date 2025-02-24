import { useEffect } from 'react'
import Layout from '../components/Layout'
import Register from 'components/Register'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useAppSelector } from 'redux-state/hooks'

const register = () => {
  const { user } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user])

  return (
    <Layout title="Register">
      <Register />
    </Layout>
  )
}

export default register
