import { getProducts } from "utils/api-utils";
import Navbar from "components/Navbar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { reactQueryClient } from "pages/_app";
import React, { useEffect, useMemo } from "react";
import Footer from "components/Footer";
import Categories from "components/Categories";
import Products from "components/Products";
import { useQuery } from "react-query";
import { Category, Product } from "types/commons";
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
  const { data } = await getProductsServerSide();
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
    const { data, isLoading, isError } = useQuery("products", getProducts, {
      initialData: productsFromServer,
      staleTime: 1000 * 60,
    });

    useEffect(() => {
      reactQueryClient.setQueryData("products", productsFromServer);
    }, [productsFromServer]);

    const hero = <div className={styles.heroSection}></div>;

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
      <React.Fragment>
        <Navbar />
        {hero}
        {pageBody}
        <Footer />
      </React.Fragment>
    );
  };

export default Home;
