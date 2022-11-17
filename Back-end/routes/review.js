const express = require("express");
const router = express.Router();
const review= require("../services/review");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await review.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while reviewing `, err.message);
    next(err);
  }
});
router.post("/", async function (req, res, next) {
  try {
    res.json(await review.create(req.body));
  } catch (err) {
    console.error(`Error while reviewing`, err.message);
    next(err);
  }

});
router.post("/list", async function (req, res, next) {
  try {
    res.json(await review.getReviewsbyMovie(req.body));
  } catch (err) {
    console.error(`Error while reviewing`, err.message);
    next(err);
  }
});
module.exports = router;