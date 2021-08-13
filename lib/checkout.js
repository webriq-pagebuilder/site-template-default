import { loadStripe } from "@stripe/stripe-js"

export async function initiateCheckout({lineItems} = {}, stripePKey, NEXT_PUBLIC_DXP_STUDIO_ADDRESS) {
  const stripe = loadStripe(stripePKey)
      await (await stripe).redirectToCheckout({     
        lineItems,
        mode: 'subscription',
        successUrl: `http://${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/success`,
        cancelUrl: `http://${NEXT_PUBLIC_DXP_STUDIO_ADDRESS}/stripe-checkout`,
    })
}