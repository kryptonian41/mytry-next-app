import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Order, Product, User } from "types/commons";
import { axios } from "utils/axios";

export const getProducts = async (config: AxiosRequestConfig = null) => {
  const { data } = await axios.get<any, AxiosResponse<Product[]>>(
    "/api/products",
    config
  );
  return data;
};

export interface ProductFilters {
  id?: number;
  slug?: string;
}

export const getProduct = async (slug: string) => {
  const { data } = await axios.get<any, AxiosResponse<Product[]>>(
    "/api/products",
    {
      params: {
        slug,
      } as ProductFilters,
    }
  );
  if (data.length === 0) throw Error("Product not found");
  return data[0];
};

export const getReviews = async () => {
  const { data } = await axios.get("/api/reviews");
  return data;
};

export enum CheckoutType {
  COD = "cod",
  Razorpay = "razorpay"
}

export const createOrder = async (order: Order, checkoutType: CheckoutType) => {
  const { data } = await axios.post(`/api/order/create/${checkoutType}`, order);
  return data;
};

export const getOrders = async () => {
  const { data } = await axios.get(`/api/users/orders`);
  return data;
};

export const applyCoupon = async (
  userId,
  cartTotal,
  code,
  onSuccess,
  onError,
  setCouponState
) => {
  try {
    const body = JSON.stringify({ customer_id: userId, code, cartTotal });
    const res = await axios.post("/api/order/apply-coupon", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCouponState(true, res.data);
    onSuccess();
  } catch (error) {
    if (error.response.data.message) onError(error.response.data.message);
    else onError("Error applying coupon code");
  }
};

export const updateUser = async (payload: Partial<User>) => {
  const { data } = await axios.put("/api/users/me", payload);
  return data;
};

export const submitContactUsForm = async (values, onSuccess, onError) => {
  const body = {
    subject: `Message from ${values.name}`,
    email: values.email,
    html: `<strong>Name:</strong> ${values.name}<br /><strong>Email:</strong> ${values.email}<br /><strong>Phone:</strong> ${values.phone}<br /><strong>Message:</strong> ${values.msg}<br />`,
  };
  const res = await axios.post("/api/contact", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 202) {
    onSuccess();
    window.alert("Thankyou for contacting us. We will get back to you soon.");
  } else {
    onSuccess();
    window.alert(
      "There was an error submitting the data. Please try again, or write to us on: mytryskin@gmail.com"
    );
  }
};
