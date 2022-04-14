import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function HomePage() {
  const router = useRouter();
  const { success, canceled } = router.query;
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout

    if (success !== undefined || canceled || undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <div className="content">
      <form action="/api/checkout_sessions" method="POST">
        <section className="product-section">
          <div>
            <h3 className="container">Watercolor on paper</h3>
            <Image
              src="/images/picture3.jpeg"
              alt="watercolorpainting"
              width={200}
              height={250}
            />
          </div>
          <div className="product-description">
            <h5 className="title">Dawn</h5>
            <h5 className="price">$400</h5>
          </div>
          <button type="submit" role="link">
            Checkout
          </button>
        </section>
        <style jsx>
          {`
            .product-section {
              justify-content: center;
              text-align: center;
            }
            .container {
              font-size: 30px;
              font-weight: 200;
              color: #808080;
            }
            .title {
              font-size: 20px;
              font-weight: bold;
              color: #808080;
              margin: 5px;
            }
            .price {
              font-size: 20px;
              font-weight: bold;
              color: #808080;
            }
            section {
              background: #d3d3d3;
              display: flex;
              flex-direction: column;
              width: 400px;
              height: 600px;
              border-radius: 6px;
              justify-content: space-between;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 4px;
              color: white;
              border: 0;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form>
    </div>
  );
}
