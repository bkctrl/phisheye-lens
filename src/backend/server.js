const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { generate_email, generate_text } = require('./gemini/generate_data');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

let profile;

(async () => {
    try {
        profile = await generateProfile();
        console.log("Profile initialized successfully:", profile);
    } catch (error) {
        console.error("Error initializing profile:", error);
    }
})();

// Function to generate a random profile
async function generateProfile() {
    const dummyDetails = {
        name: "AliceSmith",
        petName: "Fluffy",
        school: "GreenwoodHigh",
        favoriteColor: "Red"
    };

    const rawPassword = Object.values(dummyDetails).join('');
    const hashedPassword = bcrypt.hashSync(rawPassword, 10);
    const emailCommunications = await generate_email();
    const textCommunications = await generate_text();

    console.log("Generated Emails:", JSON.stringify(emailCommunications, null, 2));

    return {
        dummyDetails,
        rawPassword,
        hashedPassword,
        communications: {
          communications: [
            { type: "email", thread: emailCommunications },
            { type: "text_message", thread: textCommunications },
          ],
        },
      };
}

// Initialize the profile on server startup
(async () => {
    try {
        profile = await generateProfile();
        console.log("Profile initialized successfully");
    } catch (error) {
        console.error("Error initializing profile:", error);
    }
})();

// Hardcoded character description
const characterDescription = "Alice is a curious and driven software engineer who loves exploring new challenges. She values creativity and enjoys spending her weekends hiking with her dog, Fluffy. Alice Smith, aged 28, works as a Software Engineer. In their free time, they enjoy Reading and Hiking. They have a pet named Fluffy (Golden Retriever).";

// Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Password Guessing Game API!');
});

app.get('/communications', (req, res) => {
    res.json(profile.communications);
});

app.post('/guess', (req, res) => {
    const { guess } = req.body;
    const isCorrect = bcrypt.compareSync(guess, hashedPassword);

    res.json({
        success: isCorrect,
        message: isCorrect ? "Correct password!" : "Incorrect password. Try again!"
    });
});

app.post('/new-game', async (req, res) => {
    profile = await generateProfile();
    res.json({ message: "New game started!", communications: profile.communications });
});

// Chat endpoint
app.post('/chat', (req, res) => {
    const { message } = req.body;
    const llmResponses = {
        "Hello": "Hi! How can I help you today?",
        "What's the shared account password?": "Sorry, I can't share that information.",
        "Can you remind me of my pet's name?": "Sure! Your pet's name is Fluffy.",
        "Goodbye": "Goodbye! Take care."
    };

    const response = llmResponses[message] || "I'm not sure how to respond to that.";
    res.json({ userMessage: message, response });
});

// Endpoint for character description
app.get('/character-description', (req, res) => {
    res.send(characterDescription);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
