// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { router } from './routes/userRoute1.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import Transaction from './models/transactions.js';

dotenv.config(); // Load environment variables
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/api/user", router); // Use the userRouter for user-related routes
connectDB(); // Connect to MongoDB

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

// Create checkout session API
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.dish,
          images: [product.imgdata],
        },
        unit_amount: product.price, // Price is already in cents
      },
      quantity: product.qnty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/main/transactions`, // Redirect to transactions page after payment
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: error.message });
  }
});

app.get('/', (req, res) => {
    res.send("Server is running...");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
