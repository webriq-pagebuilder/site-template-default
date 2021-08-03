import { loadStripe } from "@stripe/stripe-js"



export async function initiateCheckout({lineItems} = {}, stripePKey) {
  const stripe = loadStripe(stripePKey)
      await (await stripe).redirectToCheckout({
        // payment_method_types: ['card'],
        lineItems,
        mode: 'subscription',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/stripe-checkout',
    })
}