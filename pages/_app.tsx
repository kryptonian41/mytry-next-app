import { QueryClientProvider, QueryClient } from 'react-query'
import '../styles/globals.css'

const reactQueryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return <QueryClientProvider client={reactQueryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}

export default MyApp
