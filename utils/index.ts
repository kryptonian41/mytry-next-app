import { Category, User } from "types/commons";

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