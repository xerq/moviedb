import {Router} from "express";
import * as validate from "validate.js";
import {MovieModel} from "../../../models/Movie";
import {CommentModel} from "../../../models/Comment";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const errors = validate.validate(req.body, {
      movie: {
        presence: {
          allowEmpty: false,
        },
      },
      text: {
        presence: {
          allowEmpty: false,
        },
        length: {
          maximum: 1000,
        },
      },
    });

    if (errors) {
      res.send({
        error: true,
        message: "Validation error",
        data: errors,
      });
      return;
    }

    const { movie, authorName, text } = req.body;

    if (!(await MovieModel.findById(movie))) {
      throw new Error(`Couldn't find a movie with ID: ${movie}`);
    }

    const comment = new CommentModel();

    comment.movie = movie;
    comment.authorName = authorName;
    comment.text = text;

    await comment.save();

    res.send({
      data: comment,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send({
      data: await CommentModel.find(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
