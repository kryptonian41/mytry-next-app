import React, { useMemo } from 'react'
import { Product } from 'types/commons'
import { getProducts } from 'api-utils'
import { ProductTile } from 'components/ProductTile'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getProductsServerSide } from './api/products'
import { Navbar } from 'components/Navbar'

const renderProductTiles = (products: Product[]) => {
  return products.map(product => {
    return <ProductTile key={product.id} product={product} />
  })
}

interface Props {
  products: Product[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await getProductsServerSide()
  return {
    props: {
      products: data
    }
  }
}


export const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  products
}) => {

  const { data, isLoading, isError } = useQuery('products', getProducts, {
    initialData: products
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const pageBody = useMemo(() => {
    if (isLoading) return <div>
      Loading....
    </div>

    if (isError) return <div>
      There was some error fetching products list
    </div>

    if (data) return <div className="pt-6 grid grid-cols-3 w-2/3 m-auto gap-20">
      {renderProductTiles(data)}
    </div>

  }, [
    isLoading, isError, data
  ])


  return (
    <React.Fragment>
      <Navbar />
      {pageBody}
    </React.Fragment>
  )
}

export default Home
