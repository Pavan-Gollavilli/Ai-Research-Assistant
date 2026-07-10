const { generateJSON } = require("./llmService");
const { researchPrompt } = require("../utils/prompts");

/**
 * ==========================================================
 * AI Research Agent
 *
 * Uses ONE Gemini request to generate:
 * - Summary
 * - Keywords
 * - Report
 * - Citations
 * ==========================================================
 */

const generateResearch = async ({
  topic,
  articles,
  books,
  citationStyle = "APA",
}) => {
  try {
    console.log("\n========================================");
    console.log("🤖 AI RESEARCH AGENT");
    console.log("========================================");

    const prompt = researchPrompt({
      topic,
      articles,
      books,
      citationStyle,
    });

    const result = await generateJSON(prompt);

    console.log("✅ AI Research Generated Successfully");

    return {
      summary: result.summary || {
        overview: "",
        keyPoints: [],
        importantFacts: [],
        recommendations: [],
        limitations: [],
        conclusion: "",
      },

      keywords: result.keywords || {
        primary: [],
        secondary: [],
        tags: [],
      },

      report: result.report || {
        executiveSummary: "",
        introduction: "",
        background: "",
        currentTrends: "",
        technologies: "",
        applications: "",
        advantages: [],
        challenges: [],
        futureScope: "",
        bestPractices: [],
        conclusion: "",
      },

      citations: result.citations || [],
    };
  } 
  
  catch (error) {
    console.error("\n========================================");
    console.error("❌ AI Research Agent Failed");
    console.error("========================================");

    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Code:", error.code);
    console.error("Cause:", error.cause);

    if (error.stack) {
      console.error(error.stack);
    }

    throw error;
  }
};

module.exports = {
  generateResearch,
};