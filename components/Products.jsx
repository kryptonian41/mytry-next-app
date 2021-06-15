import { useMemo } from "react";
import ProductTile from "./ProductTile";
import { connect } from "react-redux";

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

  return filteredProductsArray.map((product) => {
    return <ProductTile key={product.id} product={product} />;
  });
};

const mapStateToProps = (state) => ({
  categoryId: state.category.categoryId,
});

export default connect(mapStateToProps)(Products);
