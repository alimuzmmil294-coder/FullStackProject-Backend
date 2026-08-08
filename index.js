import { config } from "dotenv";
import express from "express";
import dbConnection from "./Src/configs/dbConnection.js";
import { errorMiddleware } from "./Src/middlewares/errorMiddleware.js";
import allRoutes from "./Src/routes/index.js";
import cors from "cors";
import Stripe from "stripe";
config();
dbConnection();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174",
  }),
);
const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!, this is the index file...");
});

app.use("/api", allRoutes);

app.get("/checkout", async (req, res) => {
  try {
    const line_items = [
      {
        price_data: {
          currency: "pkr",
          product_data: {
            name: "Honda Civic 2026",
            description: "Rayzen Laptop is the best Laptop!",
          },
          unit_amount: 8499000,
        },
        quantity: 3,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: "http://localhost:3500/success",
      cancel_url: "http://localhost:3500/cancel",
    });

    res.json({ session: session.url });
  } catch (error) {
    console.log(error.message);
  }
});
app.use(errorMiddleware);

app.listen(3500, () => {
  console.log("Server is running on port http://localhost:3500");
});
