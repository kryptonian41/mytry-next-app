import { getProducts } from "api-utils";
import Navbar from "components/Navbar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { reactQueryClient } from "pages/_app";
import React, { useEffect, useMemo } from "react";
import Categories from "components/Categories";
import Products from "components/Products";
import { useQuery } from "react-query";
import { Product } from "types/commons";
import { getCategoriesServerSide } from "../api/categories";
import { getProductsServerSide } from "../api/products";

const renderProductTiles = (products: Product[]) => {
  return <Products products={products} />;
};

interface Props {
  products: Product[];
  categories;
  skinTypeCategories;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await getProductsServerSide();
  let categories = await getCategoriesServerSide({ parent: 0 }).then(
    (res) => res.data
  );
  categories = categories.filter(
    (category) =>
      category.name.toLowerCase() !== "uncategorized" &&
      category.name.toLowerCase() !== "skin type"
  );
  const skinTypeCategory = await getCategoriesServerSide({
    slug: "skin-type",
  }).then((res) => res.data);
  const skinTypeCategoryId = skinTypeCategory[0].id;
  const skinTypeCategories = await getCategoriesServerSide({
    parent: skinTypeCategoryId,
  }).then((res) => res.data);
  return {
    props: {
      products: data,
      categories,
      skinTypeCategories,
    },
  };
};

export const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products: productsFromServer, categories, skinTypeCategories }) => {
  const { data, isLoading, isError } = useQuery("products", getProducts, {
    initialData: productsFromServer,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    reactQueryClient.setQueryData("products", productsFromServer);
  }, [productsFromServer]);

  const pageBody = useMemo(() => {
    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>There was some error fetching products list</div>;

    if (data)
      return (
        <div style={{ display: "flex", borderTop: "1px solid black" }}>
          <Categories
            categories={categories}
            skinTypeCategories={skinTypeCategories}
          />
          <div className="pt-6 grid grid-cols-3 w-2/3 m-auto gap-20">
            {renderProductTiles(data)}
          </div>
        </div>
      );
  }, [isLoading, isError, data]);

  return (
    <React.Fragment>
      <Navbar />
      {pageBody}
    </React.Fragment>
  );
};

export default Home;
