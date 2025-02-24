import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import { useMatchMedia } from 'utils/hooks/useMatchMedia'
import { useTheme } from 'utils/hooks/useTheme'
type Props = {}

const OrderSuccess = (props: Props) => {
  const theme = useTheme()
  const { matching: isMobile } = useMatchMedia({
    mediaQuery: '(max-width: 640px)',
  })

  return (
    <Layout title="Order Successfull">
      <div
        className="h-full flex flex-col"
        style={{
          backgroundColor: theme.green,
        }}
      >
        <Navbar color="light" />
        <div className="min-h-0 flex-1 grid place-items-center w-full">
          <div
            style={{
              width: isMobile ? '80%' : 550,
            }}
          >
            <h1
              style={{
                color: theme.yellow,
              }}
              className="text-center text-2xl sm:text-5xl"
            >
              Your order has been placed !
            </h1>
            <p className="text-white sm:text-2xl text-center mt-4">
              Shipping details will be in your inbox
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OrderSuccess
