// This is your test secret API key.
const stripe = Stripe("pk_test_51R1W9mFZYMKFW4FSvBs1ivhlz7cES3TP3QG9hxiNDfk7QC0uiaOQnAYc9zlquvFSo3OIV9GHOEI1GWqocYTrAX8s00VLINA9UY");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}