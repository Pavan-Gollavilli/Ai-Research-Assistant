const { generateText } = require("./openAIService");
const { summaryPrompt } = require("../utils/prompts");

const generateSummary = async (articles, books) => {
  let content = "";

  articles.forEach((article) => {
    content += `
Title: ${article.title}
${article.snippet}

`;
  });

  books.forEach((book) => {
    content += `
Book: ${book.title}
${book.description}

`;
  });

  return await generateText(summaryPrompt(content));
};

module.exports = {
  generateSummary,
};