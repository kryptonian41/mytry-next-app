import Razorpay from 'razorpay'
export let razorpayClient: any

if (typeof window === 'undefined') {
  const { NEXT_PUBLIC_RAZORPAY_API_KEY_ID, RAZORPAY_API_KEY_SECRET } = process.env
  razorpayClient = new Razorpay({
    key_id: NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
    key_secret: RAZORPAY_API_KEY_SECRET,
  });
}