import { useMemo } from "react";
import ProductTile from "./ProductTile";
import { connect } from "react-redux";
import styles from "pages/products/styles.module.scss";

const checkProductBelongsToCategory = (productCategories, categoryId) => {
  return productCategories.map((category) => category.id).includes(categoryId);
};

const Products = ({ products, categoryId }) => {
  const filteredProductsArray = useMemo(() => {
    if (!categoryId) return products;
    return products.filter((product) =>
      checkProductBelongsToCategory(product.categories, categoryId)
    );
  }, [products, categoryId]);

  return filteredProductsArray.map((product, i) => {
    return (
      <div
        key={product.id}
        className={i % 2 === 0 ? styles.productOffset : styles.product}
      >
        <ProductTile product={product} />
      </div>
    );
  });
};

const mapStateToProps = (state) => ({
  categoryId: state.category.categoryId,
});

export default connect(mapStateToProps)(Products);
