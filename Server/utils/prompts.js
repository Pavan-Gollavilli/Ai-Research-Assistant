const researchPrompt = ({
  topic,
  articles,
  books,
  citationStyle = "APA",
}) => `
You are an expert AI Research Assistant.

Research Topic:
${topic}

Articles:
${articles
  .map(
    (article, index) => `
${index + 1}. ${article.title}
Source: ${article.source}
Snippet: ${article.snippet}
`
  )
  .join("\n")}

Books:
${books
  .map(
    (book, index) => `
${index + 1}. ${book.title}
Authors: ${book.authors?.join(", ")}
Description: ${book.description}
`
  )
  .join("\n")}

Return ONLY valid JSON.

{
  "summary": {
    "overview": "",
    "keyPoints": [],
    "importantFacts": [],
    "recommendations": [],
    "limitations": [],
    "conclusion": ""
  },

  "keywords": {
    "primary": [],
    "secondary": [],
    "tags": []
  },

  "report": {
    "executiveSummary": "",
    "introduction": "",
    "background": "",
    "currentTrends": "",
    "technologies": "",
    "applications": "",
    "advantages": [],
    "challenges": [],
    "futureScope": "",
    "bestPractices": [],
    "conclusion": ""
  },

  "citations": [
  {
    "type": "article",
    "title": "",
    "url": "",
    "citation": ""
  }
  ]
}

Rules

SUMMARY
- Overview: 100–150 words
- 5 key points
- 5 important facts
- 3 recommendations
- 3 limitations
- Conclusion: 80–100 words

KEYWORDS
- 5 primary
- 5 secondary
- 8 tags

REPORT
- Executive Summary: 120 words
- Introduction: 150 words
- Background: 150 words
- Current Trends: 5 bullet points
- Technologies: 5 bullet points
- Applications: 5 bullet points
- Advantages: 6 bullet points
- Challenges: 6 bullet points
- Future Scope: 150 words
- Best Practices: 6 bullet points
- Conclusion: 120 words

CITATIONS

Generate citations in ${citationStyle} format.

Return an array of citation objects.

Each article citation must follow:

{
  "type": "article",
  "title": "Article Title",
  "url": "https://example.com",
  "citation": "APA formatted citation"
}

Each book citation must follow:

{
  "type": "book",
  "title": "Book Title",
  "url": "https://books.google.com/...",
  "citation": "APA formatted citation"
}

IMPORTANT

- Return ONLY valid JSON.
- Do NOT return citations as plain strings.
- Do NOT use markdown.
- Do NOT add explanations.
- Every citation must contain:
  - type
  - title
  - url
  - citation
`;

module.exports = {
  researchPrompt,
};