const mongoose = require("mongoose");

// ============================================
// Article Schema
// ============================================

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
  {
    _id: false,
  }
);

// ============================================
// Book Schema
// ============================================

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
  {
    _id: false,
  }
);

// ============================================
// Source Schema
// ============================================
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

// ============================================
// Summary Schema
// ============================================

const summarySchema = new mongoose.Schema(
  {
    overview: {
      type: String,
      default: "",
    },

    keyPoints: {
      type: [String],
      default: [],
    },

    importantFacts: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    limitations: {
      type: [String],
      default: [],
    },

    conclusion: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

// ============================================
// Report Schema
// ============================================

const reportSchema = new mongoose.Schema(
  {
    executiveSummary: {
      type: String,
      default: "",
    },

    introduction: {
      type: String,
      default: "",
    },

    background: {
      type: String,
      default: "",
    },

    currentTrends: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    applications: {
      type: [String],
      default: [],
    },

    advantages: {
      type: [String],
      default: [],
    },

    challenges: {
      type: [String],
      default: [],
    },

    futureScope: {
      type: String,
      default: "",
    },

    bestPractices: {
      type: [String],
      default: [],
    },

    conclusion: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

// ============================================
// Research Schema
// ============================================

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

    category: {
      type: String,
      default: "General",
    },

    language: {
      type: String,
      default: "English",
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "processing",
    },

    keywords: {
      primary: {
        type: [String],
        default: [],
      },

      secondary: {
        type: [String],
        default: [],
      },

      tags: {
        type: [String],
        default: [],
      },
    },

    summary: {
      type: summarySchema,
      default: () => ({}),
    },

    report: {
      type: reportSchema,
      default: () => ({}),
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

    citationStyle: {
      type: String,
      enum: ["APA", "MLA", "IEEE"],
      default: "APA",
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

      totalSources: {
        type: Number,
        default: 0,
      },

      searchTime: {
        type: Number,
        default: 0,
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },

    generatedBy: {
      provider: {
        type: String,
        default: "Google Gemini",
      },

      model: {
        type: String,
        default: "gemini-2.5-flash",
      },
    },

    processingTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ============================================
// Indexes
// ============================================

researchSchema.index({
  title: "text",
  topic: "text",
});

researchSchema.index({
  category: 1,
});

researchSchema.index({
  status: 1,
});

researchSchema.index({
  createdAt: -1,
});

// ============================================
// Export
// ============================================

module.exports = mongoose.model("Research", researchSchema);