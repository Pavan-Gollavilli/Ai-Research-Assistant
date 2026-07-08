const { generateText } = require("./openAIService");
const { reportPrompt } = require("../utils/prompts");

const generateReport = async (
  topic,
  summary,
  articles,
  books
) => {
  let articleContent = "";

  articles.forEach((article) => {
    articleContent += `
Title: ${article.title}
${article.snippet}

`;
  });

  let bookContent = "";

  books.forEach((book) => {
    bookContent += `
Book: ${book.title}
${book.description}

`;
  });

  return await generateText(
    reportPrompt(
      topic,
      summary,
      articleContent,
      bookContent
    )
  );
};

module.exports = {
  generateReport,
};