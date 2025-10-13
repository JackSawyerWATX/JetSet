import express from "express"
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

connectDB

app.use("/", (req, res) => res.send("Hello from the server!"));

app.listen(ENV.PORT, () => console.log("Server is running on PORT:5001"));