require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const ai = new GoogleGenAI ({
    apiKey: process.env.GEMINI_API_KEY,
});

app.get("/test-ai", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say hello in one short sentence."
        });

        res.send(response.text);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong.");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});