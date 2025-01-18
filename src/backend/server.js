const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Function to generate a random profile
function generateProfile() {
    const dummyDetails = {
        name: "AliceSmith",
        petName: "Fluffy",
        school: "GreenwoodHigh",
        favoriteColor: "Red"
    };

    const rawPassword = Object.values(dummyDetails).join('');
    const hashedPassword = bcrypt.hashSync(rawPassword, 10);

    return { dummyDetails, rawPassword, hashedPassword };
}

let { dummyDetails, rawPassword, hashedPassword } = generateProfile();

// Hardcoded communications
const communications = {
    communications: [
        {
            type: "email",
            thread: [
                {
                    sender: { name: "John Doe", email_address: "john.doe@example.com" },
                    recipient: { name: "Alice Smith", email_address: "alice.smith@example.com" },
                    subject: "Urgent: Update Your Account",
                    body: "Hi Alice,\n\nWe noticed suspicious activity on your account. Please update your password immediately to secure your account.\n\nBest,\nThe Security Team"
                },
                {
                    sender: { name: "Alice Smith", email_address: "alice.smith@example.com" },
                    recipient: { name: "John Doe", email_address: "john.doe@example.com" },
                    subject: "Re: Urgent: Update Your Account",
                    body: "Hi John,\n\nThanks for letting me know. I’ll update it right away.\n\nRegards,\nAlice"
                }
            ]
        },
        {
            type: "text_message",
            thread: [
                {
                    sender: { name: "Mike", phone_number: "+123456789" },
                    recipient: { name: "Alice Smith", phone_number: "+987654321" },
                    message: "Hey Alice, don’t forget to send me the login details for the shared account. Thanks!"
                },
                {
                    sender: { name: "Alice Smith", phone_number: "+987654321" },
                    recipient: { name: "Mike", phone_number: "+123456789" },
                    message: "Sure, Mike! I'll send them over in a moment."
                },
                {
                    sender: { name: "Mike", phone_number: "+123456789" },
                    recipient: { name: "Alice Smith", phone_number: "+987654321" },
                    message: "Great, thanks!"
                }
            ]
        }
    ]
};

// Hardcoded character description
const characterDescription = "Alice is a curious and driven software engineer who loves exploring new challenges. She values creativity and enjoys spending her weekends hiking with her dog, Fluffy. Alice Smith, aged 28, works as a Software Engineer. In their free time, they enjoy Reading and Hiking. They have a pet named Fluffy (Golden Retriever).";

// Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Password Guessing Game API!');
});

app.get('/communications', (req, res) => {
    res.json({ communications, dummyDetails });
});

app.post('/guess', (req, res) => {
    const { guess } = req.body;
    const isCorrect = bcrypt.compareSync(guess, hashedPassword);

    res.json({
        success: isCorrect,
        message: isCorrect ? "Correct password!" : "Incorrect password. Try again!"
    });
});

app.post('/new-game', (req, res) => {
    ({ dummyDetails, rawPassword, hashedPassword } = generateProfile());
    res.json({ communications, dummyDetails });
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
