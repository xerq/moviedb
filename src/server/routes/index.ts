import {Router} from "express";
import moviesRouter from "./movies";
import commentsRouter from "./comments";

const router = Router();

router.use("/movies", moviesRouter);
router.use("/comments", commentsRouter);

export default router;
