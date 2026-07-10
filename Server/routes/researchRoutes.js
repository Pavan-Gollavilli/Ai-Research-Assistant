const express = require("express");

const {
  createResearch,
  getAllResearch,
  getResearchById,
  deleteResearch,
  getResearchStats,
} = require("../controllers/researchController");

const router = express.Router();

/**
 * Research Statistics
 */
router.get("/stats", getResearchStats);

/**
 * Create & Get All
 */
router
  .route("/")
  .get(getAllResearch)
  .post(createResearch);

/**
 * Get/Delete by ID
 */
router
  .route("/:id")
  .get(getResearchById)
  .delete(deleteResearch);

module.exports = router;