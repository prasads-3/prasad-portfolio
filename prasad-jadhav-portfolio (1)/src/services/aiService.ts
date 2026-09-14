import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const aiService = {
  /**
   * Generates a professional summary or career objective using Gemini
   */
  async generateCareerObjective(details: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const prompt = `As a professional career coach, write a compelling, concise career objective (2-3 sentences) for a Network Engineer portfolio based on these details: ${details}. Keep it professional, focused on networking/security, and use a first-person perspective.`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("AI Generation Error:", error);
      throw error;
    }
  },

  /**
   * Analyzes a project description and suggests technical keywords
   */
  async suggestTechStack(description: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
      const prompt = `Analyze this network engineering project description and list the top 5 technical keywords or protocols used: "${description}". Return only the keywords separated by commas.`;
      
      const result = await model.generateContent(prompt);
      return result.response.text().split(',').map(s => s.trim());
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      throw error;
    }
  }
};
