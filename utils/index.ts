import { Category, ContactShippingData, LineItem, Order, User } from "types/commons";
import { colorMap } from "./color-map";

export const processCategories = (categories: Category[]) => {
  const parentCategories = categories.filter(
    (category) =>
      category.parent === 0 && category.slug.toLowerCase() !== "uncategorized"
  );
  const childCategories = categories.filter(
    (category) => category.parent !== 0
  );
  const parentToChildMapping = childCategories.reduce((acc, category) => {
    const { parent } = category;
    if (!acc[parent]) acc[parent] = [];
    acc[category.parent].push(category);
    return acc;
  }, {});
  return { parentCategories, parentToChildMapping };
};

export const isServer = () => typeof window === 'undefined'

interface RazorpayInstanceOptions {
  currency: string,
  id: string,
  amount: string,
  userInfo: {
    name: string,
    email: string,
    contactNo: string
  },
  onSuccess: (...any) => any
}
const defaultSuccessCallback = function (response) {
  alert(response.razorpay_payment_id);
  alert(response.razorpay_order_id);
  alert(response.razorpay_signature)
}


export const createRazorpayInstance = ({
  currency, id, amount, userInfo, onSuccess = defaultSuccessCallback
}: RazorpayInstanceOptions) => {

  const { name, email, contactNo } = userInfo

  const options = {
    "key": process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
    amount,
    currency,
    "name": "MyTry",
    "description": "Place Order",
    "image": "/main-logo.png",
    "order_id": id,
    "handler": onSuccess,
    "prefill": {
      "name": name,
      "email": email,
      "contact": contactNo
    },
    "theme": {
      "color": "#034a38"
    }
  };
  const _window = window as any
  return new _window.Razorpay(options)
}


export const getOrderDetails = (cartItems: any[], values: ContactShippingData) => {
  const products: LineItem[] = cartItems.map(item => ({ product_id: item.id, quantity: item.qty }))
  return {
    payment_method: 'Razorpay',
    payment_method_title: 'Razorpay',
    billing: {
      address_1: values.flatAddress,
      address_2: values.streetAddress,
      city: values.city,
      state: values.state,
      country: 'India',
      first_name: values.firstName,
      last_name: values.lastName,
      postcode: values.pincode.toString(),
      email: values.email,
      phone: values.contactNo.toString()
    },
    shipping: {
      address_1: values.flatAddress,
      address_2: values.streetAddress,
      city: values.city,
      state: values.state,
      country: 'India',
      first_name: values.firstName,
      last_name: values.lastName,
      postcode: values.pincode.toString(),
    },
    line_items: products
  } as Order
}

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export const getRandomColorScheme = () => {
  const availableSchemes = Object.keys(colorMap)
  const schemeIndex = Math.round(randomNumber(0, availableSchemes.length - 1))
  return colorMap[availableSchemes[schemeIndex]]
}