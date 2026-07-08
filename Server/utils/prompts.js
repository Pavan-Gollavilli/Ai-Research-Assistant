// utils/prompts.js

// ===========================================
// SUMMARY PROMPT
// ===========================================
const summaryPrompt = (content) => `
You are an expert AI Research Assistant.

Your task is to summarize the research content below.

Instructions:
- Write in simple and professional English.
- Keep the summary between 300 and 500 words.
- Explain the main ideas clearly.
- Avoid unnecessary repetition.
- Do not make up facts.
- Use only the information provided.

Research Content:

${content}
`;

// ===========================================
// KEYWORD PROMPT
// ===========================================
const keywordPrompt = (summary) => `
You are an AI assistant.

Extract the 10 most important keywords from the following summary.

Rules:
- Return ONLY a valid JSON array.
- No explanation.
- No markdown.
- No numbering.

Example:

[
  "Artificial Intelligence",
  "Machine Learning",
  "Healthcare"
]

Summary:

${summary}
`;

// ===========================================
// REPORT PROMPT
// ===========================================
const reportPrompt = (
  topic,
  summary,
  articleContent,
  bookContent
) => `
You are a professional research analyst.

Prepare a detailed research report.

Topic:
${topic}

Summary:
${summary}

Articles:
${articleContent}

Books:
${bookContent}

The report should contain the following sections:

# Introduction

# Background

# Current Trends

# Key Technologies

# Applications

# Advantages

# Challenges

# Future Scope

# Conclusion

Rules:
- Use professional language.
- Write in paragraphs.
- Use headings.
- Do not invent information.
- Use only the provided content.
`;

// ===========================================
// MODULE EXPORTS
// ===========================================
module.exports = {
  summaryPrompt,
  keywordPrompt,
  reportPrompt,
};