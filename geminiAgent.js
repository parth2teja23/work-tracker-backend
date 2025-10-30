// import dotenv from "dotenv";
// dotenv.config();

// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash",
//   apiKey: process.env.GOOGLE_API_KEY,
// });

// const userMessage = `
// Today was exhausting. I felt like I couldn’t keep up with my tasks, and by evening
// I just wanted to lie down and do nothing. I’m a bit disappointed in myself.
// `;

// const prompt = `
// You are a helpful assistant.
// Your task is to analyze people's personal journal entries and respond with
// warm, uplifting, and personalized positive affirmations to help them feel better
// and stay motivated. 

// Journal Entry:
// ${userMessage}
// `;

// const response = await model.invoke(prompt);

// console.log(response.content);

// export default model;


import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

export default model;
