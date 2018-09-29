import {Router} from "express";
import config from "../../../config";
import * as validate from "validate.js";
import * as omdb from "../../../fetchers/omdb";
import {MovieModel} from "../../../models/Movie";
import {MovieInfoModel, MovieInfoSource} from "../../../models/MovieInfo";
import {CommentModel} from "../../../models/Comment";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const errors = validate.validate(req.body, {
      title: {
        presence: {
          allowEmpty: false,
        },
        length: {
          maximum: 250,
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

    const { title, year } = req.body;

    const movie = new MovieModel();

    movie.title = title;

    if (year) {
      movie.year = year;
    }

    const movieInfo = new MovieInfoModel();

    movieInfo.movie = movie._id;
    movieInfo.source = MovieInfoSource.OMDB;
    movieInfo.dump = await omdb.find(config.omdb.key, {
      t: title,
      ...(year ? { y: year } : {}),
    });

    await movie.save();
    await movieInfo.save();

    res.send({
      data: movie,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const movies = await MovieModel.find();

    res.send({
      data: movies,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send({
      data: await MovieModel.findById(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/info", async (req, res, next) => {
  try {
    res.send({
      data: await MovieInfoModel.find({ movie: req.params.id }),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    res.send({
      data: await CommentModel.find({ movie: req.params.id }),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
