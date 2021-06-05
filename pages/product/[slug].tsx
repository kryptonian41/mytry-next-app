import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import Review from "../../components/Product/Reviews/Reviews";
import { useRouter } from "next/router";
import { colorMap, getColorSchemeByCategory } from "assets/color-map";
import styles from "./styles.module.scss";
import { Navbar } from "components/Navbar";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getProduct } from "api-utils";
import {
  getProductServerSide,
  getProductsServerSide,
} from "pages/api/products";
import { getReviewsServerSide } from "pages/api/reviews";

export const ProductPage = ({ relatedProducts, reviews }) => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery(slug, () => getProduct(slug as string));
  const colorScheme = useMemo(() => {
    if (!productData || isLoading || isError) return colorMap.default;
    return getColorSchemeByCategory(productData.categories);
  }, [productData, isLoading, isError]);

  return (
    <div>
      <div
        className={styles.root}
        style={{
          backgroundColor: colorScheme.bgColor,
        }}
      >
        <div className={styles.hero}>
          <Navbar color="light" />
          {productData && (
            <div className={styles["hero-product-info"]}>
              <div
                className="p-4"
                style={{
                  backgroundColor: colorScheme.panelColor,
                }}
              >
                <div className={styles.productInfoContainer}>
                  <h1 className={styles.productName}>{productData.name}</h1>
                  <p className={styles.productInfo}>
                    {productData.attributes[0]?.options[0]}
                  </p>
                  <p className={styles.productInfo}>INR {productData.price}</p>
                  <p className={`${styles.productInfo} ${styles.productDesc}`}>
                    {productData.description.substr(
                      3,
                      productData.description.length - 8
                    )}
                  </p>
                  <hr className={styles.ingredientsDivider} />
                  <h3
                    className={`${styles.productInfo} ${styles.ingredientsHeader}`}
                  >
                    Ingredients
                  </h3>
                  <p className={styles.productsIngredients}>
                    {productData.attributes[1]?.options[0]}
                  </p>
                  <hr className={styles.ingredientsDivider} />
                </div>
              </div>

              <div>
                <img
                  src={productData.images[0].src}
                  alt="product-image"
                  className={styles["hero-product-info-image"]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {productData && relatedProducts.length && (
        <RelatedProducts relatedProducts={relatedProducts} />
      )}
      {productData && (
        <Review
          ratingCount={productData.rating_count}
          reviews={reviews}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  let { data } = await getProductsServerSide({ slug: context.params.slug });
  let relatedProducts = [];

  relatedProducts.push(
    await getProductServerSide(data[0].related_ids[0]).then((res) => res.data)
  );
  relatedProducts.push(
    await getProductServerSide(data[0].related_ids[1]).then((res) => res.data)
  );

  const allReviews = await getReviewsServerSide().then((res) => res.data);
  const reviews = allReviews.filter(review => review.product_id === data[0].id)

  return {
    props: {
      relatedProducts,
      reviews,
    },
  };
};

export default ProductPage;
