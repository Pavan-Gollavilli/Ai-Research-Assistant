const express = require("express");

const {
  createResearch,
  getResearchById,
  listResearch,
  deleteResearch,
} = require("../controllers/researchController");

const router = express.Router();

router
  .route("/")
  .get(listResearch)
  .post(createResearch);

router
  .route("/:id")
  .get(getResearchById)
  .delete(deleteResearch);

module.exports = router;