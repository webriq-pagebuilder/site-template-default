import { loadStripe } from "@stripe/stripe-js"

const stripe = loadStripe("pk_test_51JDL3ZLisY7c4Rogu5n4AXHiExRPAnoBHWnKDGk9sC6rHz0dddWe4gEaoSxut0b8Hh1GY1c4sb9MMgaYTnQAoj9D00ebJ62hRD")

export async function initiateCheckout({lineItems} = {}) {
    const session =  await (await stripe).redirectToCheckout({
        // payment_method_types: ['card'],
        lineItems,
        mode: 'subscription',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/stripe-checkout',
    })
    console.log(session)
}