export function createStackPop(options, callback) {
  if (window.PaystackPop) {
    return window.PaystackPop.setup({
      ...options,
      reference: `WAC${Date.now()}`,
      key: process.env.PAYSTACK_KEY,
      channels: ["mobile_money"],
      callback,
    });
  }
  console.log("Paystatck Pop not initialized");
  return null;
}
