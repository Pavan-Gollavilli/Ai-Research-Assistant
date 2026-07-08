const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    snippet: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    publishedDate: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    authors: {
      type: [String],
      default: [],
    },
    publisher: {
      type: String,
      default: "",
    },
    publishedDate: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    infoLink: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const sourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["article", "book", "website"],
      default: "article",
    },
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    citation: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const researchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    keywords: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    report: {
      type: String,
      default: "",
    },

    articles: {
      type: [articleSchema],
      default: [],
    },

    books: {
      type: [bookSchema],
      default: [],
    },

    sources: {
      type: [sourceSchema],
      default: [],
    },

    searchMetadata: {
      totalArticles: {
        type: Number,
        default: 0,
      },
      totalBooks: {
        type: Number,
        default: 0,
      },
      searchTime: {
        type: Number,
        default: 0,
      },
    },

    generatedBy: {
      provider: {
        type: String,
        default: "",
      },
      model: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Research", researchSchema);