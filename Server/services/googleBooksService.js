const axios = require("axios");

const searchBooks = async (query) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: query,
          maxResults: 5,
          key: process.env.GOOGLE_BOOKS_API_KEY,
        },
      }
    );

    const books = response.data.items || [];

    return books.map((book) => ({
      title: book.volumeInfo.title || "",

      authors: book.volumeInfo.authors || [],

      publisher: book.volumeInfo.publisher || "",

      publishedDate: book.volumeInfo.publishedDate || "",

      description: book.volumeInfo.description || "",

      thumbnail:
        book.volumeInfo.imageLinks?.thumbnail || "",

      infoLink: book.volumeInfo.infoLink || "",
    }));
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Unable to fetch books.");
  }
};

module.exports = {
  searchBooks,
};