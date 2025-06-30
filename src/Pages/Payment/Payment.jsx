// Payment.jsx
import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CurrencyFormat from "../../Components/Currency/CurrencyFormat";
import { axiosInstance } from "../../API/axios"; // Make sure axiosInstance is exported correctly
import { CircleLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate total items and total price
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Call the backend to create a payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // Use Stripe's confirmCardPayment to process the payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Save the order to Firestore after payment is confirmed
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.error("Payment Error:", error);
      setCardError("An error occurred while processing your payment.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      {/* Delivery Address Section */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1234 React Rd</div> {/* Ideally, this should be dynamic */}
            <div>Denver, CO</div>
          </div>
        </div>
        <hr />

        {/* Review Items and Delivery Section */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* Payment Method Section */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <form onSubmit={handlePayment}>
              {/* Card error message */}
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}

              {/* Stripe Card Element */}
              <CardElement onChange={handleChange} />

              {/* Price Display */}
              <div className={classes.payment__price}>
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order |</p> <CurrencyFormat amount={total} />
                  </span>
                </div>
                <button type="submit">
                  {processing ? (
                    <div className={classes.loading}>
                      <CircleLoader color="gray" size={12} />
                      <p>Please Wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

// import React, { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";

// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// import CurrencyFormat from "../../Components/Currency/CurrencyFormat";
// import { axiosInstance } from "../../API/axios";

// // import axiosInstance from "../../API/axios";
// import { CircleLoader } from "react-spinners";
// import { db } from "../../Utility/firebase";
// import { useNavigate } from "react-router-dom";
// import { Type } from "../../Utility/action.type";

// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);
//   // console.log(user);
//   const totalItem = basket?.reduce((amount, item) => {
//     return item.amount + amount;
//   }, 0);
//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // console.log(e);
//     e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//   };
//   const handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       setProcessing(true);
//       // 1. backend || functions ---> contact to the client secret
//       const response = await axiosInstance({
//         method: "POST",
//         url: `/payment/create?total=${total * 100}`,
//       });
//       // console.log(response.data);
//       const clientSecret = response.data?.clientSecret;

//       //2. client side react side confirmation
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
//       console.log(paymentIntent);

//       // 3. after the confirmation --> order firestore database save, clear basket

//       await db
//         .collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });
//       //empty the basket
//       dispatch({ type: Type.EMPTY_BASKET });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "you have placed new Order" } });
//     } catch (error) {
//       console.log(error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       {/* header */}
//       <div className={classes.payment__header}>Checkout({totalItem}) items</div>
//       {/* payment method */}
//       <section className={classes.payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>1234 React Rd</div>
//             <div>Denver, CO</div>
//           </div>
//         </div>
//         <hr />

//         {/* product */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {/* //{" "} */}
//             {basket?.map((item) => (
//               <ProductCard key={item.id} product={item} flex={true} />
//             ))}
//           </div>
//         </div>
//         <hr />
//         {/* card form */}
//         <div className={classes.flex}>
//           <h3>Payment methods</h3>
//           <div className={classes.payment_card_conatainer}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {/* error */}
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 {/* card element */}
//                 <CardElement onChange={handleChange} />
//                 {/* price */}
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p> <CurrencyFormat amount={total} />
//                     </span>
//                   </div>
//                   <button type="submit">
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <CircleLoader color="gray" size={12} />
//                         <p>Please Wait...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;

// import React from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../components/LayOut/LayOut";

// function Payment() {
//   return (
//     <LayOut>
//       {/* header */}
//  <div>Checkout (2) items</div>
//       {/* payment method */}
//       <section className={classes.payment}>
//         {/* address */}
//         <div>
//           <h3>Delivery Address</h3>
//           {/* Address details here */}
//         </div>

//         {/* product */}
//         <div>
//           <h3>Review items and delivery</h3>
//           {/* Product list here */}
//         </div>

//         {/* card form */}
//         <div>
//           <h3>Payment methods</h3>
//           {/* Payment form here */}
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;

////
// import React from 'react'
// import LayOut from '../../Components/LayOut/LayOut';
// import classes from "./Payment.module.css"

// function Payment() {
//   return (
//     <LayOut>
//       <div>Payment</div>
//     </LayOut>
//   );
// }

// export default Payment
