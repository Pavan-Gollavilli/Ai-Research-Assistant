const axios = require("axios");

const SERPER_API_URL = "https://google.serper.dev/search";

/**
 * Search the web using Serper API
 * @param {string} query
 * @returns {Promise<Array>}
 */
const searchWeb = async (query) => {
  try {
    const response = await axios.post(
      SERPER_API_URL,
      {
        q: query,
        num: 10,
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const organicResults = response.data.organic || [];

    const articles = organicResults.map((item) => ({
      title: item.title || "",
      url: item.link || "",
      snippet: item.snippet || "",
      source: item.source || "",
      publishedDate: item.date || "",
    }));

    return articles;
  } catch (error) {
    console.error("\n==============================");
    console.error("❌ Serper API Error");
    console.error("==============================");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw new Error("Failed to fetch articles from Serper.");
  }
};

module.exports = {
  searchWeb,
};