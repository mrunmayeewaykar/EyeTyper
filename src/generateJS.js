import { GoogleGenerativeAI } from "@google/generative-ai";
const googleAI = new GoogleGenerativeAI("AIzaSyDKCCB1YfNC9zxLZHoj_3u7MEuydJ7yNx4");
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});
 
export const generate = async (command, html) => {
  try {
    const prompt = `Give me a Javascript function with the name run to perform the following command ${command} on this html page having html code as ${html} without explaination-only code and no extra text. start with function run() and not javascript.. ` 
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.log("response error", error);
  }
};
 

