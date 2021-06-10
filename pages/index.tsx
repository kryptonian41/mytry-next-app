import { getProducts } from "api-utils";
import { Navbar } from "components/Navbar";
import { ProductTile } from "components/ProductTile";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { reactQueryClient } from "pages/_app";
import React, { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Product } from "types/commons";
import { getProductsServerSide } from "./api/products";
import { connect } from "react-redux";
import { fetchCart } from "actions/cartActions";

const renderProductTiles = (products: Product[]) => {
  return products.map((product) => {
    return <ProductTile key={product.id} product={product} />;
  });
};

interface Props {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await getProductsServerSide();
  return {
    props: {
      products: data,
    },
  };
};

export const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products: productsFromServer, cart, fetchCart }) => {
  const { data, isLoading, isError } = useQuery("products", getProducts, {
    initialData: productsFromServer,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    reactQueryClient.setQueryData("products", productsFromServer);
  }, [productsFromServer]);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    console.log(cart);
  });

  const pageBody = useMemo(() => {
    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>There was some error fetching products list</div>;

    if (data)
      return (
        <div className="pt-6 grid grid-cols-3 w-2/3 m-auto gap-20">
          {renderProductTiles(data)}
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

const mapStateToProps = (state) => ({
  cart: state.cart.items,
});

export default connect(mapStateToProps, { fetchCart })(Home);
