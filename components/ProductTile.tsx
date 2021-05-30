import { Product } from "types/commons"

interface Props {
  product: Product
}

export const ProductTile: React.FC<Props> = ({ product }) => {
  return <div className="p-4 bg-gray-100 rounded-md shadow-md">
    <p className="text-xl font-medium mb-2 text-center">
      {product.name}
    </p>

    {product.images.length > 0 &&
      <div className="h-80">
        <img src={product.images[0].src} className="object-contain block w-full h-full" />
      </div>
    }

    <p className="text-center mt-4">
      {product.sale_price}
      <span className="line-through pl-2 text-red-500">

        {product.regular_price}
      </span>
    </p>
  </div>
}