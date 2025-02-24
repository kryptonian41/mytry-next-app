export const addRazorpayScriptToHead = () => {
  return new Promise((res) => {
    const script = document.createElement('script') as HTMLScriptElement
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => res(null)
    document.head.appendChild(script)
  })
}
