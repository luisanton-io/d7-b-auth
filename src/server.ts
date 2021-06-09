import express, { NextFunction } from "express";
import dotenv from 'dotenv'

dotenv.config()
import cors from "cors";
import articlesRoutes from "./articles/articles";
import authorsRoutes from "./articles/authors";
import ErrorResponse from "./lib/errorResponse";
import mongoose from "mongoose";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} from "./lib/errorHandlers";
import listEndpoints from "express-list-endpoints";

const app = express();

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];

const corsOptions = {
  origin: function (origin: string, next: NextFunction) {
    if (whiteList.indexOf(origin) !== -1) {
      console.log("ORIGIN: ", origin);

      next();
    } else {
      next(new ErrorResponse(403, `NOT ALLOWED BY CORS`));
    }
  },
};

app.use(cors());
app.use(express.json());

app.use("/articles", articlesRoutes);
app.use("/authors", authorsRoutes);

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

const port = process.env.PORT || 3005;
console.log(listEndpoints(app));

const { MONGODB_ADDRESS } = process.env

if (!MONGODB_ADDRESS) {
  throw new Error("No .env configured.")
}

mongoose
  .connect(MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
