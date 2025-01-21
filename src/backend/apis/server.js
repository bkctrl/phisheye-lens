import express from 'express';
import cors from 'cors';
import { generate_email, generate_text, send_RegexPassword, generate_text_response } from './generate_data.js';
import { kv } from '@vercel/kv'; 

const app = express();
app.use(express.json());
app.use(cors());


let profile;
let profileLoaded = false; 

const { regexPass, userPassword } = send_RegexPassword();
let generatedResponse;

(async () => {
    try {
        console.log("Initializing profile in the background...");
        profile = await generateProfile();
        console.log("Profile initialized successfully");
        profileLoaded = true;
    } catch (error) {
        console.error("Error initializing profile:", error);
    }
})();

async function generateProfile() {
    const dummyDetails = {
        name: "AliceSmith",
        petName: "Fluffy",
        school: "GreenwoodHigh",
        favoriteColor: "Red"
    };
    const emailCommunications = await generate_email();
    const textCommunications = await generate_text();
    
    await kv.set('chatHistory', textCommunications);
    console.log("Chat history saved to KV successfully.");

    return {
        dummyDetails,
        userPassword,
        communications: {
          communications: [
            { type: "email", thread: emailCommunications },
            { type: "text_message", thread: textCommunications },
          ],
        },
      };
}

async function waitForProfile(timeout = 100000) {
    const start = Date.now();
    while (!profileLoaded) {
        if (Date.now() - start > timeout) {
            throw new Error("Timeout waiting for profile generation.");
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

// Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Phisheye Lens API!');
});

app.get('/communications', async (req, res) => {
    try {
        console.log("Waiting for profile to be ready...");
        await waitForProfile();
        console.log("Serving communications...");
        res.json(profile.communications);
    } catch (error) {
        console.error("Error serving communications:", error);
        res.status(503).json({ error: "Profile is still being generated. Please try again later." });
    }
});


app.post('/guess', (req, res) => {
    const { guess } = req.body;
    const isCorrect = guess === userPassword;
    res.json({
        success: isCorrect,
        message: userPassword
    });
});

app.post('/new-game', async (req, res) => {
    try {
        profileLoaded = false;
        profile = await generateProfile();
        profileLoaded = true;
        res.json({ message: "New game started!", communications: profile.communications });
    } catch (error) {
        res.status(500).json({ error: "Failed to start a new game. Please try again." });
    }
});

app.post('/chat', async (req, res) => {
    console.log("/chat REACHED");
    const { message } = req.body;
    console.log("message: ", message);

    const chatHistory = (await kv.get('chatHistory')) || [];
    console.log("Fetched chatHistory from KV:", chatHistory);

    generatedResponse = await generate_text_response(message, chatHistory);
    console.log("generatedResponse: ", generatedResponse);

    const response = generatedResponse || "I'm not sure how to respond to that.";
    console.log("response: ", response);

    const updatedChatHistory = [
        ...chatHistory,
        { sender: "User", message },
        { sender: "AI", message: response }
    ];
    await kv.set('chatHistory', updatedChatHistory);
    console.log("Updated chatHistory saved to KV:", updatedChatHistory);

    res.json({ userMessage: message, response });
});

app.get('/correct-regex', (req, res) => {
    res.send(regexPass);
});

app.get('/user-password', (req, res) => {
    res.send(userPassword);
});

export default app;
