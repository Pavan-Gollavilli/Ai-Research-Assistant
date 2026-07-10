const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-2.5-flash";

// ===========================================
// Delay Function
// ===========================================

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ===========================================
// Generate Plain Text
// ===========================================

const generateText = async (prompt) => {
  const MAX_RETRIES = 5;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });

      return response.text.trim();

    } catch (error) {

      // Retry only for temporary server errors
      if (error.status === 503 && attempt < MAX_RETRIES) {

        const waitTime = attempt * 5000;

        console.log("\n================================");
        console.log(`⚠️ Gemini Busy`);
        console.log(`Retry ${attempt}/${MAX_RETRIES}`);
        console.log(`Waiting ${waitTime / 1000} seconds...`);
        console.log("================================");

        await delay(waitTime);

        continue;
      }

      throw error;
    }
  }
};

// ===========================================
// Generate JSON
// ===========================================

const generateJSON = async (prompt) => {
  const MAX_RETRIES = 5;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

    try {

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });
      
      let text = response.text.trim();

      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      console.log("\n========== RAW GEMINI RESPONSE ==========\n");
      console.log(text);
      console.log("\n=========================================\n");

      return JSON.parse(text);

    } catch (error) {

      // ===================================
      // Retry if Gemini is overloaded
      // ===================================

      if (error.status === 503 && attempt < MAX_RETRIES) {

        const waitTime = attempt * 5000;

        console.log("\n================================");
        console.log("⚠️ Gemini Server Busy");
        console.log(`Retry ${attempt}/${MAX_RETRIES}`);
        console.log(`Waiting ${waitTime / 1000} seconds...`);
        console.log("================================");

        await delay(waitTime);

        continue;
      }

      // ===================================
      // Quota Exceeded
      // ===================================

      if (error.status === 429) {

        throw new Error(
          "Gemini API quota exceeded. Please try later or use another API key."
        );

      }

      // ===================================
      // Invalid JSON
      // ===================================

      if (error instanceof SyntaxError) {

        throw new Error(
          "Gemini returned invalid JSON."
        );

      }

      console.error("Message:", error.message);
      console.error("Status:", error.status);
      console.error("Code:", error.code);
      console.error("Cause:", error.cause);

      throw error;
    }
  }
};

module.exports = {
  generateText,
  generateJSON,
};