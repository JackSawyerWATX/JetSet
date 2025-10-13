import express from "express"
import cors from "cors";
import userRoutes from "./routes/user.route.js";

import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("The server says HELLO!"));

app.use("/api/users", userRoutes)

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on PORT:", ENV.PORT));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();