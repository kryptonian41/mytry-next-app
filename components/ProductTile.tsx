import { Product } from "types/commons"
import Link from 'next/link'
interface Props {
  product: Product
}

export const ProductTile: React.FC<Props> = ({ product }) => {
  return <Link href={`/product/${product.slug}`}>
    <div className="px-7 cursor-pointer">
      {product.images.length > 0 &&
        <div className="h-80">
          <img src={product.images[0].src} className="object-cover block w-full h-full" />
        </div>
      }
      <p className="text-xl font-medium mt-4">
        {product.name}
      </p>
      <p>
        {product.sale_price}
        <span className="line-through pl-2 text-red-500">
          {product.regular_price}
        </span>
      </p>
    </div>
  </Link>
}