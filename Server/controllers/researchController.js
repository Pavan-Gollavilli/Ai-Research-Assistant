const Research = require("../models/Research");
const { runResearchPipeline } = require("../services/researchPipeline");

/**
 * ===========================================
 * @desc    Create Research
 * @route   POST /api/research
 * @access  Public
 * ===========================================
 */

const createResearch = async (req, res, next) => {
  try {
    const {
      title,
      topic,
      category,
      language,
      difficulty,
      citationStyle,
    } = req.body;

    // ============================
    // Validation
    // ============================

    if (!title || !topic) {
      return res.status(400).json({
        success: false,
        message: "Title and Topic are required.",
      });
    }

    // ============================
    // Run AI Pipeline
    // ============================

    const research = await runResearchPipeline({
      title,
      topic,
      category,
      language,
      difficulty,
      citationStyle,
    });

    res.status(201).json({
      success: true,
      message: "Research completed successfully.",
      data: research,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ===========================================
 * @desc    Get All Research
 * @route   GET /api/research
 * @access  Public
 * ===========================================
 */

const getAllResearch = async (req, res, next) => {
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

/**
 * ===========================================
 * @desc    Get Research By ID
 * @route   GET /api/research/:id
 * @access  Public
 * ===========================================
 */

const getResearchById = async (req, res, next) => {
  try {
    const research = await Research.findById(req.params.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found.",
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

/**
 * ===========================================
 * @desc    Delete Research
 * @route   DELETE /api/research/:id
 * @access  Public
 * ===========================================
 */

const deleteResearch = async (req, res, next) => {
  try {
    const research = await Research.findById(req.params.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found.",
      });
    }

    await research.deleteOne();

    res.status(200).json({
      success: true,
      message: "Research deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ===========================================
 * @desc    Get Research Statistics
 * @route   GET /api/research/stats
 * @access  Public
 * ===========================================
 */

const getResearchStats = async (req, res, next) => {
  try {
    const totalResearch = await Research.countDocuments();

    const completed = await Research.countDocuments({
      status: "completed",
    });

    const processing = await Research.countDocuments({
      status: "processing",
    });

    const failed = await Research.countDocuments({
      status: "failed",
    });

    res.status(200).json({
      success: true,
      data: {
        totalResearch,
        completed,
        processing,
        failed,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResearch,
  getAllResearch,
  getResearchById,
  deleteResearch,
  getResearchStats,
};