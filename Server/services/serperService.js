const axios = require("axios");

const searchWeb = async (query) => {
  try {
    const response = await axios.post(
      "https://google.serper.dev/search",
      {
        q: query,
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const organic = response.data.organic || [];

    return organic.map((item) => ({
      title: item.title || "",
      url: item.link || "",
      snippet: item.snippet || "",
      source: item.source || "",
      publishedDate: item.date || "",
    }));
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Unable to fetch web articles.");
  }
};

module.exports = {
  searchWeb,
};