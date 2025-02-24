import { getProducts } from "utils/api-utils";
import Navbar from "components/Navbar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useMemo } from "react";
import Layout from "components/Layout";
import Footer from "components/Footer";
import Categories from "components/Categories";
import Products from "components/Products";
import FullPageVideo from "components/FullPageVideo";
import { useQuery, useQueryClient } from "react-query";
import { Category, Product } from "types";
import { getCategoriesServerSide } from "../api/categories";
import { getProductsServerSide } from "../api/products";
import styles from "./styles.module.scss";
import { processCategories } from "utils";

interface Props {
  products: Product[];
  parentCategories: Category[];
  parentToChildCategoryMap: { [parentId: string]: Category[] };
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await getProductsServerSide({
    per_page: 50,
    stock_status: "instock",
  });
  let categories = await getCategoriesServerSide().then((res) => res.data);

  const { parentCategories, parentToChildMapping } =
    processCategories(categories);

  return {
    props: {
      products: data,
      parentCategories,
      parentToChildCategoryMap: parentToChildMapping,
    },
  };
};

export const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  products: productsFromServer,
  parentCategories,
  parentToChildCategoryMap,
}) => {
  const reactQueryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    "products",
    async () =>
      getProducts({
        params: {
          stock_status: "instock",
          per_page: 50,
        },
      }),
    {
      initialData: productsFromServer,
      staleTime: 1000 * 60,
    }
  );

  useEffect(() => {
    reactQueryClient.setQueryData("products", productsFromServer);
  }, [productsFromServer]);

  const hero = (
    <div className={styles.heroSection}>
      <Navbar />
      <FullPageVideo page="product" />
      <div className="homePage__bgVideo--overlay" />
    </div>
  );

  const pageBody = useMemo(() => {
    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>There was some error fetching products list</div>;

    if (data)
      return (
        <div className={styles.productsSectionContainer}>
          <Categories
            categories={parentCategories}
            parentToChildCategoryMap={parentToChildCategoryMap}
          />
          <div className={styles.productsContainer}>
            <Products products={data} />
          </div>
        </div>
      );
  }, [isLoading, isError, data]);

  return (
    <Layout title="Products">
      <React.Fragment>
        {hero}
        {pageBody}
        <Footer />
      </React.Fragment>
    </Layout>
  );
};

export default Home;
