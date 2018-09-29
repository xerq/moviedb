import * as express from "express";
import {json} from "body-parser";
import mainRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(json());

app.use("/", mainRouter);

app.use(errorHandler);

export default app;
