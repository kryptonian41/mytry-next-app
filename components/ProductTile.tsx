import { Product } from "types/commons";
import Link from "next/link";
import { RUPEES_SYMBOL } from "components";

interface Props {
  product: Product;
}

const ProductTile: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <a>
        <div className="px-7" style={{ textTransform: "uppercase" }}>
          <div className="cursor-pointer relative">
            {product.images.length > 0 && (
              <div
                className="h-80"
                style={{
                  height: "100%",
                }}
              >
                <img
                  src={product.images[0].src}
                  className="object-cover block w-full h-full"
                />
              </div>
            )}
            <p className="text-xl font-medium mt-4">{product.name}</p>
            {product.sale_price ? (
              <p>
                {RUPEES_SYMBOL} {product.sale_price}
                <span className="line-through pl-2 text-red-500">
                  {RUPEES_SYMBOL} {product.regular_price}
                </span>
              </p>
            ) : (
              <p>
                {RUPEES_SYMBOL} {product.regular_price}
              </p>
            )}
            <button
              style={{ backgroundColor: "#ED2385", color: "#F8EC00" }}
              className="absolute translate-x-1/2 right-0 bottom-28 transform py-1 px-4 bg-pink-800 text-white rounded-full product-tile__add-item-btn no-outline"
            >
              SHOP
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductTile;
