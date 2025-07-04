// App.jsx

import React from "react";
import Routing from "./Router.jsx";
function App() {
  console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
