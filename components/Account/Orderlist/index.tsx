import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { FETCH_CART } from "redux-utils/actions/types";
import { Order } from "types/commons";
import { getProducts } from "utils/api-utils";
import { createCartState } from "utils/cart";
import { useTheme } from "utils/color-map";

interface OrderListProps {
  orders: Order[];
}

interface OrdeTileProps {
  order: Order;
  active: boolean;
  [key: string]: any;
}

const OrderTile = ({ order, active = false, ...restProps }: OrdeTileProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOrderBeingCloned, setIsOrderBeingCloned] = useState(false);
  const orderDate = useMemo(() => {
    const orderCreatedDate = new Date(order.date_created);
    const day = orderCreatedDate.getDate();
    const month = orderCreatedDate.getMonth() + 1;
    const year = orderCreatedDate.getFullYear();
    return `${day}\\${month}\\${year}`;
  }, [order.date_created]);

  const handleRepeatClick = useCallback(async () => {
    setIsOrderBeingCloned(true);
    const items = order.line_items;
    const itemIds = items.map((item) => item.product_id);
    const itemQuantityMap = new Map<number, number>();
    items.forEach((product) =>
      itemQuantityMap.set(product.product_id, product.quantity)
    );
    const productsInfo = await getProducts({
      params: {
        include: itemIds.join(","),
      },
    });
    const cartState = createCartState(productsInfo, itemQuantityMap);
    dispatch({
      type: FETCH_CART,
      payload: cartState,
    });
    router.push("/cart");
    setIsOrderBeingCloned(false);
  }, [order.id]);

  return (
    <div className="grid grid-cols-12 border border-gray-500" {...restProps}>
      <div
        className="col-span-4 text-white grid place-items-center cursor-pointer"
        style={{
          background: theme.green,
        }}
      >
        <h1 className="text-lg">Order ID: # {order.id}</h1>
      </div>
      <div className="col-span-8 p-4 text-right cursor-pointer">
        {orderDate}
      </div>

      {active && (
        <div className="col-span-12 p-4">
          {order.line_items.map((item) => {
            return (
              <div className="flex">
                <span className="block flex-1 mt-2">
                  {item.name} x {item.quantity}
                </span>
                <span className="block mt-2">
                  {order.currency_symbol} {item.total}
                </span>
              </div>
            );
          })}
          <div className="flex text-xl mt-4">
            <div className="flex-1">Total</div>
            <p className="text-xl">
              {order.currency_symbol} {order.total}
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="text-white py-2 px-4 rounded-3xl text-sm focus:outline-none"
              style={{
                background: theme.orange,
                color: theme.yellow,
              }}
              onClick={handleRepeatClick}
            >
              {isOrderBeingCloned ? "Cloning" : "Repeat"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderList = ({ orders }: OrderListProps) => {
  const [activeOrderId, setActiveOrderId] = useState(null);
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderTile
          order={order}
          active={activeOrderId === order.id}
          onClick={() => setActiveOrderId(order.id)}
        />
      ))}
    </div>
  );
};

export default OrderList;
