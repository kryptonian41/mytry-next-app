import { getProductServerSide } from "pages/api/products";
import { getReviewsServerSide } from "pages/api/reviews";
import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import Review from "../../components/Product/Reviews/Reviews";
import { getProduct } from "api-utils";
import { ProductFilters } from "api-utils/api-calls";
import { colorMap, getColorSchemeByCategory } from "assets/color-map";
import Navbar from "components/Navbar";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getProductsServerSide } from "pages/api/products";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import { Product } from "types/commons";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  product: Product;
  reviews: any;
  relatedProducts: any;
}

export async function getStaticPaths() {
  const { data: products }: { data: Product[] } = await getProductsServerSide();
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: "blocking" };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params;
  const { data } = await getProductsServerSide({
    slug,
  } as ProductFilters);
  const product = data[0];
  const reviews = await getReviewsServerSide({
    product: product.id,
  }).then((res) => res.data);

  let relatedProducts = null;
  if (product.related_ids.length) {
    const relatedProductIds = product.related_ids.slice(
      0,
      Math.min(2, product.related_ids.length)
    );

    relatedProducts = await Promise.all(
      relatedProductIds.map(async (productId) => {
        const { data } = await getProductServerSide(productId);
        return data;
      })
    );
  }
  return {
    props: {
      relatedProducts,
      reviews,
      product,
    },
    revalidate: 20,
  };
};

export const ProductPage: React.FC<
  InferGetServerSidePropsType<typeof getStaticProps>
> = ({ relatedProducts, reviews, product }) => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery(slug, () => getProduct(slug as string), {
    initialData: product,
  });
  const colorScheme = useMemo(() => {
    if (!productData || isLoading || isError) return colorMap.default;
    return getColorSchemeByCategory(productData.categories);
  }, [productData, isLoading, isError]);
  const imageContainerRef = useRef(null)
  const productQuantity = useMemo(() => productData.attributes.filter((attribute) => attribute.name.toLowerCase() === "quantity"), [productData])
  const productIngredients = useMemo(() => productData.attributes.filter((attribute) => attribute.name.toLowerCase() === "ingredients"), [productData])

  // For maintianing the image aspect ratio on all browsers as the aspect ratio property is not supported by safari yet and the padding bottom hack cannot be used because the height of the image is fixed
  useLayoutEffect(() => {
    const imageContainerWidth = 7 * imageContainerRef.current.offsetHeight / 8
    imageContainerRef.current.style.width = imageContainerWidth + 'px'

    const observer = new ResizeObserver((entries) => {
      const elm = entries[0].target as any
      const imageContainerWidth = 7 * elm.offsetHeight / 8
      elm.style.width = imageContainerWidth + 'px'
    })
    observer.observe(imageContainerRef.current)
  }, [])

  return (
    <div className={styles.singleProductPage}>
      <div
        className={styles.hero}
        style={{
          backgroundColor: colorScheme.bgColor,
        }}
      >
        <Navbar color="light" />
        {productData && (
          <div className={styles["hero-product-info"]}>
            <div
              className={`p-4 ${styles.infoOuterContainer} flex-1`}
              style={{
                backgroundColor: colorScheme.panelColor,
              }}
            >
              <div className={styles.productInfoContainer}>
                <h1 className={styles.productName}>{productData.name}</h1>
                <p className={styles.productInfo}>
                  {productQuantity.length && productQuantity[0].options[0]}
                </p>
                <p className={styles.productInfo}>INR {productData.price}</p>
                <p className={`${styles.productInfo} ${styles.productDesc}`}>
                  {productData.description.substr(
                    3,
                    productData.description.length - 8
                  )}
                </p>
                <hr
                  style={{ borderColor: colorScheme.bgColor }}
                  className={styles.ingredientsDivider}
                />
                <h3
                  className={`${styles.productInfo} ${styles.ingredientsHeader}`}
                >
                  Ingredients
                </h3>
                <p className={styles.productsIngredients}>
                  {productIngredients.length && productIngredients[0].options[0]}
                </p>
                <hr
                  style={{ borderColor: colorScheme.bgColor }}
                  className={styles.ingredientsDivider}
                />
              </div>
            </div>

            <div className={clsx(styles.imageContainer, 'relative')} ref={imageContainerRef}>
              <img
                src={productData.images[0].src}
                alt="product-image"
                className={clsx(styles["hero-product-info-image"], 'absolute left-0 top-0')}
              />
              <button type="button" className={styles.shopNowBtn}>
                Shop Now
              </button>
            </div>
          </div>
        )}
      </div>

      {productData && relatedProducts && (
        <RelatedProducts
          relatedProducts={relatedProducts}
          colorScheme={colorScheme}
        />
      )}
      {productData && (
        <Review
          ratingCount={productData.rating_count}
          reviews={reviews}
          colorScheme={colorScheme}
        />
      )}
    </div>
  );
};

export default ProductPage;
