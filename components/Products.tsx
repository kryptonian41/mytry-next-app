import { useMemo } from "react";
import ProductTile from "./ProductTile";
import { connect } from "react-redux";
import styles from "pages/products/styles.module.scss";
import type { RootState } from "redux-state/store";
import type { Category, Product } from "types";

const checkProductBelongsToCategory = (
  productCategories: Category[],
  categoryId: number
) => {
  return productCategories.map((category) => category.id).includes(categoryId);
};

const sortAToZ = (products: Product[]) => {
  return products.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : b.name.toLowerCase() > a.name.toLowerCase()
      ? -1
      : 0
  );
};

const sortPrice = (products: Product[], isDescending = false) => {
  const sortedProducts = products.sort((a, b) =>
    Number.parseFloat(a.price) > Number.parseFloat(b.price)
      ? 1
      : Number.parseFloat(b.price) > Number.parseFloat(a.price)
      ? -1
      : 0
  );
  if (isDescending) return sortedProducts.reverse();
  return sortedProducts;
};

const Products: React.FC<{
  products: Product[];
  categoryId?: number;
  sorting?: string;
}> = ({ products, categoryId, sorting }) => {
  const filteredProductsArray = useMemo(() => {
    if (!categoryId && !sorting) return products;
    let updatedProductsArray = products;
    if (categoryId) {
      updatedProductsArray = products.filter((product) =>
        checkProductBelongsToCategory(product.categories, categoryId)
      );
    }
    if (sorting) {
      if (sorting === "atoz")
        updatedProductsArray = sortAToZ(updatedProductsArray);
      else if (sorting === "priceAscending" || sorting === "priceDescending") {
        updatedProductsArray = sortPrice(
          updatedProductsArray,
          sorting === "priceDescending"
        );
      } else;
    }
    return updatedProductsArray;
  }, [products, categoryId, sorting]);

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

const mapStateToProps = (state: RootState) => ({
  categoryId: state.productFilters.categoryId,
  sorting: state.productFilters.sorting,
});

export default connect(mapStateToProps)(Products);
