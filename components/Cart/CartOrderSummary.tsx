import clsx from "clsx";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "redux-state/hooks";
import { OrderAmountSummary } from "./OrderAmountSummary";
import cartStyles from "./cart.module.scss";

type CartOrderSummaryProps = {};

export const CartOrderSummary: React.FunctionComponent<
	CartOrderSummaryProps
> = () => {
	const router = useRouter();

	const cartItems = useAppSelector((state) => state.cart.items);
	const cartHasAtleastOneItem = useMemo(
		() => cartItems.length !== 0,
		[cartItems],
	);

	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const handlePlaceOrderClick = useCallback(() => {
		if (!isAuthenticated) {
			alert("Only authenticated users can place order. Please Log-in.");
			return router.push("/login");
		}
		return router.push("/cart/checkout");
	}, []);

	return (
		<div className={cartStyles.summaryContainer}>
			<OrderAmountSummary />

			{cartHasAtleastOneItem && (
				<div className="mt-5">
					<button
						type="button"
						onClick={handlePlaceOrderClick}
						className={clsx(cartStyles.checkoutBtn, "no-outline")}
					>
						Place Order
					</button>
				</div>
			)}
		</div>
	);
};
