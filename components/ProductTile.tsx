import { Product } from "types/commons";
import Link from "next/link";
import { RUPEES_SYMBOL } from "components";
import { connect } from "react-redux";

interface Props {
  product: Product;
  addItem: Function;
}

const ProductTile: React.FC<Props> = ({ product, addItem }) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <a>
        <div className="px-7">
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
            <p>
              {RUPEES_SYMBOL} {product.sale_price}
              <span className="line-through pl-2 text-red-500">
                {RUPEES_SYMBOL} {product.regular_price}
              </span>
            </p>
            <button
              onClick={() => {
                addItem(product);
              }}
              className="absolute translate-x-1/2 right-0 bottom-28 transform py-1 px-4 bg-pink-800 text-white rounded-full product-tile__add-item-btn"
            >
              Shop
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (product) => {
    const productQuantity = product.attributes.filter(
      (attribute) => attribute.name.toLowerCase() === "quantity"
    );
    const item = {
      id: product.id,
      name: product.name,
      image: product.images[0].src,
      price: parseFloat(product.price),
      descQty: productQuantity.length ? productQuantity[0].options[0] : null,
      qty: 1,
      totalPrice: parseFloat(product.price),
    };
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  },
});

export default connect(null, mapDispatchToProps)(ProductTile);
