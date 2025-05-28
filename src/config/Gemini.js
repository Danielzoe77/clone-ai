// const GeminiApi = AIzaSyD1ALtXemov9PMyNmZc4-Um4nmp_8HJ5rg


// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyD1ALtXemov9PMyNmZc4-Um4nmp_8HJ5rg" });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// await main();


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
//console.log("Gemini API Key:", import.meta.env.VITE_GEMINI_API_KEY);

async function main(promptText) {
   if (typeof promptText !== "string") {
    console.error("Prompt must be a string. Received:", promptText);
    return "Invalid input.";
  }
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-1.5-flash"
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
      ],
    });

  const output = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (output) {
      console.log("Gemini Response:", output);
      return output;
    } else {
      console.error("Unexpected response structure:", result);
      return "No response text found.";
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return "An error occurred while fetching AI response.";
  }
}




export default main;

