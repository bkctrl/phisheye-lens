const apiBase = 'http://localhost:3001';

interface Sender {
    name: string;
    email: string;
}

interface Recipient {
    name: string;
    email: string;
}

interface Email {
    sender: Sender;
    recipient: Recipient;
    subject: string;
    body: string;
}

interface Message {
    sender: Sender;
    recipient: Recipient;
    message: string;
    senderType: string;
}

interface Globals { 
    characterDescriptionText: string
    guessCount: number
    guessInput: string
    emails: Email[];
    messages: Message[];
    guessHistory: string[];
    guessResult: string;
}

const globals: Partial<Globals> = {};

async function fetchCharacterDescription() {
    try {
        const response = await fetch(`${apiBase}/character-description`);
        const description = await response.text();
        globals.characterDescriptionText = description;
    } catch (error) {
        console.error("Error fetching character description:", error);
        globals.characterDescriptionText = "Error fetching character description.";
    }
}

  // Fetch Communications
  async function fetchCommunications() {
      try {
          const response = await fetch(`${apiBase}/communications`);
          const data = await response.json();

          console.log("Data received from API:", data);

          // Access nested communications array
          const communications = data.communications;

          if (!Array.isArray(communications)) {
              throw new Error("Invalid communications format: Expected an array.");
          }

          // Filter emails and text messages
          const emailsPull = communications.filter(comm => comm.type === "email");
          const textMessages = communications.filter(comm => comm.type === "text_message");

          // Populate Emails
          globals.emails = emailsPull.flatMap(email =>
            email.thread.map((threadEmail: Email) => ({
                sender: threadEmail.sender.name,
                subject: threadEmail.subject,
                message: threadEmail.body
            }))
            );

            // Populate messages
            globals.messages = textMessages.flatMap(message =>
            message.thread.map((threadMessage: Message) => ({
              sender: {
                name: threadMessage.sender.name,
              },
              recipient: {
                name: threadMessage.recipient.name,
              },
              senderType: threadMessage.senderType,
              message: threadMessage.message,
            }))
          );
      } catch (error) {
          console.error("Error fetching communications:", error);
      }
  }

  function printGlobals() {
    console.log("Globals:");
    const g = Object.entries(globals);
    for (const [key, value] of g) {
        console.log(`${key}:`, value !== undefined ? value : "undefined");
    }
}

  async function startNewGame() {
    try {
        const response = await fetch(`${apiBase}/new-game`, {
            method: 'POST'
        });
        const data = await response.json();
    } catch (error) {
        console.error('Error starting a new game:', error);
    }
    await fetchCommunications();
    printGlobals();
}

  // Submit Password Guess
  async function submitGuess(inputGuess: string) {
    const guess = inputGuess.trim();
    if (!guess) return false;

    // Increment guess counters
    if (globals.guessCount === undefined) {
        globals.guessCount = 0;
    } else {
        globals.guessCount++;
    }

    if (!globals.guessHistory) {
        globals.guessHistory = [];
    }
    globals.guessHistory.push(guess);

    try {
        const response = await fetch(`${apiBase}/guess`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess })
        });
        const data = await response.json();

        globals.guessResult = data.message;
        if (data.success) {
            // Display results in the sidebar
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error submitting guess:', error);
    }
    return false;
}

  // Send Message
  async function sendMessage(inputMessage: string) {
      const message = inputMessage.trim();
      if (!message) return;

      try {
          const response = await fetch(`${apiBase}/chat`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message })
          });
          const data = await response.json();

          return data.response;
      } catch (error) {
          console.error('Error sending message:', error);
      }
      return "No response received.";
  }

  export { fetchCharacterDescription, fetchCommunications, startNewGame, submitGuess, sendMessage, globals };