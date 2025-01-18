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
}

interface Globals { 
    characterDescriptionText: string
    guessCount: number
    guessInput: string
    emails: Email[];
    messages: Message[];
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
          const communications = data.communications.communications;

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
            globals.messages = textMessages.flatMap((message) =>
            message.thread.map((threadMessage: Message) => ({
              sender: {
                name: threadMessage.sender.name,
              },
              recipient: {
                name: threadMessage.recipient.name,
              },
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



//   // Submit Password Guess
//   async function submitGuess() {
//     const guess = globals.guessInput.trim();
//     if (!guess) return;

//     // Increment guess counters
//     if (globals.guessCount === undefined) {
//         globals.guessCount = 0;
//     } else {
//         globals.guessCount++;
//     }
//     totalGuessCount++;
//     guessHistory.innerHTML += `<li>${guess}</li>`;
//     guessInput.value = ''; // Clear the input field after each guess

//     try {
//         const response = await fetch(`${apiBase}/guess`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ guess })
//         });
//         const data = await response.json();

//         responseDiv.textContent = data.message;
//         responseDiv.style.color = data.success ? 'green' : 'red';
//         document.getElementById('total-guesses').textContent = `Total Guesses: ${totalGuessCount}`;
//         if (data.success) {
//             // Display results in the sidebar
//             guessHistory.innerHTML += `<li><strong>Correct!</strong> Took ${currentGameGuessCount} guesses.</li>`;
            
//             // Reset for a new game
//             await startNewGame();
//         }
//     } catch (error) {
//         console.error('Error submitting guess:', error);
//     }
// }


//   // Send Message
//   async function sendMessage() {
//       const message = chatInput.value.trim();
//       if (!message) return;

//       chatWindow.innerHTML += `<div class="chat-message user">
//           <div class="sender-name">Alice Smith</div>
//           <div class="chat-bubble user">${message}</div>
//       </div>`;
//       chatInput.value = '';

//       try {
//           const response = await fetch(`${apiBase}/chat`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ message })
//           });
//           const data = await response.json();

//           chatWindow.innerHTML += `<div class="chat-message llm">
//               <div class="sender-name">Mike</div>
//               <div class="chat-bubble llm">${data.response}</div>
//           </div>`;
//           chatWindow.scrollTop = chatWindow.scrollHeight;
//       } catch (error) {
//           console.error('Error sending message:', error);
//       }
//   }

  export { fetchCharacterDescription, fetchCommunications, startNewGame, globals };