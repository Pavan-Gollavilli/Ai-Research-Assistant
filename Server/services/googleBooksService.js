const axios = require("axios");

const GOOGLE_BOOKS_API =
  "https://www.googleapis.com/books/v1/volumes";

/**
 * Search books from Google Books API
 * @param {string} query
 * @returns {Promise<Array>}
 */
const searchBooks = async (query) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      params: {
        q: query,
        maxResults: 5,
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });

    const items = response.data.items || [];

    const uniqueBooks = [];

    const titles = new Set();

    items.forEach((item) => {
      const info = item.volumeInfo;

      if (!info) return;

      if (titles.has(info.title)) return;

      titles.add(info.title);

      uniqueBooks.push({
        title: info.title || "",

        authors: info.authors || [],

        publisher: info.publisher || "",

        publishedDate: info.publishedDate || "",

        description: info.description || "",

        thumbnail:
          info.imageLinks?.thumbnail || "",

        infoLink: info.infoLink || "",
      });
    });

    return uniqueBooks;
  } catch (error) {
    console.error("\n==============================");
    console.error("❌ Google Books API Error");
    console.error("==============================");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw new Error("Failed to fetch books.");
  }
};

module.exports = {
  searchBooks,
};