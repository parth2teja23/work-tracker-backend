import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Message from "./models/Message.js";
import model from "./geminiAgent.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// POST /api/submit — save message
// app.post("/api/submit", async (req, res) => {
//   try {
//     const { message } = req.body;
//     console.log("message recieved from frontend");
    
//     if (!message || message.trim() === "")
//       return res.status(400).json({ message: "Message cannot be empty" });

//     const newMessage = new Message({ text: message.trim() });
//     await newMessage.save();

//     console.log("💬 New message saved:", newMessage.text);
//     res.status(201).json({ message: "Message saved", data: newMessage });
//   } catch (error) {
//     console.error("Error saving message:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /api/messages — fetch all messages
// app.get("/api/messages", async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching messages" });
//   }
// });


app.post("/api/submit", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Message received from frontend");

    if (!message || message.trim() === "")
      return res.status(400).json({ message: "Message cannot be empty" });

    // Save message
    const newMessage = new Message({ text: message.trim() });
    await newMessage.save();
    console.log("💬 New message saved:", newMessage.text);

    // 👇 Call your exported Gemini model
    const prompt = `
You are a helpful assistant.
Your task is to analyze people's personal journal entries and respond with
warm, uplifting, and personalized positive affirmations to help them feel better
and stay motivated.

Journal Entry:
${message}
    `;

    const response = await model.invoke(prompt);
    console.log(response);
    

    res.status(201).json({
      message: "Message saved",
      data: {
        text: newMessage.text,
        // aiResponse: response.content[0]?.text || "No response generated",
        aiResponse: response.content,
      }
    });
  } catch (error) {
    console.error("Error saving message or generating response:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
