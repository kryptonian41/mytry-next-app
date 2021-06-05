import { Product } from "types/commons"
import Link from 'next/link'
import { RUPEES_SYMBOL } from "components"
interface Props {
  product: Product
}

export const ProductTile: React.FC<Props> = ({ product }) => {
  return <div className="px-7">
    <div className="relative">
      {product.images.length > 0 &&
        <div className="h-80">
          <img src={product.images[0].src} className="object-cover block w-full h-full" />
        </div>
      }
      <p className="text-xl font-medium mt-4">
        {product.name}
      </p>
      <p>
        {RUPEES_SYMBOL} {product.sale_price}
        <span className="line-through pl-3 text-sm text-red-500 inline-block">
          {RUPEES_SYMBOL} {product.regular_price}
        </span>
      </p>
      <Link href={`/product/${product.slug}`} shallow>
        <button className="cursor-pointer absolute translate-x-1/2 right-0 bottom-28 transform py-1 px-4 bg-pink-800 text-white rounded-full">Shop</button>
      </Link>
    </div>
  </div>
}