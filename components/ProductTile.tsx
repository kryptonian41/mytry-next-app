import { Product } from "types/commons";
import Link from "next/link";
interface Props {
  product: Product;
}

export const ProductTile: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <a>
        <div className="px-7">
          <div className="cursor-pointer relative">
            {product.images.length > 0 && (
              <div className="h-80" style={{
                height: '100%'
              }}>
                <img
                  src={product.images[0].src}
                  className="object-cover block w-full h-full"
                />
              </div>
            )}
            <p className="text-xl font-medium mt-4">{product.name}</p>
            <p>
              {product.sale_price}
              <span className="line-through pl-2 text-red-500">
                {product.regular_price}
              </span>
            </p>
            <button className="absolute translate-x-1/2 right-0 bottom-28 transform py-1 px-4 bg-pink-800 text-white rounded-full">
              Shop
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};
