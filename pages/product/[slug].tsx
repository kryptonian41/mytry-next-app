import Review from "../../components/Product/Review";
import { useRouter } from "next/router";
import { colorMap, getColorSchemeByCategory } from "assets/color-map";
import styles from "./styles.module.scss";
import { Navbar } from "components/Navbar";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getProduct } from "api-utils";

export const ProductPage = () => {
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
                {productData.name}
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
      <Review />
    </div>
  );
};

export default ProductPage;
