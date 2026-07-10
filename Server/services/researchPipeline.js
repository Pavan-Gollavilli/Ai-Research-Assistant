const Research = require("../models/Research");

const { searchWeb } = require("./serperService");
const { searchBooks } = require("./googleBooksService");
const { generateResearch } = require("./researchAgent");

/**
 * ======================================================
 * AI Research Pipeline
 * ======================================================
 *
 * Flow:
 * User
 *   ↓
 * Web Search Agent
 *   ↓
 * Book Search Agent
 *   ↓
 * AI Research Agent
 *   ↓
 * Save to MongoDB
 * ======================================================
 */

const runResearchPipeline = async ({
  userId,
  title,
  topic,
  category = "General",
  language = "English",
  difficulty = "Intermediate",
  citationStyle = "APA",
}) => {
  const pipelineStart = Date.now();

  try {
    console.log("\n========================================");
    console.log("🚀 AI RESEARCH PIPELINE STARTED");
    console.log("========================================");

    console.log(`👤 User ID    : ${userId}`);
    console.log(`📌 Topic      : ${topic}`);
    console.log(`📂 Category   : ${category}`);
    console.log(`🌐 Language   : ${language}`);
    console.log(`📚 Difficulty : ${difficulty}`);
    console.log(`📖 Citation   : ${citationStyle}`);

    // ======================================
    // STEP 1 : Search Articles
    // ======================================

    console.log("\n🔍 Searching Articles...");

    const searchStart = Date.now();

    const allArticles = await searchWeb(topic);

    // Limit to Top 5
    const articles = allArticles.slice(0, 5);

    console.log(`✅ Articles Found : ${articles.length}`);

    // ======================================
    // STEP 2 : Search Books
    // ======================================

    console.log("\n📚 Searching Books...");

    const allBooks = await searchBooks(topic);

    // Limit to Top 3
    const books = allBooks.slice(0, 3);

    console.log(`✅ Books Found : ${books.length}`);

    // ======================================
    // Validation
    // ======================================

    if (articles.length === 0 && books.length === 0) {
      throw new Error("No research sources found.");
    }

    // ======================================
    // STEP 3 : AI Research Agent
    // ======================================

    console.log("\n🤖 Running AI Research Agent...");

    const {
      summary,
      keywords,
      report,
      citations,
    } = await generateResearch({
      topic,
      articles,
      books,
      citationStyle,
    });

    console.log("✅ AI Research Generated");

    // ======================================
    // Search Metadata
    // ======================================

    const searchEnd = Date.now();

    const processingTime = Number(
      ((Date.now() - pipelineStart) / 1000).toFixed(2)
    );

    const searchMetadata = {
      totalArticles: articles.length,
      totalBooks: books.length,
      totalSources: articles.length + books.length,
      searchTime: Number(
        ((searchEnd - searchStart) / 1000).toFixed(2)
      ),
      generatedAt: new Date(),
    };

    // ======================================
    // Save Research
    // ======================================

    console.log("\n💾 Saving Research...");

    const research = await Research.create({
      // ======================================
      // User
      // ======================================
      user: userId,

      // ======================================
      // Basic Information
      // ======================================
      title,
      topic,
      category,
      language,
      difficulty,

      // ======================================
      // Status
      // ======================================
      status: "completed",

      // ======================================
      // AI Output
      // ======================================
      summary,
      keywords,
      report,

      // ======================================
      // Search Results
      // ======================================
      articles,
      books,

      // ======================================
      // Citations
      // ======================================
      sources: citations,
      citationStyle,

      // ======================================
      // Metadata
      // ======================================
      searchMetadata,

      generatedBy: {
        provider: "Google Gemini",
        model: "gemini-2.5-flash",
      },

      processingTime,
    });

    // ======================================
    // Completed
    // ======================================

    console.log("\n========================================");
    console.log("🎉 AI RESEARCH PIPELINE COMPLETED");
    console.log("========================================");

    console.table({
      User: userId.toString(),
      Articles: articles.length,
      Books: books.length,
      Citations: citations.length,
      "Processing Time": `${processingTime}s`,
    });

    return research;

  } catch (error) {

    console.error("\n========================================");
    console.error("❌ AI RESEARCH PIPELINE FAILED");
    console.error("========================================");

    console.error(error);

    throw new Error(
      `Research pipeline failed: ${error.message}`
    );

  }
};

module.exports = {
  runResearchPipeline,
};