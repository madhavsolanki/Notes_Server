import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import noteRoutes from './routes/notes.routes.js';
import connectDB from './db/db.js';
import cors from "cors";

dotenv.config();
const app = express();

connectDB();

// Middleware to parse JSON request bodies

app.use(express.json());
app.use(cors({ origin: "*", credentials: true })); // Allow all origins (for testing)

app.use("/users", userRoutes);
app.use("/note", noteRoutes);

app.listen(process.env.PORT, "0.0.0.0", () =>{
  console.log(`Server is running on port ${process.env.PORT}`);
});