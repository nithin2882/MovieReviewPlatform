const express = require("express");
const router = express.Router();
const movie = require("../services/movie");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await movie.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting movie `, err.message);
    next(err);
  }
});
router.get("/published", async function (req, res, next) {
    try {
      res.json(await movie.getPublishedMovies(req.query.page));
    } catch (err) {
      console.error(`Error movie not published `, err.message);
      next(err);
    }
  });
  router.get("/topreviews", async function (req, res, next) {
    try {
      res.json(await movie.getReviewsbyMovie(req.query.page));
    } catch (err) {
      console.error(`Error movie not published `, err.message);
      next(err);
    }
  });
router.post("/", async function (req, res, next) {
  try {
    res.json(await movie.create(req.body));
  } catch (err) {
    console.error(`Error while creating movie`, err.message);
    next(err);
  }
});
router.put("/", async function (req, res, next) {
  try {
    res.json(await movie.update(req.body));
  } catch (err) {
    console.error(`Error while creating movie`, err.message);
    next(err);
  }
});
module.exports = router;
