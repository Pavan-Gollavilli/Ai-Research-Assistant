const Research = require("../models/Research");

const { searchWeb } = require("./serperService");
const { searchBooks } = require("./googleBooksService");
const { generateResearch } = require("./researchAgent");

/**
 * ======================================================
 * AI Research Pipeline
 * ======================================================
 */

const runResearchPipeline = async ({
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

    console.log(`📌 Topic      : ${topic}`);
    console.log(`📂 Category   : ${category}`);
    console.log(`🌐 Language   : ${language}`);
    console.log(`📚 Difficulty : ${difficulty}`);

    // ======================================
    // STEP 1 : Search Articles
    // ======================================

    console.log("\n🔍 Searching Articles...");

    const searchStart = Date.now();

    const articles = await searchWeb(topic);

    console.log(`✅ Articles : ${articles.length}`);

    // ======================================
    // STEP 2 : Search Books
    // ======================================

    console.log("\n📚 Searching Books...");

    const books = await searchBooks(topic);

    console.log(`✅ Books : ${books.length}`);

    if (!articles.length && !books.length) {
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
    // Metadata
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
    // Save
    // ======================================

    const research = await Research.create({
      title,
      topic,
      category,
      language,
      difficulty,

      status: "completed",

      summary,
      keywords,
      report,

      articles,
      books,

      sources: citations,

      citationStyle,

      searchMetadata,

      generatedBy: {
        provider: "Google Gemini",
        model: "gemini-2.5-flash",
      },

      processingTime,
    });

    console.log("\n========================================");
    console.log("🎉 PIPELINE COMPLETED");
    console.log("========================================");

    console.log(`Articles : ${articles.length}`);
    console.log(`Books    : ${books.length}`);
    console.log(`Sources  : ${citations.length}`);
    console.log(`Time     : ${processingTime} sec`);

    return research;
  } catch (error) {
    console.error("\n========================================");
    console.error("❌ PIPELINE FAILED");
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