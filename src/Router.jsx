// Router.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Auth from "./Pages/Auth/Auth";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//  Define stripePromise here
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryname" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Landing from "./Pages/Landing/Landing";
// import Payment from "./Pages/Payment/Payment";
// import Orders from "./Pages/Orders/Orders";
// import Cart from "./Pages/Cart/Cart";
// import Results from "./Pages/Results/Results";
// import ProductDetail from "./Pages/ProductDetail/ProductDetail";
// import Auth from "./Pages/Auth/Auth";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// function Routing() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route
//           path="/payments"
//           element={
//             <Elements stripe={stripePromise}>
//               <Payment />
//             </Elements>
//           }
//         />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/category/:categoryname" element={<Results />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }
// export default Routing;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Landing from "./Pages/Landing/Landing";
// import Signin from "./Pages/Auth/Auth";
// import Payment from "./Pages/Payment/Payment";
// import Orders from "./Pages/Orders/Orders";
// import Cart from "./Pages/Cart/Cart";
// import Results from "./Pages/Results/Results";
// import ProductDetail from "./Pages/ProductDetail/ProductDetail";

// function Routing() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<Signin />} />
//         <Route path="/payments" element={<Payment />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/category/:categoryname" element={<Results />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Routing;
