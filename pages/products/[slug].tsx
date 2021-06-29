import clsx from "clsx";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getProductServerSide, getProductsServerSide } from "pages/api/products";
import { getReviewsServerSide } from "pages/api/reviews";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { SET_REVIEWS } from "redux-utils/actions/types";
import { Product } from "types/commons";
import { getRandomColorScheme } from "utils";
import { getProduct, ProductFilters } from "utils/api-utils";
import { getColorScheme } from "utils/color-map";
import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import Review from "../../components/Product/Reviews/Reviews";
import styles from "./styles.module.scss";

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
        const { data } = await getProductServerSide(productId.toString());
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
  const imageContainerRef = useRef(null);
  const productQuantity = useMemo(
    () =>
      productData.attributes.filter(
        (attribute) => attribute.name.toLowerCase() === "quantity"
      ),
    [productData]
  );
  const productIngredients = useMemo(
    () =>
      productData.attributes.filter(
        (attribute) => attribute.name.toLowerCase() === "ingredients"
      ),
    [productData]
  );

  let colorScheme = useMemo(getRandomColorScheme, []);

  // For maintianing the image aspect ratio on all browsers as the aspect ratio property is not supported by safari yet and the padding bottom hack cannot be used because the height of the image is fixed
  useEffect(() => {
    if (!imageContainerRef.current) return

    const imageContainerWidth =
      (7 * imageContainerRef.current.offsetHeight) / 8;
    imageContainerRef.current.style.width = imageContainerWidth + "px";

    const observer = new ResizeObserver((entries) => {
      const elm = entries[0].target as any;
      const imageContainerWidth = (7 * elm.offsetHeight) / 8;
      elm.style.width = imageContainerWidth + "px";
    });
    observer.observe(imageContainerRef.current);

    colorScheme = getColorScheme();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_REVIEWS,
      payload: reviews,
    });
  }, [reviews]);

  function createDescMarkup(desc) {
    return { __html: desc };
  }

  const addItem = useCallback(
    () => {
      const productQuantity = productData.attributes.filter(
        (attribute) => attribute.name.toLowerCase() === "quantity"
      );
      const item = {
        id: productData.id,
        name: productData.name,
        image: productData.images[0].src,
        price: parseFloat(productData.price),
        descQty: productQuantity.length ? productQuantity[0].options[0] : null,
        qty: 1,
        totalPrice: parseFloat(productData.price),
      };
      dispatch({
        type: "ADD_ITEM",
        payload: item,
      })
    },
    [productData],
  )


  return (
    <Layout
      title={productData.name}
      description={productData.description
        .replace(/(<([^>]+)>)/gi, "")
        .substr(
          0,
          Math.min(
            productData.description.replace(/(<([^>]+)>)/gi, "").length,
            150
          )
        )}
      keywords={null}
    >
      <div className={styles.singleProductPage}>
        <div
          className={styles.hero}
          style={{
            backgroundColor: colorScheme.bgColor,
          }}
        >
          <Navbar color="light" bgColor={colorScheme.bgColor} />
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
                    {productQuantity.length > 0 &&
                      productQuantity[0].options[0]}
                  </p>
                  <p className={styles.productInfo}>INR {productData.price}</p>
                  <div
                    className={`${styles.productInfo} ${styles.productDesc}`}
                    dangerouslySetInnerHTML={createDescMarkup(
                      productData.description
                    )}
                  />
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
                    {productIngredients.length > 0 &&
                      productIngredients[0].options[0]}
                  </p>
                  <hr
                    style={{ borderColor: colorScheme.bgColor }}
                    className={styles.ingredientsDivider}
                  />
                </div>
              </div>

              <div
                className={clsx(styles.imageContainer, "relative")}
                ref={imageContainerRef}
              >
                <img
                  src={productData.images[0].src}
                  alt="product-image"
                  className={clsx(
                    styles["hero-product-info-image"],
                    "absolute left-0 top-0"
                  )}
                />
                <button
                  onClick={addItem}
                  type="button"
                  className={styles.shopNowBtn}
                >
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
          <Review productId={product.id} colorScheme={colorScheme} />
        )}
        <Footer />
      </div>
    </Layout>
  );
};

export default ProductPage;
