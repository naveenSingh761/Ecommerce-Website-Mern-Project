import express from "express";

import productRoute from "./Routes/Route/productRoutes.js";
import orderRouter from "./Routes/Route/orderRoute.js";
import Erromiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/Route/userRoutes.js";
import cors from "cors";
import bodyparser from "body-parser";
import fileupload from "express-fileupload";

const app = express();

// /cross Browser Policy
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's origin
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true,limit: '50mb'}));

// app.use(express.json());
app.use(fileupload());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// / Configure all Routes
app.use("/", productRoute);
app.use("/", userRouter);
app.use("/", orderRouter);

app.use(Erromiddleware);
export { app, express };
