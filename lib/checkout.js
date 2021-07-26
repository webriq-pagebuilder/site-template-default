import { loadStripe } from "@stripe/stripe-js"

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY)

export async function initiateCheckout({lineItems} = {}) {
    const session =  await (await stripe).redirectToCheckout({
        // payment_method_types: ['card'],
        lineItems,
        mode: 'subscription',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/stripe-checkout',
    })
}