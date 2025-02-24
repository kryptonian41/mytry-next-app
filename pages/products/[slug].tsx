import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from "clsx";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import type { GetStaticProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
	getProductServerSide,
	getProductsServerSide,
} from "pages/api/products";
import { getReviewsServerSide } from "pages/api/reviews";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import type { Product } from "types";
import { getRandomColorScheme } from "utils";
import { type ProductFilters, getProduct } from "utils/api-utils";
import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import Review from "../../components/Product/Reviews/Reviews";
import styles from "./styles.module.scss";

interface Props {
	product: Product;
	reviews: unknown;
	relatedProducts: unknown;
	colorScheme: unknown;
}

export async function getStaticPaths() {
	const { data: products }: { data: Product[] } = await getProductsServerSide();
	const paths = products.map((product) => ({
		params: { slug: product.slug },
	}));

	return { paths, fallback: "blocking" };
}

const ImageCarouselSettings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 3500,
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
	const slug = params?.slug;
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
			Math.min(2, product.related_ids.length),
		);

		relatedProducts = await Promise.all(
			relatedProductIds.map(async (productId) => {
				const { data } = await getProductServerSide(productId.toString());
				return data;
			}),
		);
	}

	const colorScheme = getRandomColorScheme();

	return {
		props: {
			relatedProducts,
			reviews,
			product,
			colorScheme,
		},
		revalidate: 20,
	};
};

export const ProductPage: React.FC<
	InferGetServerSidePropsType<typeof getStaticProps>
> = ({ relatedProducts, reviews, product, colorScheme: colorSchemeProp }) => {
	const router = useRouter();
	const [colorScheme, setColorScheme] = useState(colorSchemeProp);
	const { slug } = router.query;
	const { data: productData } = useQuery(
		[product, slug],
		() => getProduct(slug as string),
		{
			initialData: product,
		},
	);

	if (!productData) return <p>Loading...</p>;

	const imageContainerRef = useRef<HTMLDivElement | null>(null);
	const productQuantity = useMemo(
		() =>
			productData.attributes.filter(
				(attribute) => attribute.name.toLowerCase() === "quantity",
			),
		[productData],
	);
	const productIngredients = useMemo(
		() =>
			productData.attributes.filter(
				(attribute) => attribute.name.toLowerCase() === "ingredients",
			),
		[productData],
	);

	// For maintaining the image aspect ratio on all browsers as the aspect ratio property is not supported by safari yet and the padding bottom hack cannot be used because the height of the image is fixed
	useEffect(() => {
		if (!imageContainerRef.current) return;

		const imageContainerWidth =
			(7 * imageContainerRef.current.offsetHeight) / 8;
		imageContainerRef.current.style.width = `${imageContainerWidth}px`;

		const observer = new ResizeObserver((entries) => {
			const elm = entries[0].target as any;
			const imageContainerWidth = (7 * elm.offsetHeight) / 8;
			elm.style.width = `${imageContainerWidth}px`;
		});
		observer.observe(imageContainerRef.current);
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: "SET_REVIEWS",
			payload: reviews,
		});
	}, [reviews]);

	function createDescMarkup(desc: string) {
		return { __html: desc };
	}

	const addItem = useCallback(() => {
		const productQuantity = productData.attributes.filter(
			(attribute) => attribute.name.toLowerCase() === "quantity",
		);
		const price = Number.parseFloat(productData.price);
		const item = {
			id: productData.id,
			name: productData.name,
			image: productData.images[0].src,
			price,
			descQty: productQuantity.length ? productQuantity[0].options[0] : null,
			qty: 1,
			totalPrice: price,
		};
		dispatch({
			type: "ADD_ITEM",
			payload: item,
		});
	}, [productData]);

	return (
		<Layout
			title={productData.name}
			description={productData.description
				.replace(/(<([^>]+)>)/gi, "")
				.substr(
					0,
					Math.min(
						productData.description.replace(/(<([^>]+)>)/gi, "").length,
						150,
					),
				)}
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
									<div className={styles.productInfo}>
										{productData.on_sale && productData.sale_price ? (
											<p>
												INR {productData.sale_price}
												<span className="line-through pl-2 text-red-500">
													INR {productData.regular_price}
												</span>
											</p>
										) : (
											<p>INR {productData.regular_price}</p>
										)}
									</div>
									<div
										className={`${styles.productInfo} ${styles.productDesc}`}
										dangerouslySetInnerHTML={createDescMarkup(
											productData.description,
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
								<Slider className="h-full" {...ImageCarouselSettings}>
									{product?.images.map((image) => (
										<img
											src={image.src}
											key={image.src}
											alt="product-image"
											className={clsx(
												styles["hero-product-info-image"],
												"absolute left-0 top-0",
											)}
										/>
									))}
								</Slider>

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
					<Review productId={product.id.toString()} colorScheme={colorScheme} />
				)}
				<Footer />
			</div>
		</Layout>
	);
};

export default ProductPage;
