import ProductTile from "./ProductTile";
import { connect } from "react-redux";

const Products = ({ products, categoryId }) => {
  const checkProductBelongsToCategory = (productCategories, categoryId) => {
    return productCategories.map(category => category.id).includes(categoryId)
  };
  return (
    <>
      {categoryId !== null
        ? products
            .filter((product) =>
              checkProductBelongsToCategory(product.categories, categoryId)
            )
            .map((product) => (
              <ProductTile key={product.id} product={product} />
            ))
        : products.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
    </>
  );
};

const mapStateToProps = (state) => ({
  categoryId: state.category.categoryId,
});

export default connect(mapStateToProps)(Products);
