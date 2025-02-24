import Categories from "components/Categories";
import Footer from "components/Footer";
import FullPageVideo from "components/FullPageVideo";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Products from "components/Products";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import type { Category, Product } from "types";
import { processCategories } from "utils";
import { getProducts } from "utils/api-utils";
import { getCategoriesServerSide } from "../api/categories";
import { getProductsServerSide } from "../api/products";
import styles from "./styles.module.scss";

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
	const categories = await getCategoriesServerSide().then((res) => res.data);

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
		},
	);

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
	}, [isLoading, isError, data, parentCategories, parentToChildCategoryMap]);

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
