import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
function generateStripePromise(stripePKey) {
  return loadStripe(stripePKey);
}

export function CheckoutForm({ children, stripePKey }) {
  return (
    <Elements stripe={generateStripePromise(stripePKey)}>{children}</Elements>
  );
}
