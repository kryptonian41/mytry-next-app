import {
  Address,
  AddressMeta,
  Category,
  ContactShippingData,
  LineItem,
  MytryOrder,
  Order,
  User,
} from "types/commons";
import { CheckoutType } from "./api-utils";
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

export const isServer = () => typeof window === "undefined";

interface RazorpayInstanceOptions {
  currency: string;
  id: string;
  amount: string;
  userInfo: {
    name: string;
    email: string;
    contactNo: string;
  };
  onSuccess: (...any) => any;
}
const defaultSuccessCallback = function (response) {
  alert(response.razorpay_payment_id);
  alert(response.razorpay_order_id);
  alert(response.razorpay_signature);
};

export const createRazorpayInstance = ({
  currency,
  id,
  amount,
  userInfo,
  onSuccess = defaultSuccessCallback,
}: RazorpayInstanceOptions) => {
  const { name, email, contactNo } = userInfo;

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
    amount,
    currency,
    name: "MyTry",
    description: "Place Order",
    image: "/main-logo.png",
    order_id: id,
    handler: onSuccess,
    prefill: {
      name: name,
      email: email,
      contact: contactNo,
    },
    theme: {
      color: "#034a38",
    },
  };
  const _window = window as any;
  return new _window.Razorpay(options);
};

const getPaymentMethodDetails = (checkoutType: CheckoutType) => {
  switch (checkoutType) {
    case CheckoutType.COD:
      return {
        payment_method: "COD",
        payment_method_title: "Cash on delivery",
      };
    // case CheckoutType.Razorpay:
    //   return {
    //     payment_method: "Razorpay",
    //     payment_method_title: "Razorpay",
    //   };
    default:
      return {
        payment_method: "COD",
        payment_method_title: "Cash on delivery",
      };
  }
};

export const convertShippingInfoToBillingAddress = (shippingFormValues: ContactShippingData) => ({
  address_1: shippingFormValues.flatAddress,
  address_2: shippingFormValues.streetAddress,
  city: shippingFormValues.city,
  state: shippingFormValues.state,
  country: "India",
  first_name: shippingFormValues.firstName,
  last_name: shippingFormValues.lastName,
  postcode: shippingFormValues.pincode.toString(),
  email: shippingFormValues.email,
  phone: shippingFormValues.contactNo.toString(),
})

export const convertShippingInfoToShippingAddress = (shippingFormValues: ContactShippingData) => ({
  address_1: shippingFormValues.flatAddress,
  address_2: shippingFormValues.streetAddress,
  city: shippingFormValues.city,
  state: shippingFormValues.state,
  country: "India",
  first_name: shippingFormValues.firstName,
  last_name: shippingFormValues.lastName,
  postcode: shippingFormValues.pincode.toString(),
})

export const convertAddressToShippingFormInfo = (address: Address, {
  saveAddressAs = ''
} = {}): ContactShippingData => {
  return {
    flatAddress: address.address_1,
    streetAddress: address.address_2,
    city: address.city,
    state: address.state,
    firstName: address.first_name,
    lastName: address.last_name,
    pincode: parseInt(address.postcode),
    contactNo: address.phone,
    email: address.email,
    saveAddress: false,
    saveAddressAs,
  }
}

interface Options {
  userId,
  cartItems: any[],
  shippingFormValues?: ContactShippingData,
  checkoutType: CheckoutType,
  couponData,
  shipping_address_id?: string
}

export const getOrderDetails = (
  { userId,
    cartItems,
    shippingFormValues,
    checkoutType,
    couponData,
  }: Options
): Order => {
  const products: LineItem[] = cartItems.map(
    (item) =>
    ({
      product_id: item.id,
      quantity: item.qty,
    } as LineItem)
  );
  const coupon_lines = couponData ? [{ code: couponData.code }] : [];
  return {
    customer_id: userId,
    ...getPaymentMethodDetails(checkoutType),
    billing: shippingFormValues && convertShippingInfoToBillingAddress(shippingFormValues),
    shipping: shippingFormValues && convertShippingInfoToShippingAddress(shippingFormValues),
    line_items: products,
    coupon_lines,
    mytryMetaData: {
      saveAddress: shippingFormValues?.saveAddress,
      saveAddressAs: shippingFormValues.saveAddressAs
    }
  } as MytryOrder;
};

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export const getRandomColorScheme = () => {
  const availableSchemes = Object.keys(colorMap);
  const schemeIndex = Math.round(randomNumber(0, availableSchemes.length - 1));
  return colorMap[availableSchemes[schemeIndex]];
};
