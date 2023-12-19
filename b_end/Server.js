import dotenv from "dotenv";
import { ConnectDatabase } from "./Database/database.js";
import { app } from "./app.js";
import cloudinary from "cloudinary";

//Uncaught Error
//Unhandled Promise Rejection
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
});
//Config
dotenv.config({ path: "./Config/.env" });
const PORT = process.env.PORT || 2000;

//Database
ConnectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
  console.log(`server is online  at Port ${PORT}  `);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
