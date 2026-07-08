const { generateText } = require("./openAIService");
const { keywordPrompt } = require("../utils/prompts");

const extractKeywords = async (summary) => {
  const response = await generateText(
    keywordPrompt(summary)
  );

  try {
    return JSON.parse(response);
  } catch (err) {
    return [];
  }
};

module.exports = {
  extractKeywords,
};