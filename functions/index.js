const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total, 10); // safest way to parse numbers
  if (total > 0) {
    console.log("payment received", total);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

exports.api = onRequest(app);

// const { onRequest } = require("firebase-functions/v2/https");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();

// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Success!",
//   });
// });

// exports.api = onRequest(app);

// http://127.0.0.1:5005/clone-b624b/us-central1/api/
