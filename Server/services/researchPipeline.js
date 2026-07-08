// services/researchPipeline.js

const { searchWeb } = require("./serperService");
const { searchBooks } = require("./googleBooksService");
const { generateSummary } = require("./summaryService");
const { extractKeywords } = require("./keywordService");
const { generateReport } = require("./reportService");
const { generateCitations } = require("./citationService");

const runResearchPipeline = async (topic) => {
  const startTime = Date.now();

  console.log("\n========================================");
  console.log("🚀 AI Research Pipeline Started");
  console.log("📌 Topic:", topic);
  console.log("========================================\n");

  try {
    // =====================================
    // STEP 1 - Search Articles & Books
    // =====================================

    console.log("🔍 Searching articles and books...");

    const [articles, books] = await Promise.all([
      searchWeb(topic),
      searchBooks(topic),
    ]);

    console.log(`✅ Articles Found : ${articles.length}`);
    console.log(`✅ Books Found    : ${books.length}`);

    // =====================================
    // STEP 2 - Generate Summary
    // =====================================

    console.log("\n📝 Generating summary...");

    const summary = await generateSummary(
      articles,
      books
    );

    console.log("✅ Summary Generated");

    // =====================================
    // STEP 3 - Extract Keywords
    // =====================================

    console.log("\n🏷 Extracting keywords...");

    const keywords = await extractKeywords(summary);

    console.log("✅ Keywords Extracted");

    // =====================================
    // STEP 4 - Generate Report
    // =====================================

    console.log("\n📄 Generating research report...");

    const report = await generateReport(
      topic,
      summary,
      articles,
      books
    );

    console.log("✅ Report Generated");

    // =====================================
    // STEP 5 - Generate Citations
    // =====================================

    console.log("\n📚 Generating citations...");

    const sources = generateCitations(
      articles,
      books
    );

    console.log("✅ Citations Generated");

    // =====================================
    // STEP 6 - Calculate Time
    // =====================================

    const endTime = Date.now();

    const searchTime = (
      (endTime - startTime) /
      1000
    ).toFixed(2);

    console.log("\n========================================");
    console.log("🎉 Research Pipeline Completed");
    console.log(`⏱ Time Taken : ${searchTime} sec`);
    console.log("========================================\n");

    // =====================================
    // Return Result
    // =====================================

    return {
      status: "completed",

      topic,

      keywords,

      summary,

      report,

      articles,

      books,

      sources,

      searchMetadata: {
        totalArticles: articles.length,
        totalBooks: books.length,
        searchTime,
      },

    generatedBy: {
    provider: "Google Gemini + Serper + Google Books",
    model: "gemini-2.5-flash"
    },
    };
  } catch (error) {
    console.error("\n❌ Research Pipeline Failed");
    console.error(error);

    throw new Error(
      "Research pipeline failed: " + error.message
    );
  }
};

module.exports = {
  runResearchPipeline,
};