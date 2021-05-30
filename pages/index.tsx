import { Product } from 'types/commons'
import { getProducts } from 'api-utils'
import { ProductTile } from 'components/ProductTile'
import { useEffect } from 'react'
import { useQuery } from 'react-query'


const renderProductTiles = (products: Product[]) => {
  return products.map(product => {
    return <ProductTile key={product.id} product={product} />
  })
}

export default function Home() {

  const { data, error, isLoading, isError } = useQuery('products', getProducts)


  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <div className="bg-indigo-800 text-white font-semibold p-4 px-8 flex items-center space-x-4 justify-between">
        <div className="space-x-6">
          <span>Home</span>
          <span>My Account</span>
        </div>

        <div>
          <span>Cart</span>
        </div>
      </div>

      {data && <div className="pt-6 grid grid-cols-3 w-2/3 m-auto gap-20">
        {renderProductTiles(data)}
      </div>}
    </div>
  )
}
