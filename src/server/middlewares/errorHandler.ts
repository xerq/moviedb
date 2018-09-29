import * as express from "express";

export default (err: Error, req: express.Request, res: express.Response, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(`Error on handling ${req.originalUrl}. Error: `, err);
  }

  res.send({
    error: true,
    message: err.message,
  });
};
