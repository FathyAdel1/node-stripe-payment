import { useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 10,
  });
  const publishable_key = process.env.REACT_APP_STRIPE_KEY;
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/payments",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        console.log(`Your payment is successfull!`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const stripePrice = product.price * 100;
  return (
    <div className="App">
      <h2>Complete react stripe payment integration</h2>
      <p>
        <span>Product:{product.name}</span>
      </p>
      <p>
        <span>Price:{product.price}</span>
      </p>
      <StripeCheckout
        stripeKey={publishable_key}
        label={`pay now`}
        name="pay with credit card"
        billingAddress
        shippingAddress
        amount={stripePrice}
        description={`Your total is ${product.price}`}
        token={payNow}
      ></StripeCheckout>
    </div>
  );
}

export default App;
