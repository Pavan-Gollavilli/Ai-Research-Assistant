const Research = require("../models/Research");
const { runResearchPipeline } = require("../services/researchPipeline");

// ======================================================
// @desc    Get all research
// @route   GET /api/research
// ======================================================
const listResearch = async (req, res, next) => {
  try {
    const research = await Research.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: research.length,
      data: research,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// @desc    Get research by ID
// @route   GET /api/research/:id
// ======================================================
const getResearchById = async (req, res, next) => {
  try {
    const research = await Research.findById(req.params.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    res.status(200).json({
      success: true,
      data: research,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// @desc    Create Research
// @route   POST /api/research
// ======================================================
const createResearch = async (req, res, next) => {
  try {
    const { title, topic } = req.body;

    if (!title || !topic) {
      return res.status(400).json({
        success: false,
        message: "Title and Topic are required",
      });
    }

    // Run the complete research pipeline
    const result = await runResearchPipeline(topic);

    // Save to MongoDB
    const research = await Research.create({
      title,
      topic,

      status: result.status,

      keywords: result.keywords,

      summary: result.summary,

      report: result.report,

      articles: result.articles,

      books: result.books,

      sources: result.sources,

      searchMetadata: result.searchMetadata,

      generatedBy: result.generatedBy,
    });

    res.status(201).json({
      success: true,
      message: "Research completed successfully",
      data: research,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// @desc    Delete Research
// @route   DELETE /api/research/:id
// ======================================================
const deleteResearch = async (req, res, next) => {
  try {
    const research = await Research.findById(req.params.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    await research.deleteOne();

    res.status(200).json({
      success: true,
      message: "Research deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listResearch,
  getResearchById,
  createResearch,
  deleteResearch,
};